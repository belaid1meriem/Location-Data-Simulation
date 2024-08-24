import "../App.css"
import SimulationDetail from "./SimulationDetail"
import { mapContext } from "../context/mapContext";
import { indicatorsContext } from '../context/indicatorsContext';
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineEditLocationAlt } from "react-icons/md";
import { useContext } from "react";
export default function SimulationDetails({
    name,
    speed,
    startPoint,
    finalPoint,
    samplingDuration,
    simulationDuration,
    direction,
    distance,
    setOpenedSimulationDetails}){

        const {
            simulations,setSimulations,
        }= useContext(mapContext);

        const {
            errorMsg,setErrorMsg,
            successMsg,setSuccessMsg,
            infoMsg,setInfoMsg
            }=useContext(indicatorsContext);

        const deleteSimulation = (name) => {
            setSimulations(simulations.filter(simulation =>simulation.name !== name))
            setSuccessMsg("The simulation " + name + " was deleted successfully!")
        }

    return(
        <div className="simulation-details">
            <div>
                <SimulationDetail name="Speed" value={speed} unit="km/h" />
                <SimulationDetail name="Start point coordinates" value={startPoint}  />
                {direction ===''?<SimulationDetail name="Final point coodinates" value={finalPoint}  />
                               : <>
                                    <SimulationDetail name="Direction" value={direction} unit="°" />
                                    <SimulationDetail name="Distance" value={distance} unit="km" />
                                </>}
                <SimulationDetail name="Sampling duration" value={samplingDuration} unit="s" />
                <SimulationDetail name="Simulation duration" value={simulationDuration} unit="min" />
            </div>
            <div className="simulation-details-ctrl">
                <MdOutlineEditLocationAlt className="edit-icon" onClick={()=>{setOpenedSimulationDetails({  name,
                                                                                                            speed,
                                                                                                            startPoint,
                                                                                                            finalPoint,
                                                                                                            samplingDuration,
                                                                                                            simulationDuration,
                                                                                                            direction,
                                                                                                            distance})}}/>
                <MdDeleteOutline className="delete-icon" onClick={()=>deleteSimulation(name)} />
            </div>
        </div> 
    )
}