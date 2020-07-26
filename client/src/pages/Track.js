import React, {useState, useEffect} from "react"
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
/*import { useQuery } from '@apollo/client'
import {FETCH_POSITION} from '../queries/trip.js'*/
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
export default function Track(){
  const [ currentPosition, setCurrentPosition ] = useState({});

 /* const dataPosition = useQuery(FETCH_POSITION,{
    variables: {
      _id,
      lat,
      lng,
      username,
    },
    pollInterval: 3000,
  }) */

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


  return (
    <>
    
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

     <VerticalTimeline>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
        date="2011 - present"
        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      >
        <h3 className="vertical-timeline-element-title">Creative Director</h3>
        <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
        <p>
          Creative Direction, User Experience, Visual Design, Project Management, Team Leading
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="2010 - 2011"
        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
      >
        <h3 className="vertical-timeline-element-title">Art Director</h3>
        <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
        <p>
          Creative Direction, User Experience, Visual Design, SEO, Online Marketing
        </p>
      </VerticalTimelineElement>
     </VerticalTimeline>
     </>
  )
}