#!/usr/bin/env python3
#-*- coding: utf-8 -*-

import RPi.GPIO as GPIO
from lib_nrf24 import NRF24

import datetime
import time
import requests
import spidev
import pymysql
import pyrebase

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

#current username
cuser = "Christos Axiotidis"

#firebase configuration
config = {
  "apiKey": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "authDomain": "xxxxxxxxxxxxx.firebaseapp.com",
  "databaseURL": "https://xxxxxxxxxxx.firebaseio.com",
  "storageBucket": "xxxxxxxxxxxxxx.appspot.com"
}

firebase = pyrebase.initialize_app(config)

fBaseDb = firebase.database()

#nRf24L01+ data pipes
pipes1 = [[0xE8, 0xE8, 0xF0, 0xF0, 0xE1], [0xF0, 0xF0, 0xF0, 0xF0, 0xE1]]
pipes2 = [[0xE8, 0xE8, 0xF0, 0xF0, 0xE2], [0xF0, 0xF0, 0xF0, 0xF0, 0xE2]]
pipes3 = [[0xE8, 0xE8, 0xF0, 0xF0, 0xE3], [0xF0, 0xF0, 0xF0, 0xF0, 0xE3]]
pipes4 = [[0xE8, 0xE8, 0xF0, 0xF0, 0xE4], [0xF0, 0xF0, 0xF0, 0xF0, 0xE4]]

#Fake datasets (energy per hour in Wh)
ac = ["0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00",
      "0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00",
      "0.00","0.00","0.00","0.00"] 
boiler = ["0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00",
          "0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00",
          "0.00","1500.00","1500.00","0.00","0.00","0.00"]
fridge = ["276.00","276.00","276.00","276.00","276.00","276.00","276.00",
          "276.00","276.00","276.00","276.00","276.00","276.00","276.00",
          "276.00","276.00","276.00","276.00","276.00","276.00","276.00",
          "276.00","276.00","276.00"]
oven = ["0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00","0.00",
"0.00","0.00","2000.00","2000.00","2000.00","0.00","0.00","0.00","0.00",
"0.00","0.00","0.00","0.00","0.00"]
pc = ["5.00","5.00","5.00","5.00","5.00","5.00","5.00","5.00","5.00","5.00",
      "5.00","5.00","5.00","5.00","5.00","5.00","5.00","120.00","120.00",
      "120.00","120.00","120.00","120.00","5.00"]
tv = ["70.00","2.00","2.00","2.00","2.00","2.00","2.00","70.00","70.00",
      "2.00","2.00","2.00","2.00","2.00","2.00","2.00","2.00","2.00","2.00",
      "70.00","70.00","70.00","70.00","70.00"]
washing = ["1.00","1.00","1.00","1.00","1.00","1.00","1.00","1.00","1.00",
           "1.00","1.00","1.00","1.00","1.00","1.00","1.00","1.00","1.00",
           "500.00","500.00","1.00","1.00","1.00","1.00"]

time2upload = 900               #every 900sec (15min) upload data to firebase
lhour = "25"
lmonth = ""


#event sent flags
lightEvent = False
heatEvent = False
coolEvent = False
windowEvent = False

#MySql database properties
address = "localhost"
username = "xxxxx"
password = "xxxxxxxxxx"
database = "homedata"

radio = NRF24(GPIO, spidev.SpiDev())
radio.begin(0, 25)

radio.setPayloadSize(32)
radio.setChannel(0x76)
radio.setDataRate(NRF24.BR_1MBPS)
#radio.setDataRate(NRF24.BR_250KBPS)
radio.setPALevel(NRF24.PA_MAX)
#radio.setPALevel(NRF24.PA_MIN)

radio.setAutoAck(True)
radio.enableDynamicPayloads()
radio.enableAckPayload()

#set new data in firebase database
def setFirebase(Path, Key, Data):
    try:
        fBaseDb.child(Path).child(Key).set(Data)
        #print("data setted successfully to firebase")
    except:
        print("usetFirebase function set Error")

#update data in firebase database
def updateFirebase(Path, Dest, Data):
    try:
        fBaseDb.child(Path).update({Dest:Data})
        #print("data updated successfully to firebase in : "+Path+" "+Dest+" : "+Data)
    except:
        print("updateFirebase function update Error")

