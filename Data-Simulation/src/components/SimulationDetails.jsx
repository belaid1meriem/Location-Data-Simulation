import "../App.css"
import SimulationDetail from "./SimulationDetail"
export default function SimulationDetails({
    speed,
    startPoint,
    finalPoint,
    samplingDuration,
    simulationDuration,
    direction}){

    return(
        <div className="simulation-details">
            <SimulationDetail name="Speed" value={speed} unit="km/h" />
            <SimulationDetail name="Start point coordinates" value={startPoint}  />
            <SimulationDetail name="Final point coodinates" value={finalPoint}  />
            <SimulationDetail name="Direction" value={direction} unit="°" />
            <SimulationDetail name="Sampling duration" value={samplingDuration} unit="min" />
            <SimulationDetail name="Simulation duration" value={simulationDuration} unit="min" />
        </div> 
    )
}