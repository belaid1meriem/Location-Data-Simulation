import './App.css'
import Map from './components/Map.jsx'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import Form from './components/Form.jsx'
import {useEffect, useState} from 'react'



function App() {
  const [visible, setVisible]= useState(true);
  const [openNewSimulForm, setOpenNewSimulForm]=useState(false)

  useEffect(() =>{console.log(openNewSimulForm)},[openNewSimulForm])

  const handleVisibility=()=>setVisible(!visible);
  return (
    <div className="page-container">
      <Header/>
      <div className="container">
      {/* {openNewSimulForm? "new-simul-form-container":  "new-simul-form-container none"  } */}
      {openNewSimulForm && 
      <div className= "new-simul-form-container">
        <Form closeNewSimulForm={()=>{setOpenNewSimulForm(false)}} />
      </div>
      }


        
        
        <div className={`${visible? "sidemenu-container visible" : "sidemenu-container"}`} >
          <Sidebar visible={visible} handleVisibility={handleVisibility}  openNewSimulForm={openNewSimulForm} setOpenNewSimulForm={setOpenNewSimulForm}/>  
        </div>

        <div className="map-container">
          <Map/>
        </div>
      </div>
    </div>
    
  )
}


export default App
