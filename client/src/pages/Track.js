import React, {useState, useEffect} from "react"
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export default function Track(){
  const [ currentPosition, setCurrentPosition ] = useState({});
  const success = position => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    setCurrentPosition(currentPosition);
  };

  const mapStyles = {        
    height: "50vh",
    width: "50%",
    marginTop: "30px",
  };
  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng})
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  })

  /*const locations = [
    {
      courier_name: "Bapak Ujang",
      location: { 
        lat: 41.3954,
        lng: 2.162 
      },
    },
    {
      courier_name: "Mas Abdul",
      location: { 
        lat: 41.3917,
        lng: 2.1649
      },
    },
    {
      courier_name: "Bang Anwar",
      location: { 
        lat: 41.3773,
        lng: 2.1585
      },
    }
  ];*/
  
  return (
     <LoadScript
       googleMapsApiKey='AIzaSyCyNsE0LjFJCgGeT4sJoQFsVZmrCXaw79o'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={currentPosition}>
          {
            currentPosition.lat ? 
            <Marker
            position={currentPosition}
            onDragEnd={(e) => onMarkerDragEnd(e)}
            draggable={true} /> :
            null
          }
        </GoogleMap>

     </LoadScript>
  )
}