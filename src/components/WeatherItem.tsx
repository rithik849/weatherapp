import '../styles/WeatherItem.css'
import { date_format} from '../utils';
import { useEffect, useState } from 'react';
import {useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';

export interface DailyWeatherProps { 
    date : string,
    min_temp : number,
    max_temp : number,
    key : number,
    units : Record<string,string>
}

const WeatherItem :React.FC<React.PropsWithChildren<DailyWeatherProps>> = (prop) : React.ReactElement => {
    const [date,setDate]  =  useState<DateTime>(DateTime.now())
    const navigate = useNavigate()

    useEffect(() => {
        console.log(prop)
        setDate(DateTime.fromFormat(prop.date,'yyyy-MM-dd'))
    },[])


    return (
            <div className = "WeatherItem" onClick={() => {navigate( date.toFormat('yyyy-MM-dd') ) } }>
                <div className='Contents'>
                    <div className="Day">{date.toFormat('cccc')} </div>
                    <div className="Date">{date.toFormat('dd-MM-yyyy')}  </div>
                    <div className="Min_temp">{"" + prop.min_temp + prop.units.temperature_2m_min }</div> 
                    <div className="Max_temp">{"" + prop.max_temp + prop.units.temperature_2m_max}</div>
                </div>
            </div>
        )

}

export {WeatherItem}