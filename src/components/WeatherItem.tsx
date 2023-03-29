import '../styles/WeatherItem.css'
import {WeatherProps} from "../project_types/types"
import { date_reformat } from '../utils';
import { useEffect, useState } from 'react';

const WeatherItem :React.FC<React.PropsWithChildren<WeatherProps>> = (prop) : React.ReactElement => {
    const [date,setDate]  =  useState<Date>(new Date())

    useEffect(() => {
        const date : {year : number, month : number , day : number }= {
            year: parseInt(prop.date.substring(0,4),10),
            month: parseInt(prop.date.substring(5,7),10) - 1,
            day: parseInt(prop.date.substring(8,10),10)
        };
        console.log(date)
        setDate(new Date(date.year,date.month,date.day))
    },[])


    return (
            <div className = "WeatherItem" onClick={()=>console.log("Clicked!")}>
                <div className='Contents'>
                    <div className="Day">{date.toDateString().substring(0,4)} </div>
                    <div className="Date">{date_reformat(prop.date)}  </div>
                    <div className="Min_temp">{prop.min_temp + "°C"}</div> 
                    <div className="Max_temp">{prop.max_temp + "°C"}</div>
                </div>
            </div>
        )

}

export {WeatherItem}