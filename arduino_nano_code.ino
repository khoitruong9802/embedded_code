#include "DHT.h"
#include <TFT.h>
#include <SPI.h>

#define cs   10
#define dc   9
#define rst  8

#define DHTPIN 7
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

// create an instance of the library
TFT TFTscreen = TFT(cs, dc, rst);

// char array to print to the screen
//sensor1
char sensorPrintout1[6];
char sensorPrintout2[6];
char sensorPrintout3[6];
char lampStatus[4] = "OFF";
int lamp_status = 0;

String receivedMessage;

void setup() {
  pinMode(5, OUTPUT);
  pinMode(6, OUTPUT);
  
  Serial.begin(115200);
  dht.begin();

  // TFT SCREEN
  TFTscreen.begin();
  TFTscreen.background(0, 0, 0);
  TFTscreen.stroke(14, 255, 55); // bgr
  TFTscreen.setTextSize(2);
  TFTscreen.text("Sensor: ", 0, 0);
  TFTscreen.text("Lamp: ", 0, 80);
  TFTscreen.text(lampStatus, 60, 80);
}
int prev_button = 0;
int count = 0;
void loop() {
  int current_button = digitalRead(4);
  if (prev_button == 0 && current_button == 1) {
    TFTscreen.stroke(0, 0, 0);
    TFTscreen.text(lampStatus, 60, 80);
    if (lamp_status == 0) {
      digitalWrite(6, HIGH);
      lamp_status = 1;
      strcpy(lampStatus, "ON");
      Serial.println("l1");
    } else {
      digitalWrite(6, LOW);
      lamp_status = 0;
      strcpy(lampStatus, "OFF");
      Serial.println("l0");
    }
    TFTscreen.stroke(14, 255, 55); // bgr
    TFTscreen.text(lampStatus, 60, 80);
  }
  prev_button = current_button;
  while (Serial.available() > 0) {
    char receivedChar = Serial.read();
    if (receivedChar == '\n') {
      Serial.println(receivedMessage);
      if (receivedMessage.charAt(0) == 'c') {
        TFTscreen.stroke(0, 0, 0);
        TFTscreen.text(lampStatus, 60, 80);
        if (receivedMessage.charAt(1) == '1') {
          digitalWrite(6, HIGH);
          lamp_status = 1;
          strcpy(lampStatus, "ON");
        } else {
          digitalWrite(6, LOW);
          lamp_status = 0;
          strcpy(lampStatus, "OFF");
        }
        TFTscreen.stroke(14, 255, 55); // bgr
        TFTscreen.text(lampStatus, 60, 80);
      }
      receivedMessage = "";  // Reset the received message
    } else {
      receivedMessage += receivedChar;  // Append characters to the received message
    }
  }
  
  float humi = dht.readHumidity();
  float temp = dht.readTemperature();
  int light_analog = analogRead(A0);
  float light = 100 - (light_analog / 1023.0) * 100.0;

  int mq2_analog = analogRead(A1);
//  Serial.println(mq2_analog);
  if (mq2_analog > 400) {
    digitalWrite(5, HIGH);
  } else {
    digitalWrite(5, LOW);
  }
  
  if (isnan(humi) || isnan(temp)) {
    return;
  }
  
  String sensorVal = String(temp);
  sensorVal.toCharArray(sensorPrintout1, 6);
  TFTscreen.stroke(0, 0, 255);
  TFTscreen.text("Temp:", 0, 20);
  TFTscreen.text(sensorPrintout1, 60, 20);
  TFTscreen.circle(123, 20, 2);
  TFTscreen.text("C", 128, 20);

  sensorVal = String(humi);
  sensorVal.toCharArray(sensorPrintout2, 6);
  TFTscreen.stroke(246, 130, 50);
  TFTscreen.text("Humi:", 0, 40);
  TFTscreen.text(sensorPrintout2, 60, 40);
  TFTscreen.text("%", 128, 40);
  
  sensorVal = String(light);
  sensorVal.toCharArray(sensorPrintout3, 6);
  TFTscreen.stroke(85, 253, 255);
  TFTscreen.text("Light:", 0, 60);
  TFTscreen.text(sensorPrintout3, 72, 60);
  TFTscreen.text("%", 140, 60);
  
  delay(500);
  TFTscreen.stroke(0, 0, 0);
  TFTscreen.text(sensorPrintout1, 60, 20);
  TFTscreen.text(sensorPrintout2, 60, 40);
  TFTscreen.text(sensorPrintout3, 72, 60);

  if (count >= 39) {
    Serial.print("i");
    Serial.print(temp);
    Serial.print(humi);
    Serial.println(light);
    count = 0;
  }
  count = count + 1;
}
