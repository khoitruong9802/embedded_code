#include <WiFi.h>
#include "Adafruit_MQTT.h"
#include "Adafruit_MQTT_Client.h"

// WiFi parameters
#define WLAN_SSID       "pagoda wifi"
#define WLAN_PASS       "12345678"
// Adafruit IO
#define AIO_SERVER      "io.adafruit.com"
#define AIO_SERVERPORT  1883
#define AIO_USERNAME    "dongnguyen1543"
#define AIO_KEY         "aio_sISP58I6nIweJOwmSkrdLFw5bgeT" 

int count = 0;

String receivedMessage;

WiFiClient client;
Adafruit_MQTT_Client mqtt(&client, AIO_SERVER, AIO_SERVERPORT, AIO_USERNAME, AIO_KEY);
Adafruit_MQTT_Publish publish_temp = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/get-temp");
Adafruit_MQTT_Publish publish_humi = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/get-humi");
Adafruit_MQTT_Publish publish_light = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/get-light");
Adafruit_MQTT_Publish publish_control_lamp = Adafruit_MQTT_Publish(&mqtt, AIO_USERNAME "/feeds/control-lamp");
Adafruit_MQTT_Subscribe control_lamp = Adafruit_MQTT_Subscribe(&mqtt, AIO_USERNAME "/feeds/control-lamp");

void setup() {
  pinMode(2, OUTPUT);
  Serial.begin(115200);
  Serial2.begin(115200);
  
  // Connect to WiFi access point.
  Serial.println(); Serial.println();
  delay(10);
  Serial.print(F("Connecting to "));
  Serial.println(WLAN_SSID);
  WiFi.begin(WLAN_SSID, WLAN_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(F("."));
  }
  Serial.println();
  Serial.println(F("WiFi connected"));
  Serial.println(F("IP address: "));
  Serial.println(WiFi.localIP());

  mqtt.subscribe(&control_lamp);
  // connect to adafruit io
  connect();

  digitalWrite(2, HIGH);
  delay(250);
  digitalWrite(2, LOW);
  delay(250);
  digitalWrite(2, HIGH);
  delay(250);
  digitalWrite(2, LOW);
  delay(250);
  digitalWrite(2, HIGH);
  delay(250);
  digitalWrite(2, LOW);
  delay(250);
}

// connect to adafruit io via MQTT
void connect() {
  Serial.print(F("Connecting to Adafruit IO... "));
  int8_t ret;
  while ((ret = mqtt.connect()) != 0) {
    switch (ret) {
      case 1: Serial.println(F("Wrong protocol")); break;
      case 2: Serial.println(F("ID rejected")); break;
      case 3: Serial.println(F("Server unavail")); break;
      case 4: Serial.println(F("Bad user/pass")); break;
      case 5: Serial.println(F("Not authed")); break;
      case 6: Serial.println(F("Failed to subscribe")); break;
      default: Serial.println(F("Connection failed")); break;
    }

    if(ret >= 0)
      mqtt.disconnect();

    Serial.println(F("Retrying connection..."));
    delay(10000);
  }
  Serial.println(F("Adafruit IO Connected!"));
}

void loop() {
  Adafruit_MQTT_Subscribe *subscription;
  while ((subscription = mqtt.readSubscription(2000))) {
    if (subscription == &control_lamp) {
      Serial.print(F("Control-lamp: "));
      Serial.println((char *)control_lamp.lastread);
      Serial2.print("c");
      Serial2.println((char *)control_lamp.lastread);
    }
  }
  
  while (Serial2.available() > 0) {
    char receivedChar = Serial2.read();
    if (receivedChar == '\n') {
//      Serial2.println(receivedMessage);  // Print the received message in the Serial2 monitor

      //Reconnect mqtt
      if(! mqtt.ping(3)) {
        // reconnect to adafruit io
        if(! mqtt.connected())
          connect();
      }

      if (receivedMessage.charAt(0) == 'i') {
        String temp_str = receivedMessage.substring(1, 6);
        char temp[6];
        temp_str.toCharArray(temp, 6);
  
        String humi_str = receivedMessage.substring(6, 11);
        char humi[6];
        humi_str.toCharArray(humi, 6);
  
        String light_str = receivedMessage.substring(11, 16);
        char light[6];
        light_str.toCharArray(light, 6);
        
        if (!publish_temp.publish(temp)) {                     //Publish to Adafruit
          Serial.println(F("Publish temp failed"));
        } else {
          Serial.println(F("Temp OK!"));
        }
  
        if (!publish_humi.publish(humi)) {                     //Publish to Adafruit
          Serial.println(F("Publish humi failed"));
        } else {
          Serial.println(F("Humi OK!"));
        }
  
        if (!publish_light.publish(light)) {                     //Publish to Adafruit
          Serial.println(F("Publish light failed"));
        } else {
          Serial.println(F("Light OK!"));
        }
      } else if (receivedMessage.charAt(0) == 'l') {
        if (!publish_control_lamp.publish(receivedMessage.charAt(1) - 48)) {                     //Publish to Adafruit
          Serial.println(F("Publish lamp failed"));
        } else {
          Serial.println(F("Control lamp OK!"));
        }
      }
      receivedMessage = "";  // Reset the received message
    } else {
      receivedMessage += receivedChar;  // Append characters to the received message
    }
  }
}
