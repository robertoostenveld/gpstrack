# GPSTRACK 

This is a front-end application for a LoRaWAN GPS tracker. 

The GPS location, battery voltage and temperature are measured by a (Sodaq One)[http://sodaq.com/] and send to (The Things Network)[http://thethingsnetwork.org/]. The Sodaq is running the universal tracker (firmware)[https://github.com/SodaqMoja/SodaqOne-UniversalTracker-v2].

The data is converted on the TTN backend using the following converter
```
function Decoder(bytes, port) {
  // Decode an uplink message from a buffer (array) of bytes to an object of fields.
  // see http://forum.sodaq.com/t/interpreting-payload-data-from-the-sodaqone-universaltracker/374/11

var epoch = (bytes[3] << 24) | (bytes[2] << 16) | (bytes[1] << 8) | bytes[0];
var batt = (3000+10*bytes[4])/1000;
var temp = bytes[5];
var lat = (bytes[9] << 24) | (bytes[8] << 16) | (bytes[7] << 8) | bytes[6];
var lon = (bytes[13] << 24) | (bytes[12] << 16) | (bytes[11] << 8) | bytes[10];
var alt = (bytes[15] << 8) | bytes[14];
var speed = (bytes[17] << 8) | bytes[16];
var course = bytes[18];
var sats = bytes[19];
var ttf = bytes[20];

  return {
    course: course,
    satellites: sats,
    time_to_fix: ttf,
    latitude: lat,
    longitude: lon,
    epoch: epoch,
    battery: batt,
    speed: speed,
    temperature: temp
  };
}
```

The backend sends the json-formatted data to the "TTN Data Storage" integration service, where it is retained for 7 days.

This repository contains the node.js code that reads the data from "TTN Data Storage" and visualizes on on a web page.   
