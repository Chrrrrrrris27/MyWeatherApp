const API = process.env.API;
const API_time = process.env.API_time;
const API_forecast = process.env.API_forecast;
const API_key = process.env.API_key;
const lang = process.env.lang;
const units = process.env.units;
const exclude = process.env.exclude;

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