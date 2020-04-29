#include<stdlib.h>
#include "DHT.h"
#include<SPI.h>
#include<RF24.h>
#include "Nextion.h"

#define DHTPIN 2     // what digital pin we're connected to DHT data pin

// Uncomment whatever type you're using!
//#define DHTTYPE DHT11   // DHT 11
#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321
//#define DHTTYPE DHT21   // DHT 21 (AM2301)


// Initialize DHT sensor.

DHT dht(DHTPIN, DHTTYPE);

// ce, csn pins
RF24 radio(9, 10);

const char text[35]="Failed to read from DHT 1 sensor!";;


char Buf[5];

int coolerLed = 4;
int heaterLed = 5;




char buffer[10];
int tcnt=0;
float userTemp = 22.0;
float t = 0.0;
char resp_mode0[7] = "UMODE0";
char resp_mode1[7] = "UMODE1";
char resp_mode2[7] = "UMODE2";
String modeS = "Off";

// Declare your Nextion objects - Example (page id = 0, component id = 10, component name = "b0")
NexButton b0 = NexButton(0, 10, "b0");  //Up button
NexButton b1 = NexButton(0, 11, "b1");  //Down button
NexButton b2 = NexButton(0, 12, "b2");  //On-Off button
NexButton b3 = NexButton(0, 13, "b3");  //Heat button
NexButton b4 = NexButton(0, 14, "b4");  //Cool button
NexText t2 = NexText(0, 5, "t2");       //User temperature
NexText t4 = NexText(0, 7, "t4");       //User temperature
NexText t6 = NexText(0, 9, "t6");       //User temperature

NexTouch *nex_Listen_List[] = 
{
    &b0,
    &b1,
    &b2,
    &b3,
    &b4,
    NULL
};

/**
 * Button to return the response.
 * 
 * @param ptr - the parameter was transmitted to pop event function pointer. 
 * 
 */
 void b0PopCallback(void *ptr){
  if (modeS != "Off"){
      if (userTemp < 28.0){
        userTemp = userTemp + 0.5;
        dtostrf(userTemp, 4, 1, Buf);
        t2.setText(Buf);
    }
  }

 }

void b1PopCallback(void *ptr){
  if (modeS != "Off") {
    if (userTemp > 18.0){
    userTemp = userTemp - 0.5;
    dtostrf(userTemp, 4, 1, Buf);
    t2.setText(Buf);
    }
  }
  
 }
 
//when pressed off button
 void b2PopCallback(void *ptr){
  if (modeS != "Off") {
    modeS = "Off";
    b2.Set_background_image_pic(4);         //gray on-off button
    b2.Set_press_background_image_pic2(3);  // color on-off button
    b3.Set_background_image_pic(7);         //color heat button
    b3.Set_press_background_image_pic2(8);  //gray heat buttom
    b4.Set_background_image_pic(5);         //color cool button
    b4.Set_press_background_image_pic2(6);  //gray cool button
    t2.setText("--.-");
    t6.setText("Mode: Off");
    
  }
  
 }

//when pressed Heat button
 void b3PopCallback(void *ptr){
  
  modeS = "Heat";
  b2.Set_background_image_pic(3);         // color on-off button
  b2.Set_press_background_image_pic2(4);  //gray on-off button
  b3.Set_background_image_pic(8);         //gray heat buttom
  b3.Set_press_background_image_pic2(7);  //color heat button
  b4.Set_background_image_pic(5);         //color cool button
  b4.Set_press_background_image_pic2(6);  //gray cool button
  userTemp = 22.0;
  dtostrf(userTemp, 4, 1, Buf);
  t2.setText(Buf);
  t6.setText("Mode: Heat");
  
 }

//when pressed Cool button
 void b4PopCallback(void *ptr){
  
  modeS = "Cool";
  b2.Set_background_image_pic(3);         // color on-off button
  b2.Set_press_background_image_pic2(4);  //gray on-off button
  b3.Set_background_image_pic(7);         //color heat button
  b3.Set_press_background_image_pic2(8);  //gray heat buttom
  b4.Set_background_image_pic(6);         //gray cool button
  b4.Set_press_background_image_pic2(5);  //color cool button
  userTemp = 26.0;
  dtostrf(userTemp, 4, 1, Buf);
  t2.setText(Buf);
  t6.setText("Mode: Cool");
  
 }