#update in firebase daily total consumption
def updateFbDayTot():
    db = pymysql.connect(address, username, password, database)
    curs=db.cursor()

    tempHourKwh =0.00
    totalDayKwh = 0.00

    table = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
           "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21",
           "22", "23"]

    for x in range(24):
        try:
            sql_select_query = "SELECT * FROM total"
            curs.execute (sql_select_query)
            temp = curs.fetchone()
            tempHour = temp[x]               #energy in Wh
            #print(sql_select_query+" = "+tempDay+" Wh")
            
        except:
            print("Database updateFbDayTot function read Error")

        tempHourKwh = float(tempHour)/1000.0  #total energy in kWh
        fbPath = "/users/"+cuser+"/consumption/today/totals/"
        fbDest = table[x]
        fbData = str(tempHourKwh)
        updateFirebase(fbPath, fbDest, fbData)
        totalDayKwh += tempHourKwh

    fbPath = "/users/"+cuser+"/consumption/today/totals/"
    fbDest = "total"
    fbData = str(totalDayKwh)
    updateFirebase(fbPath, fbDest, fbData)

    curs.close()
    db.close()

    

#update in firebase daily consumption per device
def updateFbDayPdev(day):
    db = pymysql.connect(address, username, password, database)
    curs=db.cursor()

    table = [["acDaily", "boilerDaily", "fridgeDaily", "lightsDaily",
             "ovenDaily", "pcDaily", "tvDaily", "washingDaily"],
              ["ac", "boiler", "fridge", "lights", "oven", "pc", "tv",
               "washing"]]
    
    for x in range(8):
        source = table[0][x]
        dest = table[1][x]
        
        try:
            sql_select_query = "SELECT * FROM "+source
            curs.execute (sql_select_query)
            temp = curs.fetchone()
            tempDay = temp[int(day)]               #energy in Wh
            #print(sql_select_query+" = "+tempDay+" Wh")
            
        except:
            print("Database updateFbDayPdev function read Error")

        tempDayKwh = float(tempDay)/1000.0  #total energy in kWh
        fbPath = "/users/"+cuser+"/consumption/today/perdevice/"
        fbDest = dest
        fbData = str(tempDayKwh)
        updateFirebase(fbPath, fbDest, fbData)

    curs.close()
    db.close()

    

#update in firebase monthly total consumption
def updateFbMonthTot(month, monthId):
    db = pymysql.connect(address, username, password, database)
    curs=db.cursor()

    tempMonth =0.00

    table = ["acMonthly", "boilerMonthly", "fridgeMonthly", "lightsMonthly",
               "ovenMonthly", "pcMonthly", "tvMonthly", "washingMonthly"]

    for x in table:
        try:
            sql_select_query = "SELECT * FROM "+x
            curs.execute (sql_select_query)
            temp = curs.fetchone()
            tempMonth += float(temp[monthId])               #energy in Wh
            
        except:
            print("Database updateFbMonthTot function read Error")

    tempMonthKwh = float(tempMonth)/1000.0  #total energy in kWh
    fbPath = "/users/"+cuser+"/consumption/monthly/totals/"
    fbDest = month
    fbData = str(tempMonthKwh)
    updateFirebase(fbPath, fbDest, fbData)

    curs.close()
    db.close()

    

#update in firebase monthly consumption per device
def updateFbMonthPdev(month, monthId):
    db = pymysql.connect(address, username, password, database)
    curs=db.cursor()
    
    table1 = [["acMonthly", "boilerMonthly", "fridgeMonthly", "lightsMonthly",
               "ovenMonthly", "pcMonthly", "tvMonthly", "washingMonthly"],
              ["ac", "boiler", "fridge", "lights", "oven", "pc", "tv",
               "washing"]]
    
    for x in range(8):
        source = table1[0][x]
        dest = table1[1][x]
        try:
            sql_select_query = "SELECT * FROM "+source 
            curs.execute (sql_select_query)
            temp = curs.fetchone()
            tempMonth = temp[monthId]               #energy in Wh
            tempMonthKwh = float(tempMonth)/1000.0  #energy in kWh
            
        except:
            print("Database updateFbMonthPdev function read Error")

        fbPath = "/users/"+cuser+"/consumption/monthly/perdevice/"+month
        fbDest = dest
        fbData = str(tempMonthKwh)
        updateFirebase(fbPath, fbDest, fbData)

    curs.close()
    db.close()

