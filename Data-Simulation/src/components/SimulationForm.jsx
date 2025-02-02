import "../App.css"
import { BsChevronRight } from "react-icons/bs";
import "../App.css"
import React, { useState, useEffect } from 'react';
import { mapContext } from "../context/mapContext";
import { useContext } from "react";
import { MdCancel } from "react-icons/md";
import { BsFillPinMapFill } from "react-icons/bs";
import Tooltip from "./Tooltip";
import { indicatorsContext } from '../context/indicatorsContext';


export default function SimulationForm({simulation,closeSimulForm}){
    const {name,
        speed,
        startPoint,
        finalPoint,
        samplingDuration,
        simulationDuration,
        distance,
        direction}=simulation;

        const [formData, setFormData] = useState({
            longitude: startPoint[1],
            latitude: startPoint[0],
            simulationDuration,
            samplingDuration,
            name,
            speed,
            direction,
            distance,
            longitudeF:finalPoint[1],
            latitudeF:finalPoint[0],
        });

        const {
            simulations,setSimulations
        }= useContext(mapContext);
    
        const {
            errorMsg,setErrorMsg,
            successMsg,setSuccessMsg,
            infoMsg,setInfoMsg
            }=useContext(indicatorsContext);
    


        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value
            });
        };

        const nameIsValid= () => {
            const simulationsCopy = simulations.slice().filter(simulation => simulation.name !== name);
            return !simulationsCopy.some(simulation => simulation.name === formData.name);
        }
    
        const finalCorrdsAreValid = () => {
            return ! (formData.longitudeF === formData.longitude && formData.latitudeF === formData.latitude)
        }
    
        //controlling using the direction parameter or the final point 
        useEffect(() => {
            if (formData.longitudeF || formData.latitudeF) {
                setFormData({ ...formData, direction: '' });
            } else if (formData.direction) {
                setFormData({ ...formData, longitudeF: '', latitudeF: '' });
            }
        }, [formData.longitudeF, formData.latitudeF, formData.direction]);
    
        const handleSubmit=(e)=>{
            e.preventDefault();
    
            if(!nameIsValid()){
                setErrorMsg("A simulation with the given name already exists.");
                return
            }
    
            if (!finalCorrdsAreValid()){
                setErrorMsg("Please provide a valid final point.");
                return
            }

            const simulation = simulations.find(simulation => simulation.name === name);
            console.log(simulation);
            for(const key in simulation){
                simulation[key] = formData[key]
            }
            console.log(simulation);
    
            // setSimulations([...simulations,formData]);
            closeSimulForm();
            setSuccessMsg("The changes were applied successfully!")
        }

    return(
        <div className="form-container-edit" >
            <div className="form-header">
                <div className="form-title">
                    <h3>Simulation: {name}</h3>
                    <p>simulation details, with possibility to realtime updates</p>
                </div>
                <div className="form-close">
                    <BsChevronRight onClick={closeSimulForm} className="form-close-icon"/>
                </div>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="label">Simulation name </label>
                    <input className="input-field col" type="text" name="name" placeholder="Simulation name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="input-row">
                    <div className="input-group">
                        <label className="label">Simulation duration (minutes)</label>
                        <input className="input-field row" type="number" step="any" name="simulationDuration" placeholder="Duration with minutes,ex: 2" value={formData.simulationDuration} onChange={handleInputChange} required />
                    </div>

                    <div className="input-group">
                        <label className="label">Sampling duration (seconds)</label>
                        <input className="input-field row" type="number" step="any" name="samplingDuration" placeholder="Time stamps to collect the data" value={formData.samplingDuration} onChange={handleInputChange} required />
                    </div>
                </div>
                <div className="input-group">
                    <label className="label big">Start point coordinates</label>
                    <div className="input-row">
                        <div className="input-group">
                            <label className="label">Latitude</label>
                            <input className="input-field row" type="number" step="any" min="-90" max="90" name="latitude" value={formData.latitude} onChange={handleInputChange} required />
                        </div>
                        <div className="input-group">
                            <label className="label">Longitude</label>
                            <input className="input-field row" type="number" step="any" min="-180" max="180" name="longitude" value={formData.longitude} onChange={handleInputChange}  required />
                        </div>
                        <BsFillPinMapFill className="map-icon"/>
                    </div>
                </div>

                <div className="input-group">
                    <label className="label big">Final point coordinates</label>
                    <div className="input-row">                      
                        <div className="input-group">
                            <label className="label">Latitude</label>
                            <input className="input-field row" type="number" step="any" min="-90" max="90" name="latitudeF" value={formData.latitudeF} onChange={handleInputChange} disabled={formData.direction} required />
                        </div>
                        <div className="input-group">
                            <label className="label">Longitude</label>
                            <input className="input-field row" type="number" step="any" min="-180" max="180" name="longitudeF" value={formData.longitudeF} onChange={handleInputChange} disabled={formData.direction} required />
                        </div>
                        
                        <Tooltip text="select position in the map">
                            <BsFillPinMapFill className="map-icon" />
                        </Tooltip>
                    </div>
                </div>

                <div className="input-group">
                    <label className="label">Speed (km/h)</label>
                    <input className="input-field col" type="number" step="any" name="speed" placeholder="Object speed measured with km/h" value={formData.speed} onChange={handleInputChange} required />
                </div>

                
                <div className="input-row">
                    <div className="input-group">
                        <label className="label">Direction (Degrees °)</label>
                        <input className="input-field row" type="number" step="any" min="-180" max="180" name="direction" placeholder="Object direction with degrees" value={formData.direction} onChange={handleInputChange} disabled={formData.longitudeF || formData.latitudeF} required />
                    </div>
                    <div className="input-group">
                        <label className="label">Distance (km)</label>
                        <input className="input-field row" type="number" step="any" name="distance" placeholder="The distance that the object should" value={formData.distance} onChange={handleInputChange} disabled={formData.longitudeF || formData.latitudeF} required />
                    </div>
                </div>

                
                <div className="btn-container">
                    <button className="btn-start" type="submit">Save changes</button>
                </div>
            </form>
        </div>
        
    )
}