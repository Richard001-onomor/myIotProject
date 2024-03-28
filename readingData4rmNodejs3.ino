#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WebServer.h>

HTTPClient http;
WiFiClient client;
ESP8266WebServer server(80); // Use ESP8266WebServer instead of WiFiServer

const char* ssid = "Jesus"; // Replace with your WiFi SSID
const char* password = "Jesusislord"; // Replace with your WiFi password
const char* nodejsIP = "192.168.43.190"; // Replace with your Node.js server's IP address
const int nodejsPort = 3001; // Replace with your Node.js server's port

void ConnectToWifi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(200);
  }
  
  Serial.println();
  Serial.print("Connected to WiFi. IP Address: ");
  Serial.println(WiFi.localIP());
}

void setup() {
  Serial.begin(115200);
  pinMode(D5,OUTPUT);
  pinMode(D6,OUTPUT);
  pinMode(D7,OUTPUT);
  ConnectToWifi();

  server.on("/data", HTTP_POST, []() { // Define a handler for POST requests to "/data"
    String requestBody = server.arg("plain");
    Serial.println("Received JSON data:");
    Serial.println(requestBody);

    // Here you can parse and process the JSON data as needed
    server.send(200, "text/plain", "Data received successfully"); // Send response
  });

  server.begin(); // Start the HTTP server
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    // Construct the URL to communicate with the Node.js server
    String url = "http://" + String(nodejsIP) + ":" + String(nodejsPort) + "/";
    
    // Set timeout to 10 seconds
    http.setTimeout(10000);

    // Send HTTP GET request to the Node.js server
    http.begin(client, url);
    http.addHeader("Content-Type", "text/plain"); // Change Content-Type to accept JSON
    Serial.println("Waiting for response...");
    int httpCode = http.GET();
    
    // Check if the request was successful
    if (httpCode > 0) {
    String responseStr = http.getString(); // Get response as string
    Serial.println("Response received:");
    Serial.println(responseStr);

    // Convert response string to integer
    int response = responseStr.toInt(); // Convert string to integer

      // Control LEDs based on response
      if (response == 1) {
        digitalWrite(D5, HIGH);
      } else if (response == 2) {
        digitalWrite(D5, LOW);
      } else if (response == 3) {
        digitalWrite(D6, HIGH);
      } else if (response == 4) {
        digitalWrite(D6, LOW);
      } else if (response == 5) {
        digitalWrite(D7, HIGH);
      } else if (response == 6) {
        digitalWrite(D7, LOW);
      } else if (response == 8) {
        digitalWrite(D5, HIGH);
        digitalWrite(D6, HIGH);
      } else if (response == 9) {
        digitalWrite(D5, LOW);
        digitalWrite(D6, LOW);
      } else if (response == 10) {
        digitalWrite(D5, HIGH);
        digitalWrite(D7, HIGH);
      } else if (response == 11) {
        digitalWrite(D5, LOW);
        digitalWrite(D7, LOW);
      } else if (response == 12) {
        digitalWrite(D6, HIGH);
        digitalWrite(D7, HIGH);
      } else if (response == 13) {
        digitalWrite(D6, LOW);
        digitalWrite(D7, LOW);
      } else if (response == 14) {
        digitalWrite(D5, HIGH);
        digitalWrite(D6, HIGH);
        digitalWrite(D7, HIGH);
      } else if (response == 15) {
        digitalWrite(D5, LOW);
        digitalWrite(D6, LOW);
        digitalWrite(D7, LOW);
      }
          
    
    
    } else {
      Serial.println("HTTP ERROR");
    }
    http.end();
  } else {
    Serial.println("WiFi Disconnected");
    ConnectToWifi();
  }

  server.handleClient(); // Handle client requests
  delay(5000); // Wait for 5 seconds before sending the next request
}
