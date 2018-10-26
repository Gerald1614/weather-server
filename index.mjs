import dotenv from 'dotenv'
import express from 'express'
import { msg, weatherTable } from './weather/index.mjs';
import currentWeather from './utils/currentweather'
import forecastWeather from './utils/forecast'

let app = express();
import http from 'http'
let server = http.Server(app)
import io from 'socket.io'
global.io = io(server)
let getCW, getFW

app.use(express.static('public/weather-ui'))
app.use('/pictureDay',express.static('/mnt/Pictures'))
app.get('/', function (req,res) {
  res.sendfile('index.html')
})
global.io.on('connection', (socket) => {
  console.log('user connected');
  sendMessage()
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
msg()

export async function sendMessage () {
  global.io.sockets.emit('currentWeather', await getCW);
  global.io.sockets.emit('forecastWeather', await getFW);
  global.io.sockets.emit('sensorData', await JSON.stringify(weatherTable));
}

getCW = currentWeather.getCurrentWeather()
getFW = forecastWeather.getForecastWeather()
setInterval(() => {
  getCW = currentWeather.getCurrentWeather()
  getFW = forecastWeather.getForecastWeather()
}, 900000)

server.listen(process.env.PORT, () => console.log(`Started on port ${process.env.PORT}`));

