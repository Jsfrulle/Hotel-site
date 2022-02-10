import React from 'react';
import "./ShowReservationComponent.css"
export const ShowReservationComponent = ({item}) => {


  return( 

    <div  value={item._id} key={item._id}  className="reservarionContainer">
    <h2> {item.hotelName} </h2>
 <h3> {item.roomName} </h3>
 <div className="ReservationInfo"> 
 <p className="bold"> Check in </p>  <p className="bold">Check out </p>
 </div>
 <div className="ReservationInfo"> 
 <p> {item.checkIn}  </p>
 <p> {item.checkOut} </p>
 </div>
 <div className="ReservationInfo">
 <p><span className="bold">Individuals:</span> {item.individuals} </p>
 <p> <span className="bold">Price: </span>{item.priceOfRoom}/person </p>
 
 </div>
 <p> <span className="bold">Total price:</span>{item.totalPrice}/night </p>
 <p><span className="bold">User:</span> {item.user} </p>
 <p> <span className="bold">Reservationnumber: </span>{item.reservationId }</p>
     
   </div>
  
  )
};
