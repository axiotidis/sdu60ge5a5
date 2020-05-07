#include<stdlib.h>
#include<SPI.h>
#include<RF24.h>

// ce, csn pins
RF24 radio(9, 10);

char Buf[5];
const int ACPin = A0;         //set arduino signal read pin
#define ACTectionRange 20;    //set Non-invasive AC Current Sensor detection range (5A,10A,20A)

// VREF: Analog reference
// For Arduino UNO, Leonardo and mega2560, etc. change VREF to 5
// For Arduino Zero, Due, MKR Family, ESP32, etc. 3V3 controllers, change VREF to 3.3
#define VREF 5.0
float enrg=0;
float ACCurrentValue;
float totalEnrg=0;
char buffer[10];

float readACCurrentValue()
{
  float ACCurrtntValue = 0;
  float peakVoltage = 0;  
  float voltageVirtualValue = 0;  //Vrms
  for (int i = 0; i < 5; i++)
  {
    peakVoltage += analogRead(ACPin);   //read peak voltage
    delay(1);
  }
  peakVoltage = peakVoltage / 5;   
  voltageVirtualValue = peakVoltage * 0.707;    //change the peak voltage to the Virtual Value of voltage

  
  voltageVirtualValue = (voltageVirtualValue / 1024 * VREF );  

  ACCurrtntValue = voltageVirtualValue * ACTectionRange;
  
  return ACCurrtntValue;
}

void setup() 
{
  Serial.begin(9600);
  pinMode(13, OUTPUT);
  Serial.println("System start.");
  Serial.println("Current sensor Module.");

  radio.begin();
  //radio.setDataRate(RF24_250KBPS);  //ΠΡΟΣΟΧΗ ΣΤΟ DATA RATE
  radio.setDataRate(RF24_1MBPS);
  //radio.setPALevel(RF24_PA_MIN);
  radio.setPALevel(RF24_PA_MAX);
  radio.setChannel(0x76);
  radio.openWritingPipe(0xF0F0F0F0E1LL);
  const uint64_t pipe = (0xE8E8F0F0E1LL);
  radio.openReadingPipe(1, pipe);
  
  radio.enableDynamicPayloads();
  radio.powerUp();
  //radio.startListening();
}

void loop() 
{  
  ACCurrentValue = readACCurrentValue(); //read AC Current Value
  enrg = (230.0*ACCurrentValue)/360.0;
  totalEnrg = totalEnrg + enrg;
  /*Serial.print("I= ");
  Serial.print(ACCurrentValue);
  Serial.println(" A");
  Serial.print("Energy consumed for 10 sec= ");
  Serial.print(enrg);
  Serial.println(" Wh");
  Serial.print("Total Energy consumed= ");
  Serial.print(totalEnrg);
  Serial.println(" Wh");*/
  
  /*digitalWrite(13, HIGH);
  delay(5000);
  digitalWrite(13, LOW);
  delay(5000);*/
  
  radio.startListening();
  char receivedMessage[6] = {0};
  if(radio.available()){
    radio.read(receivedMessage, sizeof(receivedMessage));
    
    radio.stopListening();
 
    String stringMessage(receivedMessage);
    /*Serial.println(stringMessage.substring(0,6));
    Serial.println("Turning off the radio.");
    delay(100);*/

    if(stringMessage.substring(0,6) == "CURNT?"){
      read_crnt();
    }
    if(stringMessage.substring(0,6) == "ENRGY?"){
      read_energy();
    }
    
    //radio.startListening();  
  }
  delay(200);
}

void read_crnt() {
  dtostrf(ACCurrentValue, 4, 2, Buf);
  radio.write(&Buf, sizeof(Buf));
  return;
}

void read_energy() {
  dtostrf(totalEnrg, 4, 2, Buf);
  radio.write(&Buf, sizeof(Buf));
  totalEnrg =0.0;
  return;
}
