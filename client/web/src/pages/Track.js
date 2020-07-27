import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

/*import { useQuery } from '@apollo/client'
import {FETCH_POSITION} from '../queries/trip.js'*/

export default function Track() {
  const [currentPosition, setCurrentPosition] = useState({});

  const success = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
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
    setCurrentPosition({ lat, lng });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  });

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyCyNsE0LjFJCgGeT4sJoQFsVZmrCXaw79o">
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={currentPosition}
        >
          {currentPosition.lat ? (
            <Marker
              position={currentPosition}
              onDragEnd={(e) => onMarkerDragEnd(e)}
              draggable={true}
            />
          ) : null}
        </GoogleMap>
      </LoadScript>
    </>
  );
}
