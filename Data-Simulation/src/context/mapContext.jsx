import { createContext,useState } from "react";

export const mapContext= createContext(null);

const MapContextProvider=({children})=>{
    const [simulations, setSimulations]=useState([]);
    const [map, setMap]=useState(null);



    return(
        <mapContext.Provider value={{
            simulations,setSimulations,
            map,setMap,
            }}>
            {children}
        </mapContext.Provider>
    )
}

export default MapContextProvider;