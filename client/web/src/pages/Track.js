import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { FETCH_POSITION } from "../queries/trip";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
/*import { useQuery } from '@apollo/client'
// import {FETCH_POSITION} from '../queries/trip.js'*/

export default function Track() {
  const { userId } = useParams();
  const [currentPosition, setCurrentPosition] = useState({});
  const [address, setAddress] = useState("");
  const { loading, error, data } = useQuery(FETCH_POSITION, {
    variables: {
      userId,
    },
    pollInterval: 5000,
  });
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

  function addressName(lat, lng) {
    console.log(lat, lng);
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDUPeFL6NZ2vTIbI34a7og3FNrpGR3b0cs`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "<<<<<<<<<<<<data");
        // setAddress(data.results ? data.results[0].formatted_address : null);
        console.log(data.results[0].formatted_address);
      });
  }
  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng });
  };
  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(success);
    setCurrentPosition({
      lat: data ? data.getUser.lat : null,
      lng: data ? data.getUser.lng : null,
    });
  }, [data]);

  // useEffect(() => {
  //   console.log(currentPosition);
  //   addressName(currentPosition.lat, currentPosition.lng);
  // }, [currentPosition]);

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  return (
    <>
      {/* {JSON.stringify(data)} */}
      {JSON.stringify(address)}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={17}
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
      </div>
    </>
  );
}
