import SideBar from "./SideBar";
import './Doctor.scss'
import { useState } from "react";
import { FaBars } from 'react-icons/fa'

const Doctor = (props) => {

    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="doctor-container">
            <div className="doctor-sidebar">
                <SideBar
                    collapsed={collapsed}
                />
            </div>

            <div className="admin-content">
                <FaBars onClick={() => setCollapsed(!collapsed)} />
                ABC
            </div>
        </div>
    );
}

export default Doctor;