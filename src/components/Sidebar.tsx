import React, { useState } from 'react'
import {FiMenu, FiArrowLeft} from "react-icons/fi"
import { locationToLatitudeLongitude } from '../constants'
import SidebarItem from './SidebarItem'
import '../styles/Sidebar.css'

const Sidebar : React.FC = () => {
    const [sidebar,setSidebar] = useState(false)

    function toggleSideBar() {
        setSidebar(prev => !prev)
        
    }

    return (
        <div className={sidebar ? "sidebar active" : "sidebar"} >

            {        
                (
                sidebar &&
                <nav className="navigation">
                    {
                    Object.keys(locationToLatitudeLongitude).map(
                        (value,index) => <SidebarItem key={index} country={value}/>
                    )
                    }
                </nav>
                )
            }

            {sidebar ? 
            (<button role="button" className='toggle' onClick={toggleSideBar} >
                <FiArrowLeft className='graphic' />
                 <p className="toggleText">Close Menu</p>
            </button>)
            : 
            (<button role="button" className='toggle' onClick={toggleSideBar}>
                <FiMenu  className='graphic' /> 
                <p className="toggleText">Menu</p>
            </button>)
            }

        
        </div>
    )

}


export default Sidebar