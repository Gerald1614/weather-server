var mqtt = require('mqtt')
const mqttAddress = 'mqtt://192.168.2.25';
const mqttClient = mqtt.connect(mqttAddress);
export function msg() {
  mqttClient.on('connect', function() {
    mqttClient.subscribe('tempSensor','pageBtn' [{qos:2}])
    console.log('sensor succesfully subscribed')
  })
  
  mqttClient.on('message', function(topic, data) {
    console.log(topic, data.toString())
  })

} 
