import "../App.css"

export default function SimulationForm({name,
    speed,
    startPoint,
    finalPoint,
    samplingDuration,
    simulationDuration,
    direction}){
        const handleInputChange = (event) => {
            const target = event.target;
            const value = target.value;
            const name = target.name;}

    return(
        <div className="form-container" >
            <div className="form-header">
                <h3>Simulation: {name}</h3>
                <p>simulation details, with possibility to realtime updates</p>
            </div>
            
            <form>
                <div className="input-group">
                    <label className="label">Simulation name </label>
                    <input className="input-field col" type="text" name="name" placeholder="Simulation name" value={name} onChange={handleInputChange} />
                </div>
                <div className="input-row">
                    <div className="input-group">
                        <label className="label">Simulation duration (minutes)</label>
                        <input className="input-field row" type="number" name="simulationDuration" placeholder="Duration with minutes,ex: 2" value={simulationDuration} onChange={handleInputChange} />
                    </div>

                    <div className="input-group">
                        <label className="label">Sampling duration (minutes)</label>
                        <input className="input-field row" type="number" name="samplingDuration" placeholder="Time stamps to collect the data" value={samplingDuration} onChange={handleInputChange} />
                    </div>
                </div>
                <div className="input-group">
                    <label className="label big">Start point coordinates</label>
                    <div className="input-row">
                        <div className="input-group">
                            <label className="label">Latitude</label>
                            <input className="input-field row" type="number" name="latitude" value={startPoint[0]} onChange={handleInputChange} />
                        </div>
                        <div className="input-group">
                            <label className="label">Longitude</label>
                            <input className="input-field row" type="number" name="longitude" value={startPoint[1]} onChange={handleInputChange} />
                        </div>
                        <BsFillPinMapFill className="map-icon"/>
                    </div>
                </div>

                <div className="input-group">
                    <label className="label big">Final point coordinates</label>
                    <div className="input-row">                      
                        <div className="input-group">
                            <label className="label">Latitude</label>
                            <input className="input-field row" type="number" name="latitudeF" value={finalPoint[0]} onChange={handleInputChange} disabled={direction} />
                        </div>
                        <div className="input-group">
                            <label className="label">Longitude</label>
                            <input className="input-field row" type="number" name="longitudeF" value={finalPoint[1]} onChange={handleInputChange} disabled={direction} />
                        </div>
                        
                        <Tooltip text="select position in the map">
                            <BsFillPinMapFill className="map-icon" />
                        </Tooltip>
                    </div>
                </div>

                <div className="input-group">
                    <label className="label">Speed (km/h)</label>
                    <input className="input-field col" type="number" name="speed" placeholder="Object speed measured with km/h" value={speed} onChange={handleInputChange} />
                </div>

                <div className="input-group">
                    <label className="label">Direction (Degrees °)</label>
                    <input className="input-field col" type="number" name="direction" placeholder="Object direction with degrees" value={direction} onChange={handleInputChange} disabled={finalPoint} />
                </div>

                
                <div className="btn-container">
                    <button className="btn-start" type="submit">Start</button>
                </div>
            </form>
        </div>
        
    )
}