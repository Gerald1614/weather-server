
const  express = require('express');
const fs = require('fs'); //require filesystem module
const port = 3000;
import {msg} from './weather/index';

let app = express();
app.get('/', handler);


function handler (req, res) { //create server
  fs.readFile(__dirname + '/public/index.html', function(err, data) { //read file index.html in public folder
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'}); //display 404 on error
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'}); //write HTML
    res.write(data); //write data from index.html
    return res.end();
  });
}
msg()
app.listen(port, () => console.log(`Started on port ${port}`));


