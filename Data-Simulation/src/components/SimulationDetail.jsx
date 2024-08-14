import "../App.css"

export default function SimulationDetail({name, value, unit=""}){

    return(
        <div className="detail">
            <span className="bold">{name}:</span> {value + " " + unit}
        </div>      
    )
}