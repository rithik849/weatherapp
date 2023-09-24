import {LocationToLatLong, URL_Type} from "./types"

const url : URL_Type = "https://api.open-meteo.com/v1/forecast?"

const locationToLatitudeLongitude : LocationToLatLong = {
    "Europe/London" : {latitude : 51.51, longitude : -0.13},
    "Germany" : {latitude: 51.5, longitude: 10.5}
}

export {url , locationToLatitudeLongitude}

