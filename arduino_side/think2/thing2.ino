#include<stdlib.h>
#include "DHT.h"
#include<SPI.h>
#include<RF24.h>


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

char resp_light[7]="LIGHT1";
char resp_dark[7]="LIGHT0"; 
char Buf[5];


int analogInPin = A0;          // Analog input pin
int val = 0;                //Η τιμή την οποία διαβάζει το ADC
int ldrVal =0;
int dark_limit = 20;        //Όριο κάτω από το οποίο ανιχνεύεται ως σκότος


char buffer[10];
float temp[10];
float tav=0;
int tcnt=0;
float tavOld=0;
void setup() {
  Serial.begin(9600);
  Serial.println("System start.");
  Serial.println("Outside sensors Module.");

  pinMode(LED_BUILTIN, OUTPUT);

  radio.begin();
  //radio.setDataRate(RF24_250KBPS);  //ΠΡΟΣΟΧΗ ΣΤΟ DATA RATE
  radio.setDataRate(RF24_1MBPS);
  //radio.setPALevel(RF24_PA_MIN);
  radio.setPALevel(RF24_PA_MAX);
  radio.setChannel(0x76);
  radio.openWritingPipe(0xF0F0F0F0E2LL);
  const uint64_t pipe = (0xE8E8F0F0E2LL);
  radio.openReadingPipe(1, pipe);
  
  radio.enableDynamicPayloads();
  radio.powerUp();

  dht.begin();
  
  cli();                            //stop interrupts

  //set timer1 interrupt at 0.5Hz
  TCCR1A = 0;// set entire TCCR1A register to 0
  TCCR1B = 0;// same for TCCR1B
  TCNT1  = 0;//initialize counter value to 0
  // set compare match register for 1hz increments
  OCR1A = 31249;// = (16*10^6) / (0.5*1024) - 1 (must be <65536)
  // turn on CTC mode
  TCCR1B |= (1 << WGM12);
  // Set CS10 and CS12 bits for 1024 prescaler
  TCCR1B |= (1 << CS12) | (1 << CS10);  
  // enable timer compare interrupt
  TIMSK1 |= (1 << OCIE1A);

  sei();            //allow interrupts

}

ISR(TIMER1_COMPA_vect){
  float t = dht.readTemperature();
    
  // Check if any reads failed and exit early (to try again).
  if (isnan(t)) {
      Serial.println("Failed to read from DHT 1 sensor!");
      digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
      delay(400);                       // wait for a second
      digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
      delay(400);
      //send a predefined message
      //radio.write(&text, sizeof(text));
      return;
      }
    temp[tcnt]=t;
    val = analogRead(analogInPin);
    ldrVal =+ val;
    ++tcnt;
    if (tcnt == 10){
        tcnt=0;
        t=0;
        for (int i=0; i<10; ++i){
          t=t+temp[i];
        }
        tav=t/10;
        tav=round(tav*10.0)/10.0;
        ldrVal = ldrVal/10;
        /////////////////////////////////////
        Serial.print("Outside Temperature: ");
        Serial.print(tav);
        Serial.println(" *C ");
        Serial.print("Analog Input value: ");
        Serial.println(ldrVal);          //print the value read
        }
}

void loop() {
    radio.startListening();
  //char receivedMessage[32] = {0};
  char receivedMessage[6] = {0};
  if(tavOld != tav){
    tavOld = tav;
  }
  
  
  if(radio.available()){
    radio.read(receivedMessage, sizeof(receivedMessage));
    
    radio.stopListening();
 
    String stringMessage(receivedMessage);
    Serial.println(stringMessage.substring(0,6));
    Serial.println("Turning off the radio.");
    delay(100);
    
    if(stringMessage.substring(0,6) == "TEMPR2"){
      read_temp();
    }
    if(stringMessage.substring(0,6) == "LIGHT?"){
      read_ldr();
    }
    
  }

}

void read_temp() {  
  dtostrf(tav, 4, 2, Buf);
  radio.write(&Buf, sizeof(Buf));
  return;
}



void read_ldr() {
 
  if (val < dark_limit){
    radio.write(&resp_dark, sizeof(resp_dark));
    radio.powerDown();
    delay(100);
    radio.powerUp();
    delay(100);
    return;
  }
  else
  {
    radio.write(&resp_light, sizeof(resp_light));
    radio.powerDown();
    delay(100);
    radio.powerUp();
    delay(100);
    return;
  }
  
}
