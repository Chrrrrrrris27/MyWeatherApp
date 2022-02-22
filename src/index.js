import {Position, search_city, historical, forecast} from "@modules/weather"  
import "@styles/main.css";
import "@styles/media.css"

const hist = document.getElementById('historical')
const curr = document.getElementById('current-info')
const fore = document.getElementById('forecast')
const button_h = document.getElementById('button-his')
const button_f = document.getElementById('button-for')
const button_cl = document.getElementById('button-curr-l')
const button_cr = document.getElementById('button-curr-r')

const location =  document.getElementById('location')
const present =  document.getElementById('presentday')
const search =  document.getElementById('search')
const input_city =  document.getElementById('city')
const temp =  document.getElementById('temp')
const feels =  document.getElementById('feels')
const press =  document.getElementById('press')
const humedity =  document.getElementById('humedity')
const speedW =  document.getElementById('speed-w')
const weather =  document.getElementById('weather')
const lastday1 = document.getElementById('lastday1')
const lastdate1 = document.getElementById('lastdate1')
const temp1 = document.getElementById('temp1')
const weather1 = document.getElementById('weather1')
const lastday2 = document.getElementById('lastday2')
const lastdate2 = document.getElementById('lastdate2')
const temp2 = document.getElementById('temp2')
const weather2 = document.getElementById('weather2')
const lastday3 = document.getElementById('lastday3')
const lastdate3 = document.getElementById('lastdate3')
const temp3 = document.getElementById('temp3')
const weather3 = document.getElementById('weather3')
const nextday1 = document.getElementById('nextday1')
const nextdate1 = document.getElementById('nextdate1')
const nexttmax1 = document.getElementById('nexttmax1')
const nexttmin1 = document.getElementById('nexttmin1')
const nextweather1 = document.getElementById('nextweather1')
const nextday2 = document.getElementById('nextday2')
const nextdate2 = document.getElementById('nextdate2')
const nexttmax2 = document.getElementById('nexttmax2')
const nexttmin2 = document.getElementById('nexttmin2')
const nextweather2 = document.getElementById('nextweather2')
const nextday3 = document.getElementById('nextday3')
const nextdate3 = document.getElementById('nextdate3')
const nexttmax3 = document.getElementById('nexttmax3')
const nexttmin3 = document.getElementById('nexttmin3')
const nextweather3 = document.getElementById('nextweather3')
const lasticon1 = document.getElementById('lasticon1')
const lasticon2 = document.getElementById('lasticon2')
const lasticon3 = document.getElementById('lasticon3')
const currenticon = document.getElementById('currenticon')
const nexticon1 = document.getElementById('nexticon1')
const nexticon2 = document.getElementById('nexticon2')
const nexticon3 = document.getElementById('nexticon3')

const icon = document.getElementById('search-icon')

const days = ['Dom','Lun','Mar','Mie','Jue','Vie','Sab']
const month = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
var arrayHistory = []
var city
var dataCity
var lastCity
var lat
var lon
var dt

const GetData = (key) => {
    dataCity = JSON.parse(sessionStorage.getItem(key))
    location.textContent = `${dataCity.name}, ${dataCity.sys.country}`
    var day = new Date(dataCity.dt*1000)
    present.textContent = `${days[day.getDay()]}, ${month[day.getMonth()]} ${day.getDate()}`
    temp.textContent = `${Math.round(dataCity.main.temp)}°C`
    currenticon.setAttribute('src',`assets/icons/${dataCity.weather[0].icon}.svg`)
    feels.textContent = `Sencación: ${Math.round(dataCity.main.feels_like)}°C`
    press.textContent = `Presión: ${dataCity.main.pressure}hPa`
    humedity.textContent = `Humedad: ${dataCity.main.humidity}%`
    speedW.textContent = `Velocidad del Viento: ${dataCity.wind.speed}m/s`
    weather.textContent = dataCity.weather[0].description
    lat = dataCity.coord.lat
    lon = dataCity.coord.lon
    for (var i = 1; i<=3; i++){
        dt = (dataCity.dt) - (86400*i)
        arrayHistory.push(historical(dt,lat,lon).then(res=> {
            lastCity = JSON.parse(sessionStorage.getItem(res))
            return lastCity.current
        }))
    }
    arrayHistory[0].then(res=>{
        var data = new Date(res.dt * 1000)
        lastday3.textContent = days[data.getDay()]
        lastdate3.textContent = `${month[data.getMonth()]} ${data.getDate()}`
        temp3.textContent = `${Math.round(res.temp)}°C`
        weather3.textContent = res.weather[0].description
        lasticon3.setAttribute('src',`assets/icons/${res.weather[0].icon}.svg`)
    })
    arrayHistory[1].then(res=>{
        var data = new Date(res.dt * 1000)
        lastday2.textContent = days[data.getDay()]
        lastdate2.textContent = `${month[data.getMonth()]} ${data.getDate()}`
        temp2.textContent = `${Math.round(res.temp)}°C`
        weather2.textContent = res.weather[0].description
        lasticon2.setAttribute('src',`assets/icons/${res.weather[0].icon}.svg`)
    })
    arrayHistory[2].then(res=>{
        var data = new Date(res.dt * 1000)
        lastday1.textContent = days[data.getDay()]
        lastdate1.textContent = `${month[data.getMonth()]} ${data.getDate()}`
        temp1.textContent = `${Math.round(res.temp)}°C`
        weather1.textContent = res.weather[0].description
        lasticon1.setAttribute('src',`assets/icons/${res.weather[0].icon}.svg`)
    })
    forecast(lat,lon).then(res=>Pronostic(res))
}

