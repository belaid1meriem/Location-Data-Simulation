import "../App.css"
import React, { useState, useEffect } from 'react';
import { mapContext } from "../context/mapContext";
import { useContext } from "react";
import { MdCancel } from "react-icons/md";
import { BsFillPinMapFill } from "react-icons/bs";
import Tooltip from "./Tooltip";

export default function Form({closeNewSimulForm}){
    const {
        simulations,setSimulations
    }= useContext(mapContext);

    const [formData, setFormData] = useState({
        longitude: '',
        latitude: '',
        simulationDuration: '',
        samplingDuration:'',
        name:'',
        speed: '',
        direction: '',
        distance: '',
        longitudeF: '',
        latitudeF: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

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
        setSimulations([...simulations,formData]);
        closeNewSimulForm();
        console.log(formData);
    }
    

    return (
        <div className="form-background">
            <div className="form-container" >
                <div className="form-header">
                    <div className="form-title">
                        <h3>New Simulation</h3>
                        <p>Fill the form with the simulation data then click start</p>
                    </div>
                    <div className="form-close">
                        <MdCancel onClick={closeNewSimulForm} className="form-close-icon"/>
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
                                <input className="input-field row" type="number" step="any" name="latitude" value={formData.latitude} onChange={handleInputChange} required />
                            </div>
                            <div className="input-group">
                                <label className="label">Longitude</label>
                                <input className="input-field row" type="number" step="any" name="longitude" value={formData.longitude} onChange={handleInputChange}  required />
                            </div>
                            <BsFillPinMapFill className="map-icon"/>
                        </div>
                    </div>

                    <div className="input-group">
                        <label className="label big">Final point coordinates</label>
                        <div className="input-row">                      
                            <div className="input-group">
                                <label className="label">Latitude</label>
                                <input className="input-field row" type="number" step="any" name="latitudeF" value={formData.latitudeF} onChange={handleInputChange} disabled={formData.direction} required />
                            </div>
                            <div className="input-group">
                                <label className="label">Longitude</label>
                                <input className="input-field row" type="number" step="any" name="longitudeF" value={formData.longitudeF} onChange={handleInputChange} disabled={formData.direction} required />
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
                            <input className="input-field row" type="number" step="any" name="direction" placeholder="Object direction with degrees" value={formData.direction} onChange={handleInputChange} disabled={formData.longitudeF || formData.latitudeF} required />
                        </div>
                        <div className="input-group">
                            <label className="label">Distance (km)</label>
                            <input className="input-field row" type="number" step="any" name="distance" placeholder="The distance that the object should" value={formData.distance} onChange={handleInputChange} disabled={formData.longitudeF || formData.latitudeF} required />
                        </div>
                    </div>

                    
                    <div className="btn-container">
                        <button className="btn-start" type="submit">Create new simulation</button>
                    </div>
                </form>
            </div>
        </div>
        
    );
}