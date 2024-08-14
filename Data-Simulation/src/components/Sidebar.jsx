import "../App.css"
import { FaChevronRight } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import Form from "./Form";
import Simulations from "./Simulations";
import { useState } from "react";
import SimulationForm from "./SimulationForm";


export default function Sidebar({visible, handleVisibility, setOpenNewSimulForm}){
    const[openedSimulationDetails,setOpenedSimulationDetails]=useState(null);
    return(
        <div className="sidemenu">
            <div className="arrow-container " >
                <div className="arrow-circle-container" onClick={handleVisibility} >
                    {visible?<FaChevronLeft onClick={handleVisibility} className="arrow" />:<FaChevronRight onClick={handleVisibility} className="arrow" />}
                </div>
            </div>
            <div className="content">
                <Simulations openNewSimulForm={()=>{setOpenNewSimulForm(true)}}  setOpenedSimulationDetails={setOpenedSimulationDetails} />
                {openedSimulationDetails && <SimulationForm simulation={openedSimulationDetails} closeNewSimulForm={()=>{setOpenedSimulationDetails(null)}}/>}
            </div>
        </div>
        
        
    )
}