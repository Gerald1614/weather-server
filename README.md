## Synopsis

This application is part of a project involving Raspberry Pi to build a Weather Station. What differnetiate this project for other is the setup that seperate clearly front end and backend to provide modularity. The whole project is base don javascript.

## description of the main project
The Project is amix of technologies to provide on a screen information collected by weather sensors and data coming from public API. Becasue there was space left on the screen and it brings a nice touch, I added a slideshow of pictures located on a USB stick.

## Technologies used
The idea here was to bring modularity not only in teh way software is built ( so we cna easily add new features) but also in order to be able to bring more devices to cover additional rooms or possibilities. I thus decided to build a back-end with Node JS on a raspberry pi 3 Model B communicating with a raspberry pi zero connected to sensors. I am using MQTT as a MEssage Queue to send data received from sensors to the backend and Socket io to update the infrmation presented to the user Interface. in fact, the raspberry pi zero has two roles has in addition to collect data form sensor and ship them to the back end, it also receive from the backend the presentation layer built on vueJS and served to the browser of the RPi Zero where the screen is also connected.

## diagram of the solution
![diagram](/diagram-weather.jpeg)

## Components used

**front end and sensors**
Raspberry pi Zero w
Adafruit BME280 sensor – connected by i2c 
HC-SR501 PIR motion sensor – connected on GPIO 23
Hold VGA monitor (with HDMI to VGA adaptor)
Button (not used)– connected on GPIO 25 

**Backend**
Raspberry pi 3 model B
USB stick

** running Chromium on raspberry Pi
I really wanted to re-use an old monitor for this project, bu tit appears that running desktop and chromium on a raspberry pi zero is not the best think I woudl recommand to do. TThe system crashes regularly as memeory is quite linit and swap got full. to address that i had to change size of swap changing the followoign file and restarting the swap.

sudo /etc/dphys-swapfil
 change this value : CONF_SWAPFILE=100 (i used 400)
 then
sudo /etc/init.d/dphys-swapfile stop
sudo /etc/init.d/dphys-swapfile start


## Motivation

Thsi project is my first RPI project but I wanted to consolidate in a single project information I only found in many disparate sources of information. there is nothign fancy here but it exposes and integrate the result of many interesting concepts and technologies combined

#the Backend#
 A very basic express js app built with new modular approach supported only with the latest Node JS version (non LTS). The idea was to build a modular backend that coudl host many other apps in the future as well as leverage ES6. I added  an MQTT client to receive data from the raspberry pi zero and socket.io to communciate with the UI.
 It is to be noticed that this application is also used to serve the UI. So I created a public folder where I push my Vue Js application which is accessed by any browser connected to local network.
 The Raspberry pi also acts as the MQTT server so it orhestrate maessages coming from the RPI zero and send it to the node application (hosted on the same RPI 3B)

## Installation

Because I am using ES6 which is not yet supported by standard or LTS version of NODE JS, you need the lastest version of node as well as to launch the app with the <--experimental-modules> attribute. Please note , that the files are not .js file sbut .mjs files. 
I am also also using environment variables through the module dotenv.
here is the line to start the app.
node --experimental-modules -r dotenv/config index.mjs
In order to make sure the app is always up and running, i am using PM2 and created a weather.json file that includes the script to start the app. 
so we start the app by running : sudo pm2 start weather.json

## deploy on RPI
there are many tutorials on how to run node js on RPI, so I will not do it here but I recommend to use PM2. [PM2]:(http://pm2.keymetrics.io/) is a node.js process manager that bring s a lot of nice features but mainly brings you the capability to restart your app if something goes wrong.

## References

Here are the links to the other applciations that are part of the project:
* the UI : [GitHub](http://github.com)
* the node js app running on the RPI zero


## Contributors

Gerald Michelant

## License
You can do whatever you want with this code and learn to have fun with Node js, Vue Js, Raspberry pi...