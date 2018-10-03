var mqtt = require('mqtt')
var app = require('express')();
let PressureMinMax=[];
let PressureMin = 0;
let PressureMax = 0;
let weatherTable = {};

const mqttAddress = 'mqtt://192.168.2.25';
const mqttClient = mqtt.connect(mqttAddress);
export function msg() {
  mqttClient.on('connect', function() {
    mqttClient.subscribe(['tempSensor', 'pageBtn', 'MonitorOn'])
    console.log('sensor succesfully subscribed')
  })
  
  mqttClient.on('message', function(topic, data) {
    console.log(topic, JSON.parse(data));
    if(topic === "tempSensor") {
      if (JSON.parse(data).length === 0) {
        return
      } else {
        weatherTable.alertPress = alert(JSON.parse(data));
        weatherTable.PressureMin = PressureMin;
        weatherTable.PressureMax = PressureMax;
        weatherTable.data = JSON.parse(data);
        io.sockets.emit('sensorData', JSON.stringify(weatherTable));
      }

    }
  })

} 

function alert(data) {
  PressureMinMax =[]
  data.forEach(function (pressure, index) {
    PressureMinMax.push({'pressure' :pressure.pressure_hPa, 'timing':pressure.timing})
  })
  if(PressureMax.lenght >5) {
    PressureMinMax.pop();
  }
  PressureMinMax.sort((a, b) => b.pressure - a.pressure)
  console.log(PressureMinMax)
  PressureMin= PressureMinMax[PressureMinMax.length-1]
  PressureMax = PressureMinMax[0]
    if ((PressureMax.pressure - PressureMin.pressure) >=2 && PressureMax.timing > PressureMin.timing && PressureMax.pressure <=1015) {
      return 'Meilleure météo à court terme,la dépression s\'éloigne'
    };
    if ((PressureMax.pressure - PressureMin.pressure) >=2 && PressureMax.timing > PressureMin.timing && PressureMax.pressure > 1015) {
      return 'Meilleure météo de 1 à plusieurs jours'
    };
    if ((PressureMax.pressure - PressureMin.pressure) >=2 && PressureMax.timing < PressureMin.timing && PressureMax.pressure > 1015) {
      return 'Orage'
    };
    if ((PressureMax.pressure - PressureMin.pressure) >=2 && PressureMax.timing < PressureMin.timing && PressureMax.pressure < 1015) {
      return 'Tempête'
    };
    if ((PressureMax.pressure - PressureMin.pressure) >=0.25 && (PressureMax.pressure - PressureMin.pressure) <=0.5 && PressureMax.timing > PressureMin.timing) {
      return 'Venue d\'une haute pression (à long terme)'
    };
    if ((PressureMax.pressure - PressureMin.pressure) >=0.5 && (PressureMax.pressure - PressureMin.pressure) <=1 && PressureMax.timing > PressureMin.timing) {
      return 'Venue d\'une haute pression (à moyen terme)'
    };
    if ((PressureMax.pressure - PressureMin.pressure) >=1 && (PressureMax.pressure - PressureMin.pressure) <=2 && PressureMax.timing > PressureMin.timing) {
      return 'Moyenne pression (à court terme)'
    };
    if ((PressureMax.pressure - PressureMin.pressure) >=0.25 && (PressureMax.pressure - PressureMin.pressure) <=0.5 && PressureMax.timing < PressureMin.timing) {
      return 'Venue d\'une basse pression (à long terme)'
    };
    if ((PressureMax.pressure - PressureMin.pressure) >=0.5 && (PressureMax.pressure - PressureMin.pressure) <=1 && PressureMax.timing < PressureMin.timing) {
      return 'Venue d\'une basse pression (à moyen terme)'
    };
    if ((PressureMax.pressure - PressureMin.pressure) >=1 && (PressureMax.pressure - PressureMin.pressure) <=2 && PressureMax.timing < PressureMin.timing) {
      return 'Pluies abondantes, mauvais temps'
    };
    return 'Pas de variation majeure'
 

}