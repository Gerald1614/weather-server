var mqtt = require('mqtt')
var app = require('express')();

const mqttAddress = 'mqtt://192.168.2.25';
const mqttClient = mqtt.connect(mqttAddress);
export function msg() {
  mqttClient.on('connect', function() {
    mqttClient.subscribe(['tempSensor', 'pageBtn'])
    console.log('sensor succesfully subscribed')
  })
  
  mqttClient.on('message', function(topic, data) {
    console.log(topic, data.toString());
    io.sockets.emit('sensorData', data.toString());
  })

} 

