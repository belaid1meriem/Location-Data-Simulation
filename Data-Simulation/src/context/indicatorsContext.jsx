import { createContext,useState } from "react";

export const indicatorsContext= createContext(null);

const IndicatorsContextProvider=({children})=>{
    const [errorMsg,setErrorMsg]=useState(null);
    const [successMsg,setSuccessMsg]=useState(null);
    const [infoMsg,setInfoMsg]=useState(null);




    return(
        <indicatorsContext.Provider value={{
            errorMsg,setErrorMsg,
            successMsg,setSuccessMsg,
            infoMsg,setInfoMsg
            }}>
            {children}
        </indicatorsContext.Provider>
    )
}

export default IndicatorsContextProvider;