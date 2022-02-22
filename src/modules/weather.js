const API = 'http://api.openweathermap.org/data/2.5/weather?';
const API_time = 'https://api.openweathermap.org/data/2.5/onecall/timemachine?';
const API_forecast = 'https://api.openweathermap.org/data/2.5/onecall?';
const API_key = process.env.API_key;
const lang = 'es';
const units = 'metric';
const exclude = 'current,hourly,minutely';

var key 
export const Position = async (lat, lon) =>{
    return fetch(`${API}lat=${lat}&lon=${lon}&appid=${API_key}&units=${units}&lang=${lang}`)
    .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
    .then(res => res.json())
    .then(res =>{
        sessionStorage.setItem(res.id,JSON.stringify(res))
        key = res.id
        return key
    })
}

export const search_city = (city) => {
    return fetch(`${API}q=${city}&appid=${API_key}&units=${units}&lang=${lang}`)
    .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
    .then(res => res.json())
    .then(res => {
        sessionStorage.setItem(res.id,JSON.stringify(res))
        key = res.id
        return key
    })
}

export const historical = (dt,lat,lon) => {
    return fetch(`${API_time}lat=${lat}&lon=${lon}&dt=${dt}&appid=${API_key}&units=${units}&lang=${lang}`)
    .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
    .then(res => res.json())
    .then(res => {
        sessionStorage.setItem(res.current.dt,JSON.stringify(res))
        key = res.current.dt
        return key
    })
}
export const forecast = (lat,lon) => {
    return fetch(`${API_forecast}lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${API_key}&units=${units}&lang=${lang}`)
    .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
    .then(res => res.json())
    .then(res => {
        sessionStorage.setItem(res.lat,JSON.stringify(res))
        key = res.lat
        return key
    })
}