
import express from 'express'
const port = 3000;
import msg from './weather/index';

let app = express();
let server = require('http').Server(app)
global.io = require('socket.io')(server);

app.use(express.static('public/weather-ui'))
app.get('/', function (req,res) {
  res.sendfile('index.html')
})
msg()

server.listen(port, () => console.log(`Started on port ${port}`));