void setup() {
  Serial.begin(9600);
  Serial.println("System start.");
  Serial.println("Thermostat Module.");

  nexInit();
  b0.attachPop(b0PopCallback, &b0);
  b1.attachPop(b1PopCallback, &b1);
  b2.attachPop(b2PopCallback, &b2);
  b3.attachPop(b3PopCallback, &b3);
  b4.attachPop(b4PopCallback, &b4);

  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(coolerLed, OUTPUT);
  pinMode(heaterLed, OUTPUT);
  digitalWrite(coolerLed, LOW);
  digitalWrite(heaterLed, LOW);

  radio.begin();
  //radio.setDataRate(RF24_250KBPS);  //ΠΡΟΣΟΧΗ ΣΤΟ DATA RATE
  radio.setDataRate(RF24_1MBPS);
  //radio.setPALevel(RF24_PA_MIN);
  radio.setPALevel(RF24_PA_MAX);
  radio.setChannel(0x76);
  radio.openWritingPipe(0xF0F0F0F0E3LL);
  const uint64_t pipe = (0xE8E8F0F0E3LL);
  radio.openReadingPipe(1, pipe);
  
  radio.enableDynamicPayloads();
  radio.powerUp();

  dht.begin();
  
  

}



void loop() {
  ++tcnt;
  if (tcnt >= 200){
    tcnt = 0;
    t = dht.readTemperature();
    // Check if any reads failed and exit early (to try again).
  if (isnan(t)) {
    return;
  }
  static char temperatureCTemp[6];
  dtostrf(t, 6, 1, temperatureCTemp);
  t4.setText(temperatureCTemp);
  }


  
  nexLoop(nex_Listen_List);
  radio.startListening();
  //char receivedMessage[32] = {0};
  char receivedMessage[6] = {0};

  
  
  if(radio.available()){
    radio.read(receivedMessage, sizeof(receivedMessage));
    
    radio.stopListening();
 
    String stringMessage(receivedMessage);
    //Serial.println(stringMessage.substring(0,6));
    //Serial.println("Turning off the radio.");
    delay(100);
    if(stringMessage.substring(0,6) == "TEMPR1"){
      read_temp();
    }
    if(stringMessage.substring(0,6) == "TEMPR?"){
      read_setTemp();
    }
    if(stringMessage.substring(0,6) == "UMODE?"){
      read_mode();
    } 

    
  }

  if (modeS == "Heat") {
    digitalWrite(coolerLed, LOW);
    if (t < userTemp - 0.5) {
      digitalWrite(heaterLed, HIGH);
    }

    if (t > userTemp + 0.5) {
      digitalWrite(heaterLed, LOW);
    }   
  }

if (modeS == "Cool") {
  digitalWrite(heaterLed, LOW);
  if (t > userTemp + 0.5) {
      digitalWrite(coolerLed, HIGH);
    }

    if (t < userTemp - 0.5) {
      digitalWrite(coolerLed, LOW);
    }   
}

if (modeS == "Off") {
  digitalWrite(coolerLed, LOW);
  digitalWrite(heaterLed, LOW);
}
  
  delay(10);

}

void read_temp() {  
  dtostrf(t, 4, 1, Buf);
  radio.write(&Buf, sizeof(Buf));
  return;
}

void read_setTemp() {  
  dtostrf(userTemp, 4, 1, Buf);
  radio.write(&Buf, sizeof(Buf));
  return;
}

void read_mode() {
  if (modeS=="Off") {
    radio.write(&resp_mode0, sizeof(resp_mode0));
    radio.powerDown();
    delay(100);
    radio.powerUp();
    delay(100);
    return;
  }

  if (modeS=="Heat") {
    radio.write(&resp_mode1, sizeof(resp_mode1));
    radio.powerDown();
    delay(100);
    radio.powerUp();
    delay(100);
    return;
  }

  if (modeS=="Cool") {
    radio.write(&resp_mode2, sizeof(resp_mode2));
    radio.powerDown();
    delay(100);
    radio.powerUp();
    delay(100);
    return;
  }
  
}
