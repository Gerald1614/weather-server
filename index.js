
const  express = require('express');
const path = require("path");
const port = 3000;
import {msg} from './weather/index';

let app = express();
let server = require('http').Server(app)
global.io = require('socket.io')(server);


app.use(express.static(path.join(__dirname, '..', '..', 'weather-ui/dist/')))
app.get('/', function (req,res) {
  res.sendfile('index.html')
})
msg()


server.listen(port, () => console.log(`Started on port ${port}`));

