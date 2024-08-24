import './App.css'
import Map from './components/Map.jsx'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import Form from './components/Form.jsx'
import {useEffect, useState,useContext} from 'react'
import { indicatorsContext } from './context/indicatorsContext.jsx'
import ErrorMsg from './components/ErrorMsg/ErrorMsg.jsx'
import SuccessMsg from './components/SuccessMsg/SuccessMsg.jsx'
import InfoMsg from './components/InfoMsg/InfoMsg.jsx'


function App() {
  const [visible, setVisible]= useState(true);
  const [openNewSimulForm, setOpenNewSimulForm]=useState(false)
  const [height, setHeight]=useState(50);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const {
    errorMsg,setErrorMsg,
    successMsg,setSuccessMsg,
    infoMsg,setInfoMsg
    }= useContext(indicatorsContext)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleVisibility=()=>setVisible(!visible);

  return (
    <div className="page-container">
      <Header/>
      <div className="container">
        
        {openNewSimulForm && 
        <div className= "new-simul-form-container">
          <Form closeNewSimulForm={()=>{setOpenNewSimulForm(false)}} />
        </div>
        }
        
        <div className={`${visible? "sidemenu-container visible" : "sidemenu-container"}`}
        style={{  transform: `${isMobile?`translateY(${100-height}%)`: ""}` }}
         >
          <Sidebar visible={visible} 
                   handleVisibility={handleVisibility}
                   openNewSimulForm={openNewSimulForm}
                   setOpenNewSimulForm={setOpenNewSimulForm}
                   height={height}  setHeight={setHeight}
          />  
        </div>

        <div className="map-container">
          <Map/>
        </div>
        {errorMsg && <ErrorMsg msg={errorMsg} closeError={()=>setErrorMsg(null)}/>}
        {successMsg && <SuccessMsg msg={successMsg} closeSuccess={()=>setSuccessMsg(null)}/>}
        {infoMsg && <InfoMsg msg={infoMsg} closeInfo={()=>setInfoMsg(null)}/>}
      </div>
    </div>
    
  )
}


export default App
