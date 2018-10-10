import dotenv from 'dotenv'
import express from 'express'
import msg from './weather/index.mjs';
let app = express();
import http from 'http'
let server = http.Server(app)
import io from 'socket.io'
global.io = io(server)

app.use(express.static('public/weather-ui'))
app.use('/pictureDay',express.static('/mnt/Pictures'))
app.get('/', function (req,res) {
  res.sendfile('index.html')
})
msg()

server.listen(process.env.PORT, () => console.log(`Started on port ${process.env.PORT}`));
