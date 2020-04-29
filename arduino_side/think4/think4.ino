#include<stdlib.h>
#include<SPI.h>
#include<RF24.h>

// ce, csn pins
RF24 radio(9, 10);

char resp_opened[7]="WINDW1";
char resp_closed[7]="WINDW0"; 
char Buf[5];
int windowSwitch = 4;
int tcnt=199;
boolean windowIsOpen=false;

void setup() {
  Serial.begin(9600);
  Serial.println("System start.");
  Serial.println("Windows Module.");
  pinMode(windowSwitch, INPUT_PULLUP);

  radio.begin();
  //radio.setDataRate(RF24_250KBPS);  //ΠΡΟΣΟΧΗ ΣΤΟ DATA RATE
  radio.setDataRate(RF24_1MBPS);
  //radio.setPALevel(RF24_PA_MIN);
  radio.setPALevel(RF24_PA_MAX);
  radio.setChannel(0x76);
  radio.openWritingPipe(0xF0F0F0F0E4LL);
  const uint64_t pipe = (0xE8E8F0F0E4LL);
  radio.openReadingPipe(1, pipe);
  
  radio.enableDynamicPayloads();
  radio.powerUp();

}

void loop() {
  
  radio.startListening();
  char receivedMessage[6] = {0};

  if(radio.available()){
    radio.read(receivedMessage, sizeof(receivedMessage));
    
    radio.stopListening();
 
    String stringMessage(receivedMessage);
    Serial.println(stringMessage.substring(0,6));
    Serial.println("Turning off the radio.");
    delay(100);
    
    if(stringMessage.substring(0,6) == "WINDW?"){
      read_window();
    }
    
    
  }
  if (tcnt >= 200) {
    tcnt =0;
    if (digitalRead(windowSwitch)) {
       windowIsOpen = true;
       //Serial.println("Window is opened");
      }
    else {
      windowIsOpen = false;
      //Serial.println("Window is closed");
    }
  }
  ++tcnt;

  delay(100);

}

void read_window() {
 
  if (windowIsOpen){
    radio.write(&resp_opened, sizeof(resp_opened));
    radio.powerDown();
    delay(100);
    radio.powerUp();
    delay(100);
    return;
  }
  else
  {
    radio.write(&resp_closed, sizeof(resp_closed));
    radio.powerDown();
    delay(100);
    radio.powerUp();
    delay(100);
    return;
  }
  
}
