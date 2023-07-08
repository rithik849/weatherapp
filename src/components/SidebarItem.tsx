

import React, { useContext } from 'react'
import {LocationContext} from "../context"
import { Location } from '../types'


interface SideBarItemProp{
   country : Location
}

const SidebarItem = (props : SideBarItemProp ) => {
    const [location,setLocation] = useContext(LocationContext)
    return (
        <div className={"sidebar-item " + (location===props.country ? "selected" : "")} onClick = {() => setLocation(props.country)}>{props.country}</div>
    )

}

export default SidebarItem