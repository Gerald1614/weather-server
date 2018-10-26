module.exports = {
  apps : [{
    name: 'weather',
    "script": "npm",
    "args" : "start",
    autorestart: true
  }],

  deploy : {
    production : {
      key: "/Users/gmichelant/.ssh/id_rsa",
      user : 'pi',
      host : '192.168.2.25',
      ssh_options: "StrictHostKeyChecking=no",
      ref  : 'origin/master',
      repo : 'https://GeraldM1614@bitbucket.org/gegeraptor/weather-server.git',
      path : '/home/pi/weather-station',
      'post-deploy' : 'npm install && pm2 startOrRestart ecosystem.config.js'
    },
    staging: {
      key: "/Users/gmichelant/.ssh/id_rsa",
      user : 'pi',
      host : '192.168.2.25',
      ssh_options: "StrictHostKeyChecking=no",
      ref  : 'origin/master',
      repo : 'https://GeraldM1614@bitbucket.org/gegeraptor/weather-server.git',
      path : '/home/pi/weather-station',
      'post-deploy' : 'pm2 startOrRestart ecosystem.config.js'
    }
  }
};