const Pronostic = (key) => {
    var nextCity = JSON.parse(sessionStorage.getItem(key))
    var data1 = new Date(nextCity.daily[1].dt * 1000)
    var data2 = new Date(nextCity.daily[2].dt * 1000)
    var data3 = new Date(nextCity.daily[3].dt * 1000)
    nextday1.textContent = days[data1.getDay()]
    nextdate1.textContent = `${month[data1.getMonth()]} ${data1.getDate()}`
    nexttmax1.textContent = `Máx: ${Math.round(nextCity.daily[1].temp.max)}°C`
    nexttmin1.textContent = `Mín: ${Math.round(nextCity.daily[1].temp.min)}°C`
    nextweather1.textContent = nextCity.daily[1].weather[0].description
    nexticon1.setAttribute('src',`assets/icons/${nextCity.daily[1].weather[0].icon}.svg`)
    nextday2.textContent = days[data2.getDay()]
    nextdate2.textContent = `${month[data2.getMonth()]} ${data2.getDate()}`
    nexttmax2.textContent = `Máx: ${Math.round(nextCity.daily[2].temp.max)}°C`
    nexttmin2.textContent = `Mín: ${Math.round(nextCity.daily[2].temp.min)}°C`
    nextweather2.textContent = nextCity.daily[2].weather[0].description
    nexticon2.setAttribute('src',`assets/icons/${nextCity.daily[2].weather[0].icon}.svg`)
    nextday3.textContent = days[data3.getDay()]
    nextdate3.textContent = `${month[data3.getMonth()]} ${data3.getDate()}`
    nexttmax3.textContent = `Máx: ${Math.round(nextCity.daily[3].temp.max)}°C`
    nexttmin3.textContent = `Mín: ${Math.round(nextCity.daily[3].temp.min)}°C`
    nextweather3.textContent = nextCity.daily[3].weather[0].description
    nexticon3.setAttribute('src',`assets/icons/${nextCity.daily[3].weather[0].icon}.svg`)

    locationlength(mql)
}

const options = {
    enableHightAccuracy: true,
    timeout: 5000,
    maximunAge: 0
}
const getPosition = (position) =>{
    lat = position.coords.latitude
    lon = position.coords.longitude
    Position(lat, lon).then(res=> GetData(res))
}
const error = (error) => console.log(error)
const geolocation = navigator.geolocation
geolocation.getCurrentPosition(getPosition, error, options)

search.addEventListener('submit',(e)=>{
    e.preventDefault()

    city = search.city.value
    arrayHistory = []
    search_city(city).then(res=>GetData(res))
})

input_city.addEventListener('focusin',()=>{
    icon.style.boxShadow = "inset 0px 0px 4px 1px #CCF"
})
input_city.addEventListener('focusout',()=>{
    icon.style.boxShadow = "0px 10px 10px -4px #333"
})

button_h.addEventListener('click',()=>{
    hist.classList.add('on-r')
    hist.classList.remove('historical-off','off-l')
    curr.classList.add('off-r')
    curr.classList.remove('on-r','on-l','current-info-on')
    button_h.classList.add('display-none')
    button_f.classList.add('display-none')
    button_cr.classList.remove('display-none')
})
button_cr.addEventListener('click',()=>{
    hist.classList.add('off-l')
    hist.classList.remove('on-r')
    curr.classList.add('on-l')
    curr.classList.remove('off-r')
    button_h.classList.remove('display-none')
    button_f.classList.remove('display-none')
    button_cr.classList.add('display-none')
})
button_cl.addEventListener('click',()=>{
    fore.classList.add('off-r')
    fore.classList.remove('on-l')
    curr.classList.add('on-r')
    curr.classList.remove('off-l')
    button_h.classList.remove('display-none')
    button_f.classList.remove('display-none')
    button_cl.classList.add('display-none')
})
button_f.addEventListener('click',()=>{
    fore.classList.add('on-l')
    fore.classList.remove('forecast-off','off-r')
    curr.classList.add('off-l')
    curr.classList.remove('on-l','on-r','current-info-on')
    button_h.classList.add('display-none')
    button_f.classList.add('display-none')
    button_cl.classList.remove('display-none')
})

const mql = matchMedia('(min-width:768px)')
const mqlm = matchMedia('(max-width:1200px)')

const appMedia = mql =>{
    if(mql.matches){
        hist.classList.remove('on-r','off-l','off-r')
        curr.classList.remove('on-l','on-r','off-l','off-r')
        fore.classList.remove('on-l','off-l','off-r')
    }else{
        hist.classList.add('historical-off')
        curr.classList.add('current-info-on')
        fore.classList.add('forecast-off')
        hist.classList.remove('on-r','off-l','off-r')
        curr.classList.remove('on-l','on-r','off-l','off-r')
        fore.classList.remove('on-l','off-l','off-r')
        button_h.classList.remove('display-none')
        button_f.classList.remove('display-none')
        button_cl.classList.add('display-none')
        button_cr.classList.add('display-none')
    }
}

addEventListener('resize',()=>{
    location.classList.remove('small-font')
    location.classList.remove('medium-font')
    appMedia(mql)
    locationlength(mql, mqlm)
})

const locationlength = (mql, mqlm) =>{
    if(mql.matches && mqlm.matches){
        if(location.textContent.length > 10){
            location.classList.add('small-font')
            location.classList.remove('medium-font')
        }else{
            location.classList.remove('medium-font')
            location.classList.remove('small-font')
        }
    }else if(!mql.matches){
        if(location.textContent.length > 10){
            location.classList.add('medium-font')
            location.classList.remove('small-font')
        }else{
            location.classList.remove('small-font')
            location.classList.remove('medium-font')
        }
    }
}

