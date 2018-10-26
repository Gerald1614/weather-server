import fetch from 'node-fetch'

export default {
  async getCurrentWeather () {
     return await fetch(`http://api.openweathermap.org/data/2.5/weather?q=montreal,ca&appid=${process.env.VUE_APP_OWM_KEY}&units=metric`, {
      method: 'get'
    })
    .then(response => {
      handlerErrors(response)
      response.json()
    })
    .then(jsonData => {
      console.log(jsonData)
       return jsonData
    })
    .catch(err => {
            console.log(err)
        })
  }
}
function handleErrors (response) {
  console.log(response)
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}
