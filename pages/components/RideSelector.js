import React,{useEffect,useState} from 'react'
import tw from 'tailwind-styled-components'


const  carlist = [
  {
imgUrl: 'https://i.ibb.co/cyvcpfF/uberx.png',
service: 'UberX',
multiplier: 1,
},
{
imgUrl: 'https://i.ibb.co/YDYMKny/uberxl.png',
service: 'UberXL',
multiplier: 1.5,
},

{
imgUrl: 'https://i.ibb.co/Xx4G91m/uberblack.png',
service: 'Black',
multiplier: 2,
},

{
imgUrl: 'https://i.ibb.co/cyvcpfF/uberx.png',
service: 'Comfort',
multiplier: 1.2,
},

{
imgUrl: 'https://i.ibb.co/1nStPWT/uberblacksuv.png',
service: 'Black SUV',
multiplier: 2.8
}
];
const RideSelector = ({pickupCoordinates,dropoffCoordinates}) => {
    console.log(carlist);

    const [rideDuration,setRideDuration]=useState(0);
    
    useEffect(()=>{
      fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]},${pickupCoordinates[1]};${dropoffCoordinates[0]},${dropoffCoordinates[1]}?access_token=pk.eyJ1Ijoic2hhc2hhbmtha3VsYSIsImEiOiJjbHg4a2FlamIwdjU2MmxzZ3p6cG55bTZvIn0.4p2kCDtkb35wDcLxAE24AA`)
      .then(res=>res.json())
      .then(data=>{
        console.log(data,"data");
        setRideDuration(data.routes[0].duration)
      })
      .catch((error=>{
        console.log("cannot find cabs for this route")
      }))
    },[pickupCoordinates,dropoffCoordinates])
  return (
    <Wrapper>
      <Title>Choose a ride or swipe up for more</Title> 
      {/* <CarList>
        {carlist.map((car,index)=>{
            <Car key={index}>
<CarImage src={car.imgUrl} />
<CarDetails>
    <Service>{car.service}</Service>
    <Time>5 min away</Time>
</CarDetails>
<Price>$24.00</Price>
      </Car>
        })}
      
      </CarList> */}
  {carlist.map((car,index)=>{
    return(
      <CarList  key={index}>
        <Car>
      <CarImage src={car.imgUrl} />
      <CarDetails>
    <Service>{car.service}</Service>
    <Time>5min away</Time>
</CarDetails>
<Price>{'$' + (rideDuration * car.multiplier).toFixed(2)}</Price>
      </Car>
      </CarList>
    );
})}
    </Wrapper>
)}
  


export default RideSelector

const CarList=tw.div`
overflow-y-scroll
`

const CarDetails=tw.div`
flex-1 
`
const Service=tw.div`
font-medium
`

const Time=tw.div`
text-xs text-blue-500`

const Price=tw.div`
text-sm`

const CarImage=tw.img`
h-14 mr-4
`

const Car=tw.div`
flex p-4 items-center
`

const Title=tw.div`
text-gray-500 text-center text-xs py-2 border-b
`
const Wrapper=tw.div`
flex-1  overflow-y-scroll
`