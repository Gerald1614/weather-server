
import mqtt from 'mqtt'
import app from 'express'
import fs from 'fs'
import { sendMessage } from '../index.mjs'

let PressureMinMax=[];
let PressureMin = 0;
let PressureMax = 0;
export let weatherTable = {};

const mqttClient = mqtt.connect(process.env.MQTT_ADDRESS);

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
        fs.readdir('/mnt/Pictures', (err, files) => {
          var randomPic = Math.floor(Math.random() * files.length);
          weatherTable.pictureDay = files[randomPic];
          weatherTable.alertPress = alert(JSON.parse(data));
          weatherTable.PressureMin = PressureMin;
          weatherTable.PressureMax = PressureMax;
          weatherTable.data = JSON.parse(data);
          sendMessage()
        })
      }
    } else if (topic === "pageBtn") {
        io.sockets.emit('pageBtn', JSON.parse(data));
        console.log('pageBtn message sent')
    }
  })
} 

function alert(data) {
  PressureMinMax =[]
  data.forEach(function (pressure, index) {
    PressureMinMax.push({'pressure': pressure.pressure_hPa, 'timing': pressure.timing})
  })
  if(PressureMinMax.lenght >5) {
    PressureMinMax.pop();
  }
  PressureMinMax.sort((a, b) => b.pressure - a.pressure)
  console.log(PressureMinMax)
  PressureMin= PressureMinMax[PressureMinMax.length-1]
  PressureMax = PressureMinMax[0]
  if (PressureMin.pressure <= 0) {
    PressureMin.pressure = PressureMax.pressure -10
  }
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