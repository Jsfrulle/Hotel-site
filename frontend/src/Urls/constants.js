const BASE_URL = 'https://hotel-backend-1.herokuapp.com';

export const BASE = `${BASE_URL}`

export const API_URL = (slug) => `${BASE_URL}/${slug}`;



export const API_URL_HOTEL = (slug) => `https://booking-com.p.rapidapi.com/v1/hotels/locations?name=${slug}&locale=en-gb`


/* export const WEATHER_API = () => `https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&APPID=${KEY_WEATHER}` */