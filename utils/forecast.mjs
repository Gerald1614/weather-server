import fetch from 'node-fetch'

export default {
   async getForecastWeather () {
    return  await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=montreal,ca&appid=${process.env.VUE_APP_OWM_KEY}&units=metric`, {
      method: 'get'
    })
    .then(response => response.json())
    .then(jsonData => jsonData)
    .catch(err => {
            console.log(err)
        })
  }
}
