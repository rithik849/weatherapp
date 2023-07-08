import {LocationToLatLong, URL_Type} from "./types"

const url : URL_Type = "https://api.open-meteo.com/v1/forecast?"
//+
//"latitude=51.51&longitude=-0.13&daily=temperature_2m_max%2Ctemperature_2m_min&timezone=Europe%2FLondon";

const locationToLatitudeLongitude : LocationToLatLong = {
    "Europe/London" : {latitude : 51.51, longitude : -0.13},
    "Germany" : {latitude: 51.5, longitude: 10.5}
}

export {url , locationToLatitudeLongitude}

