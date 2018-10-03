
import express from 'express'
const port = 3000;
import msg from './weather/index.mjs';
let app = express();
import http from 'http'
let server = http.Server(app)
import io from 'socket.io'
global.io = io(server)

app.use(express.static('public/weather-ui'))
app.get('/', function (req,res) {
  res.sendfile('index.html')
})
msg()

server.listen(port, () => console.log(`Started on port ${port}`));

