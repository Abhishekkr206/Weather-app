const apikey = '0424fbd0c790400e2e5a559e9af49ed8'
const input = document.getElementById('input')
const submit = document.getElementById('submit')
const card = document.getElementById("card")

async function handleweather(){
    const city = input.value
    if(city){
        try{
            const wetherdata = await getweather(city)
            displayweather(wetherdata)
        }
        catch(error){
            console.error(error)
            errormessage(error)
        }
    }
    else{
        errormessage("Select any city")
    }
}

submit.addEventListener('click',handleweather)

input.addEventListener('keydown',(event) =>{
    if(event.key === "Enter"){
        handleweather()
    }
})

async function getweather(city){
    const reponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
    
    if(!reponse.ok){
        throw new Error("can't able to fetch data")
    }
    const data = await reponse.json()
    // console.log(data)
    return data
}
getweather("delhi")
async function displayweather(data){
    card.textContent = ""

    const body = document.body
    const display_name = document.createElement("h1")
    const display_temp = document.createElement("h1")
    const display_weather = document.createElement("h3")
    const display_humidity = document.createElement("h4")
    const display_feelslike = document.createElement("h4")
    const sup = document.createElement("sup")

    const mweatherdiv = document.createElement("div")
    mweatherdiv.classList.add("mweather")
    const temp_weatherdiv = document.createElement("div")
    temp_weatherdiv.classList.add("temp-weather")
    const humidity_feelsdiv = document.createElement("div")
    humidity_feelsdiv.classList.add("hum-feels")

    const name = data.name
    const temp = Math.round(data.main.temp - 273.15)
    const weather = data.weather[0].main
    const humidity = data.main.humidity
    const feels_like = Math.round(data.main.feels_like - 273.15)

    display_name.textContent = name
    display_temp.textContent = temp
    display_weather.textContent = weather
    display_humidity.textContent = `Humidity: ${humidity}%`
    display_feelslike.textContent = `Feels like: ${feels_like}`
    sup.textContent = "•"

    card.appendChild(display_name);
    display_name.classList.add("cityname")

    card.appendChild(mweatherdiv);

    mweatherdiv.appendChild(temp_weatherdiv)
    temp_weatherdiv.appendChild(display_temp);
    display_temp.classList.add("temp")
    display_temp.appendChild(sup)
    temp_weatherdiv.appendChild(display_weather);
    display_weather.classList.add("weather")

    mweatherdiv.appendChild(humidity_feelsdiv)
    humidity_feelsdiv.appendChild(display_humidity);
    display_humidity.classList.add("humidity")
    humidity_feelsdiv.appendChild(display_feelslike);
    display_feelslike.classList.add("feels")

    // for the background images
    if(weather == "Mist"){
        body.style.backgroundImage = `url('mist.webp')`
    }
    else if(weather == "Rain"){
        body.style.backgroundImage = `url('rain.jpg')`
    }
    else if(weather == "Clear"){
        body.style.backgroundImage = `url('clear.jpg')`
    }
    else if(weather == "Snow"){
        body.style.backgroundImage = `url('Snoww.jpg')`
    }
    else if(weather == "Haze"){
        body.style.backgroundImage = `url('haze,fog.jpg')`
    }
    else if(weather == "Fog"){
        body.style.backgroundImage = `url('haze,fog.jpg')`
    }
    else if(weather == "Clouds"){
        body.style.backgroundImage = `url('clouds.jpg')`
    }
    else{
        body.style.backgroundImage = ``  
    }
    
    //for debuging
    console.log(name)
    console.log(temp)
    console.log(weather)
    console.log(humidity)
    console.log(feels_like)
}

function errormessage(error){
    let pra = document.createElement("p")
    pra.textContent = error

    card.textContent = ""
    card.appendChild(pra)
}