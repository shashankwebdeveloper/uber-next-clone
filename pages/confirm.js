import React, { useEffect, useState } from 'react'
import tw from 'tailwind-styled-components'
import Map from './components/Map';
import { useRouter } from 'next/router';
import RideSelector from './components/RideSelector';
import { carlist } from './data/carList';
import Link from 'next/link';
const Confirm = () => {
const router=useRouter();
const {pickup,dropoff}=router.query;
console.log(pickup,dropoff,"confirm");
    const [pickupCoordinates,setPickupCoordinates]=useState([0,0]);
    const [dropoffCoordinates,setDropoffCoordinates]=useState([0,0]);
    const getPickupCoordinates=(pickup)=>{
    
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
            new URLSearchParams({
                access_token:"pk.eyJ1Ijoic2hhc2hhbmtha3VsYSIsImEiOiJjbHg4a2FlamIwdjU2MmxzZ3p6cG55bTZvIn0.4p2kCDtkb35wDcLxAE24AA",
                limit:1
            })
            )
        .then(response=>response.json())
        .then(data=>{
            console.log(data.features[0].center,"coo");
            setPickupCoordinates(data.features[0].center)
        })
        
    }

    const getDropoffCoordinates=(dropoff)=>{
        

        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
            new URLSearchParams({
                access_token:"pk.eyJ1Ijoic2hhc2hhbmtha3VsYSIsImEiOiJjbHg4a2FlamIwdjU2MmxzZ3p6cG55bTZvIn0.4p2kCDtkb35wDcLxAE24AA",
                limit:1
            })
            )
        .then(response=>response.json())
        .then(data=>{
            console.log(data.features[0].center,"coo");
            setDropoffCoordinates(data.features[0].center);
        })
        
    }
    useEffect(()=>{
        getPickupCoordinates(pickup);
        getDropoffCoordinates(dropoff);
    },[pickup,dropoff])

  return (
    <Wrapper>
         <Link href='/search'>
        <BackButtonConfirm src="https://img.icons8.com/ios-filled/50/000000/left.png" />
      </Link>
   <Map  pickupCoordinates={pickupCoordinates} dropoffCoordinates={dropoffCoordinates} />
    <RideContainer>
    
    <RideSelectorContainer>
    <RideSelector pickupCoordinates={pickupCoordinates} dropoffCoordinates={dropoffCoordinates} />
    </RideSelectorContainer>

    <ConfirmButtonContainer>
       <ConfirmButton> Confirm UberX</ConfirmButton>
    </ConfirmButtonContainer>
    </RideContainer>
      
    </Wrapper>
  )
}

export default Confirm

const ConfirmButton=tw.div`
bg-black text-white my-4 mx-4 py-4 text-center text-xl
`
const Wrapper=tw.div`
flex h-screen flex-col
`
const RideContainer=tw.div`
flex-1 flex flex-col h-1/2
`
const RideSelectorContainer=tw.div`
flex-1 overflow-y-scroll
`
const ConfirmButtonContainer=tw.div`
border-t-2

`

const BackButtonConfirm=tw.img`
w-10 h-10 absolute top-2 left-2 z-10 bg-white rounded-full shadow-md cursor-pointer
`