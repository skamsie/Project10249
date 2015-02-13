#include <Ethernet.h>
 #include <SPI.h>
 #include <DHT.h>

 #define DHTPIN 3     // what pin we're connected to
 #define DHTTYPE DHT22   // DHT 22  (AM2302)
 DHT dht(DHTPIN, DHTTYPE);

 // Ethernet MAC address - must be unique on your network - MAC Reads T4A001 in hex (unique in your network)
 byte mac[] = { 0x54, 0x34, 0x41, 0x30, 0x30, 0x31 };                                       
 // For the rest we use DHCP (IP address and such)

 EthernetClient client;
 char server[] = "www.project10249.tk"; // IP Adres (or name) of server to dump data to
 int  interval = 15000; // Wait between dumps

 void setup() {

   Serial.begin(9600);
   dht.begin();
   Ethernet.begin(mac);

   Serial.println("Arduino - Temperature Drone - v2.0");
   Serial.println("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n");
   Serial.print("IP Address        : ");
   Serial.println(Ethernet.localIP());
   Serial.print("Subnet Mask       : ");
   Serial.println(Ethernet.subnetMask());
   Serial.print("Default Gateway IP: ");
   Serial.println(Ethernet.gatewayIP());
   Serial.print("DNS Server IP     : ");
   Serial.println(Ethernet.dnsServerIP());

 
 }

 void loop() {
     
     float t = dht.readTemperature();
     float h = dht.readHumidity();
  // if you get a connection, report back via serial:
   if (client.connect(server, 80)) {
     //Serial.println("-> Connected");
     client.print( "GET /files/add_data.php?temperature=");
     client.print(t);
     client.print("&&");
     client.print("humidity=");
     client.print(h);
     client.println(" HTTP/1.1");
     client.println( "Host: www.project10249.tk" );
     client.println( "Connection: close" );
     client.println();
     client.println();
     client.stop();
  }
  
  else {
    // you didn't get a connection to the server:
    //Serial.println("--> connection failed/n");
  }

  delay(interval);
}