def clearDay():
    table1 = ["ac", "boiler", "fridge", "lights", "oven", "pc", "tv",
         "washing", "total"]

    field1 = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
           "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21",
           "22", "23"]

    data = "0.00"
    
    db = pymysql.connect(address, username, password, database)
    curs=db.cursor()
    
    for x in table1:
        for y in field1:
            try:
                sql_update_query = """UPDATE `"""+x+"""` SET `"""+y+"""`="""+data
                #print("sqlUP= "+sql_update_query)
                curs.execute (sql_update_query)
                db.commit()
                #print("Data committed in database to table "+x+" in field "+y+
                      #" with data "+data)

            except:
                print("Database clearDay function Commit Error")

    curs.close()
    db.close()

def clearMonth():
    table2 = ["acDaily", "boilerDaily", "fridgeDaily",
         "lightsDaily", "ovenDaily", "pcDaily", "tvDaily", "washingDaily",
         "totalDaily"]

    field2 = ["02", "03", "04", "05", "06", "07", "08", "09", "10",
           "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21",
           "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]

    data = "0.00"

    db = pymysql.connect(address, username, password, database)
    curs=db.cursor()
    
    for x in table2:
        for y in field2:
            try:
                sql_update_query = """UPDATE `"""+x+"""` SET `"""+y+"""`="""+data
                #print("sqlUP= "+sql_update_query)
                curs.execute (sql_update_query)
                db.commit()
                #print("Data committed in database to table "+x+" in field "+y+
                      #" with data "+data)

            except:
                print("Database clearMonth function Commit Error")

    curs.close()
    db.close()

def updateFakeData(table, field, data):
    db = pymysql.connect(address, username, password, database)
    curs=db.cursor()
    

    try:
        sql_update_query = """UPDATE `"""+table+"""` SET `"""+str(field)+"""`="""+str(data)
        curs.execute (sql_update_query)
        db.commit()
        #print("Fake Data committed in database")

    except:
        print("Database updateFakeData function Commit Error")
             
    curs.close()
    db.close()
    
def updateMonthlyValues(month):
    db = pymysql.connect(address, username, password, database)
    curs=db.cursor()
    sumMonth = 0.00

    tablesM = [["acDaily", "boilerDaily", "fridgeDaily", "lightsDaily",
                "ovenDaily", "pcDaily", "tvDaily", "washingDaily",
                "totalDaily"],["acMonthly", "boilerMonthly", "fridgeMonthly",
                               "lightsMonthly", "ovenMonthly", "pcMonthly",
                               "tvMonthly", "washingMonthly", "totalMonthly"]]

    for j in range(9):
        field1 = tablesM[0][j]
        field2 = tablesM[1][j]
        try:
            sql_select_query = "SELECT * FROM "+field1
            #print("sqlRQ= "+sql_select_query)
            curs.execute (sql_select_query)
            temp = curs.fetchone()
            for z in range(31):
                tempMonth = temp[z]
                sumMonth += float(tempMonth) #total energy in Wh
            #print("Database read succeeded from table "+field1)
        except:
            print("Database updateMonthlyValues function read Error")

        try:
            sql_update_query = """UPDATE `"""+field2+"""` SET `"""+str(month)+"""`="""+str(sumMonth)
            #print("sqlUP= "+sql_update_query)
            curs.execute (sql_update_query)
            db.commit()
            sumMonth = 0.00
            #print("Data committed in database to table "+field2)

        except:
            print("Database updateMonthlyValues function Commit Error")
             
    curs.close()
    db.close()
    

def updateDailyValues(day):
    db = pymysql.connect(address, username, password, database)
    curs=db.cursor()
    sumDay = 0.00
    
    tablesD = [["ac", "boiler", "fridge", "lights", "oven", "pc", "tv",
              "washing", "total"],["acDaily", "boilerDaily", "fridgeDaily", "lightsDaily",
               "ovenDaily", "pcDaily", "tvDaily", "washingDaily",
               "totalDaily"]]
    
    for j in range(9):
        field1 = tablesD[0][j]
        field2 = tablesD[1][j]
        try:
            sql_select_query = "SELECT * FROM "+field1
            #print("sqlRQ= "+sql_select_query)
            curs.execute (sql_select_query)
            temp = curs.fetchone()
            for z in range(24):
                tempDay = temp[z]
                sumDay += float(tempDay) #total energy in Wh
            #print("Database read succeeded from table "+field1)
        except:
            print("Database updateDailyValues function read Error")

        try:
            sql_update_query = """UPDATE `"""+field2+"""` SET `"""+str(day)+"""`="""+str(sumDay)
            #print("sqlUP= "+sql_update_query)
            curs.execute (sql_update_query)
            db.commit()
            sumDay = 0.00
            #print("Data committed in database to table "+field2)

        except:
            print("Database updateDailyValues function Commit Error")
             
    curs.close()
    db.close()
            

        

def updateTotal(hour):
    db = pymysql.connect(address, username, password, database)
    curs=db.cursor()
    sumTotal = 0.00
    tables = ["ac", "boiler", "fridge", "lights", "oven", "pc", "tv",
              "washing"]
    for x in tables:

        try:
            sql_select_query = "SELECT * FROM "+x
            curs.execute (sql_select_query)
            temp = curs.fetchone()
            tempTotal = temp[int(hour)]
            sumTotal += float(tempTotal) #total energy in Wh
            #print("Database read succeeded")
        
        
        except:
            print("Database updateTotal function read Error")
    try:
        #sumTotal = sumTotal/1000.0  #total energy in kWh
        sql_update_query = """UPDATE `total` SET `"""+str(hour)+"""`="""+str(sumTotal)
        curs.execute (sql_update_query)
        db.commit()
        #print("Data committed in database")

    except:
        print("Database updateTotal function Commit Error")
             
    curs.close()
    db.close()
    

def updateOneField(table, field, data):
    db = pymysql.connect(address, username, password, database)
    curs=db.cursor()
    

    try:
        sql_select_query = "SELECT * FROM "+table
        curs.execute (sql_select_query)
        temp = curs.fetchone()
        #print("Database read succeeded")
        tempData = temp[int(field)]
        sumData = float(tempData) + float(data)
        
    except:
        print("Database updateOneField function read Error")
    
    
    
    try:
        sql_update_query = """UPDATE `"""+table+"""` SET `"""+str(field)+"""`="""+str(sumData)
        curs.execute (sql_update_query)
        db.commit()
        #print("Data committed in database")

    except:
        print("Database updateOneField function Commit Error")
             
    curs.close()
    db.close()

def time_takes(h1, m1, s1):
    s2 = datetime.datetime.now()
    hour2 = s2.strftime("%H")
    min2 = s2.strftime("%M")
    sec2 = s2.strftime("%S")
    time1 = (h1*3600)+(m1*60)+s1
    if h1==23 and int(hour2)==0:
        time2 = (int(hour2) * 3600) + (int(min2)*60)+int(sec2)+86400 #86400 are the seconds of a day
    else:
        time2 = (int(hour2) * 3600) + (int(min2)*60)+int(sec2)
    dtime = time2 - time1
    return dtime


def isnt_number(s):
    try:
        float(s)
        return False
    except:
        return True

#Check the user's energy behavior about lights
def checkLights(date, time):
    
    #if lights are on during a sunny day
    #if current is greater than 0.02A
    #set the event to firebase
    fbPath = "/users/"+cuser+"/events/"+date+"/"+time+"/"
    fbKey = "type"
    fbData = "warning"
    setFirebase(fbPath, fbKey, fbData)
    fbPath = "/users/"+cuser+"/events/"+date+"/"+time+"/"
    fbKey = "cause"
    fbData = "Don't turn on the lights during a sunny day"
    setFirebase(fbPath, fbKey, fbData)
        
    #update malus points field to firebase
    fbPath = "/users/"+cuser+"/profile/"
    fbDest = "malus"
    fbData = "10"
    updateFirebase(fbPath, fbDest, fbData)
                
#Check the user's energy behavior about heat mode           
def checkHeat(date, time):
    #set the event to firebase
    fbPath = "/users/"+cuser+"/events/"+cdate+"/"+ctime+"/"
    fbKey = "type"
    fbData = "critical"
    setFirebase(fbPath, fbKey, fbData)
    fbPath = "/users/"+cuser+"/events/"+cdate+"/"+ctime+"/"
    fbKey = "cause"
    fbData = "You must lower the temperature settings in your thermostat"
    setFirebase(fbPath, fbKey, fbData)
        
    #update malus points field to firebase
    fbPath = "/users/"+cuser+"/profile/"
    fbDest = "malus"
    fbData = "20"
    updateFirebase(fbPath, fbDest, fbData)
    
#Check the user's energy behavior about cool mode           
def checkCool(date, time):
    #set the event to firebase
    fbPath = "/users/"+cuser+"/events/"+date+"/"+time+"/"
    fbKey = "type"
    fbData = "critical"
    setFirebase(fbPath, fbKey, fbData)
    fbPath = "/users/"+cuser+"/events/"+date+"/"+time+"/"
    fbKey = "cause"
    fbData = "You must increase the temperature settings in your thermostat"
    setFirebase(fbPath, fbKey, fbData)
        
    #update malus points field to firebase
    fbPath = "/users/"+cuser+"/profile/"
    fbDest = "malus"
    fbData = "20"
    updateFirebase(fbPath, fbDest, fbData)

def checkWindow(date, time):
    #set the event to firebase
    fbPath = "/users/"+cuser+"/events/"+date+"/"+time+"/"
    fbKey = "type"
    fbData = "warning"
    setFirebase(fbPath, fbKey, fbData)
    fbPath = "/users/"+cuser+"/events/"+date+"/"+time+"/"
    fbKey = "cause"
    fbData = "Don't let the window open"
    setFirebase(fbPath, fbKey, fbData)
        
    #update malus points field to firebase
    fbPath = "/users/"+cuser+"/profile/"
    fbDest = "malus"
    fbData = "10"
    updateFirebase(fbPath, fbDest, fbData)
                
def request_data(pipe, command):
    radio.openWritingPipe(pipe[0])
    radio.openReadingPipe(1, pipe[1])
    m = 0
    rec = 1
    string = ""
    message = list(command)
    while len(message) > 32:
        message.append(0)


    while string != "STOP" and m < 5:
        m = m + 1
        start = time.time()
        radio.write(message)
        radio.startListening()
        
        while not radio.available(0):
            time.sleep(1 / 100)
            if time.time() - start > 5:
                if m >= 5:
                    print("Timed out.")
                    rec = 0
                break
    receivedMessage = []
    radio.read(receivedMessage, radio.getDynamicPayloadSize())
    
    string = ""
    for n in receivedMessage:
        #Decode into standard unicode set
        if (n >= 32 and n <= 126):
            string += chr(n)
    
    #print(" {}".format(string))
    responce = string
    string = "STOP"
    radio.stopListening()
    time.sleep(1) #1 sec delay
    return responce

fireTime = datetime.datetime.now()
h1 = fireTime.strftime("%H")
m1 = fireTime.strftime("%M")
s1 = fireTime.strftime("%S")
    
while True:
    timestamp = datetime.datetime.now()
    cday = timestamp.strftime("%d")
    cdayId = int(timestamp.strftime("%d"))-1
    cmonth = timestamp.strftime("%B")
    cmonthId = int(timestamp.strftime("%m"))-1
    cyear = timestamp.strftime("%Y")
    chour = timestamp.strftime("%H")
    cminute = timestamp.strftime("%M")
    ctime = timestamp.strftime("%H:%M:%S")
    cdate = timestamp.strftime("%Y %B %d")

    #show th time stamp
    print("Current date is: "+cdate)
    print("Current time is : "+ctime)
    
    cmd = "CURNT?"
    crnt=request_data(pipes1, cmd)
    i=0
    while "." not in crnt and i<5: 
        i=i+1
        print("retry")
        crnt=request_data(pipes1, cmd) 
    print("I= "+crnt+" A")
    
    cmd = "ENRGY?"
    energy=request_data(pipes1, cmd)
    i=0
    while "." not in energy and i<5: 
        i=i+1
        print("retry")
        energy=request_data(pipes1, cmd)    #Prosoxi einai se Wh
    print("E= "+energy+" Wh")
    
    cmd = "TEMPR2"
    tout=request_data(pipes2, cmd)
    i=0
    while "." not in tout and i<5: 
        i=i+1
        print("retry")
        tout=request_data(pipes2, cmd)
    print("Tout= "+tout+" oC")
        
    cmd = "LIGHT?"
    light=request_data(pipes2, cmd)
    i=0
    while (light != "LIGHT0" and light != "LIGHT1" and i<5):
        i=i+1
        print("retry")
        light=request_data(pipes2, cmd)
    print("Light condition= "+light)
        
    cmd = "TEMPR1"
    troom=request_data(pipes3, cmd)
    i=0
    while "." not in troom and i<5: 
        i=i+1
        print("retry")
        troom=request_data(pipes3, cmd)
    print("Troom= "+troom+" oC")
        
    cmd = "TEMPR?"
    tset=request_data(pipes3, cmd)
    i=0
    while "." not in tset and i<5: 
        i=i+1
        print("retry")
        tset=request_data(pipes3, cmd)
    print("Tset= "+tset+" oC")
        
    cmd = "UMODE?"
    mode=request_data(pipes3, cmd)
    i=0
    while mode != "UMODE0" and mode != "UMODE1" and mode != "UMODE2" and i<5:
        i=i+1
        print("retry")
        mode=request_data(pipes3, cmd)
    print("User mode= "+mode)
        
    cmd = "WINDW?"
    window=request_data(pipes4, cmd)
    i=0
    while window != "WINDW0" and window != "WINDW1" and i<5:
        i=i+1
        print("retry")
        window=request_data(pipes4, cmd)
    print("window status= "+window)

    #update real sensor data to local database continusly
    updateOneField("lights", chour, energy)
    
    #update fake data to local database 1 time per hour 
    if chour != lhour:
        lhour = chour

        #at midnight clear hourly values in local database
        if chour == "00":

            #clear all values from previus 24 hours except in 00 in local db
            clearDay()

        #on month cange clear daily values in local database   
        if cmonth != lmonth:
            lmonth = cmonth
            #clear all values from previus 31 days except in 01 in local db
            clearMonth()
        
        updateFakeData("ac", chour, ac[int(chour)])
        updateFakeData("boiler", chour, boiler[int(chour)])
        updateFakeData("fridge", chour, fridge[int(chour)])
        updateFakeData("oven", chour, oven[int(chour)])
        updateFakeData("pc", chour, pc[int(chour)])
        updateFakeData("tv", chour, tv[int(chour)])
        updateFakeData("washing", chour, washing[int(chour)])

    updateTotal(chour)

    
    updateDailyValues(cday)

    updateMonthlyValues(cmonth)
    
    #every 15 min upload data to firebase database
    isFireTime = time_takes(int(h1), int(m1), int(s1))
    if isFireTime < time2upload:
        print("time takes= "+str(isFireTime)+" sec "+"Upload later")
    else:
        print("Now update firebase")
        fireTime = datetime.datetime.now()
        h1 = fireTime.strftime("%H")
        m1 = fireTime.strftime("%M")
        s1 = fireTime.strftime("%S")
        
        #update in firebase monthly consumption per device
        updateFbMonthPdev(cmonth, cmonthId)
        
        #update in firebase monthly total consumption
        updateFbMonthTot(cmonth, cmonthId)
        
        #update in firebase daily consumption per device
        updateFbDayPdev(cdayId)
        
        #update in firebase daily total consumption
        updateFbDayTot()
        
    
    #if lights are on during a sunny day (events genereted per 10 min -600 sec)
    #if current is greater than 0.02A
    if float(crnt) > 0.02 and light == "LIGHT1":
        if lightEvent == False:
            checkLights(cdate, ctime)
            lightEvent = True
    else:
        lightEvent = False

    #Check the user's energy behavior about heat mode
    if mode == "UMODE1":
        #if user choose to hight temperature in thermostat
        #or the outside temperature is grater than 20.0 C
        if float(tset) > 24.0 or float(tout) >= 20.0:
            if heatEvent == False:
                checkHeat(cdate, ctime)
                heatEvent = True
        else:
           heatEvent = False
    else:
        heatEvent = False 

    #Check the user's energy behavior about heat mode
    if mode == "UMODE2":
        #if user choose to low temperature in thermostat
        #or the outside temperature is more than 20.0 C
        if float(tset) < 25.0 or float(tout) <= 27.0:
            if coolEvent == False:
                checkCool(cdate, ctime)
                coolEvent = True
        else:
           coolEvent = False
    else:
        coolEvent = False 

    #check if user let open window in heat or cool mode
    if window == "WINDW1":
        if mode == "UMODE1" or mode == "UMODE2":
            if windowEvent == False:
                checkWindow(cdate, ctime)
                windowEvent = True
        else:
            windowEvent = False
    else:
        windowEvent = False
            
    time.sleep(22) #for ~ 1 minute delay
