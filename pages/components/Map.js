import React from 'react'
import tw from "tailwind-styled-components"
import mapboxgl from 'mapbox-gl';
import mapboxglSupported from 'mapbox-gl-supported';

import { useEffect,useRef } from "react";


mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhc2hhbmtha3VsYSIsImEiOiJjbHg4a2FlamIwdjU2MmxzZ3p6cG55bTZvIn0.4p2kCDtkb35wDcLxAE24AA';

const Map = (props) => {
    const mapContainerRef = useRef(null);
    const messageRef = useRef(null);
    console.log(props.pickupCoordinates,"lat")
    useEffect(() => {
        if (!mapboxglSupported()) {
            // Display a message if WebGL is not supported
            if (messageRef.current) {
              messageRef.current.innerHTML = 'Your browser does not support WebGL. Please use a browser that supports WebGL.';
            }
            return;
          }
      
          // Ensure the container is empty
          if (mapContainerRef.current) {
            mapContainerRef.current.innerHTML = '';
          }
        // initialize map only once
       const map = new mapboxgl.Map({
         container: mapContainerRef.current,
         style: 'mapbox://styles/drakosi/ckvcwq3rwdw4314o3i2ho8tph',
         center: [-99.29011,39.39172],
         zoom: 3
       });

       if(props.pickupCoordinates && props.dropoffCoordinates){
       new mapboxgl.Marker()
       .setLngLat(props.pickupCoordinates) // Marker position [lng, lat]
       .addTo(map); // Add marker to the map
       
       new mapboxgl.Marker()
       .setLngLat(props.dropoffCoordinates) // Marker position [lng, lat]
       .addTo(map); 
     // Clean up on unmount
     map.fitBounds([
        props.pickupCoordinates, // [lng, lat] - southwestern corner of the bounds
        props.dropoffCoordinates // [lng, lat] - northeastern corner of the bounds
    ],{
        padding:60
    });

     return () => map.remove();


       }
},[props.pickupCoordinates,props.dropoffCoordinates]);




  return (
    <Wrapper ref={mapContainerRef} >
    </Wrapper>
  )
}

export default Map;


const Wrapper=tw.div`
flex-1 h-1/2
`
