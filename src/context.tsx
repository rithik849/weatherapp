import { Context, PropsWithChildren, createContext, useState } from "react";
import {Location} from "./types"



export const LocationContext : Context<[Location,React.Dispatch<React.SetStateAction<string>>]> = createContext<[Location,React.Dispatch<React.SetStateAction<string>>]>(["London",()=>{}])


const CountryProvider = (props : PropsWithChildren) => {
    const [location, setLocation] = useState("Europe/London")
    return (
        <LocationContext.Provider value={[location,setLocation]}>
            {props.children}
        </LocationContext.Provider>

    )
}

export default CountryProvider
