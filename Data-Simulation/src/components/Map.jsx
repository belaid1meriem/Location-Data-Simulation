import '../App.css'
import 'leaflet/dist/leaflet.css'
import {MapContainer,TileLayer,Marker,Popup,useMapEvents,Polyline, useMap} from "react-leaflet"
import config from '../config'
import { mapContext } from "../context/mapContext";
import { useEffect,useContext, useRef, useState } from 'react';
import L from 'leaflet'; // Import Leaflet to access the L object
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import * as turf from '@turf/turf'


function Map() {
  const markers= useRef(null);
  const route= useRef(null);
  const interval= useRef(null)
  
  const {
    simulations,setSimulations,
    map,setMap,
  }= useContext(mapContext);



  const mapInit= (options)=>{
    if (!map) return;
    map.locate(options);
  }

  useEffect(()=>{
    mapInit({setView: true});
  },[map]);

  const drawPath=(startPoint,finalPoint,speed)=>{

    if(!map){
      //Error handling
      return;
    }
    
    //Check if start and end points are provided
    if(startPoint.length === 0 || finalPoint.length === 0){
      console.log("No start or end point provided");
      console.log("start point: " + startPoint);
      return ;
    }
    
    if(startPoint.includes(NaN)|| finalPoint.includes(NaN)){
      console.log("No start or end point provided");
      console.log("start point: " + startPoint);
      return ;
    } 
    
    if(interval.current) clearInterval(interval.current);

    //Clearing previous polyline and markers if any
    if(markers.current) {
      markers.current.remove();
      map.removeControl(route.current);
    }
    
    //Creating the routing control and adding it to the map
    route.current=L.Routing.control({
      waypoints: [
        L.latLng(startPoint),
        L.latLng(finalPoint)
      ],
      lineOptions:{
        addWaypoints: false,
        styles: [{color: 'black', opacity: 0.15, weight: 9}, {color: 'white', opacity: 0.8, weight: 6}, {color: '#ef233c', opacity: 1, weight: 2}]
      },
      plan: new L.Routing.Plan([
        L.latLng(startPoint),
        L.latLng(finalPoint)
      ],{draggableWaypoints:false})

    }).addTo(map);
    route.current.hide();

    
    map.fitBounds([startPoint,finalPoint]);//zoom into the route
    
    //Handling route found event to animate the route
    route.current.on('routesfound',(e)=>{
      const route= e.routes[0];
      const coords = route.coordinates.slice(); //making a copy of the coordinates array
      markers.current = L.marker(coords[0]).addTo(map);// marker init

      //Simulating vehicle movement
      let time=0;
      const delay=1000/24; // standard number of frames per second used in computer animations "24fps"
      //transforming coords array to turf compatible form
      const turfCoords = turf.lineString(coords.map((coords)=>[coords.lng,coords.lat]));
      interval.current = setInterval(()=>{calculatePosition(speed,time,turfCoords);time+=delay/1000},delay)

    })

    function calculateDistance(speed,time){
      return ((speed/3.6)*time)/1000; // in km
    }

    function calculatePosition(speed,time,turfCoords){

      const distance= calculateDistance(speed,time);
      const newCoords = turf.along(turfCoords,distance);

      //updating the marker position
      markers.current.setLatLng(L.latLng(newCoords.geometry.coordinates[1],newCoords.geometry.coordinates[0]));

      //comparing newCoords with finalCoords coords[coords.length] to check the end of the simulation
      if(
        newCoords.geometry.coordinates[0]===turfCoords.geometry.coordinates[turfCoords.geometry.coordinates.length-1][0] 
        && newCoords.geometry.coordinates[0]===turfCoords.geometry.coordinates[turfCoords.geometry.coordinates.length-1][1] 
      )
      clearInterval(interval.current);      
    }
   
  }

  // useEffect(()=>{
  //   drawPath(startPoint, finalPoint,speed)
  // },[startPoint,finalPoint,speed])

 
  
  return (
    <MapContainer
      center={[25.679953991424775, 5.89845351553821]}
      zoom={13} 
      ref={setMap}
    >
    <TileLayer
      attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
      url={config.api}
    />
    
  </MapContainer>
  )
}


export default Map




