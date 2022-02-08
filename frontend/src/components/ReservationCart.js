import React, { useEffect, useState } from 'react';
import {  useDispatch, useSelector } from "react-redux";
import hotelDetails from "reducers/hotelDetails"
import roomDetail from 'reducers/roomDetail';
import { useNavigate } from "react-router-dom";
import "./ReservationCart.css"
export const ReservationCart = () => {

  const checkIn = useSelector((store) => store.hotelDetails.dateFrom);
  const checkOut = useSelector((store) => store.hotelDetails.dateTo);
  const roomName = useSelector((store) => store.hotelDetails.roomName);
  const individual = useSelector((store) => store.hotelDetails.individuals);
  const price = useSelector((store) => store.hotelDetails.priceOfRoom);
  const roomss = useSelector((store) => store.roomDetail.roomList);
  const accessToken = useSelector((store) => store.user.accessToken);
 const roomDetail = roomss.rooms.filter(item =>item.name === roomName);
  const pri = roomDetail.map(item => item.ratePlans[0].price.unformattedCurrent);
  const coins = useSelector((store) => store.user.coins);
  const total = (pri[0] * individual)
 
console.log(coins, total)


  const dispatch = useDispatch();
  const navigate = useNavigate();

useEffect(()=>{
 
  dispatch(hotelDetails.actions.setPriceOfRoom(pri[0]))

  
},[pri] )

const onClickReservation = () =>{

  dispatch(hotelDetails.actions.addreservations)

}

const onClickLogin = () =>{

  navigate("/signin");

}

const onClickRemove = () => {



}

return (
  
<section className='cartContainer'>
     <section> 
     <h1 className="CartH1">{roomName}  </h1>
     <section className="cartItems"> 
     <p className="cartP">{checkIn} - {checkOut}</p>
     <p className="cartP"> individual: {individual} </p>
     <p className="cartP"> price {pri[0]}$/person </p> 
     <p className="cartP" onChange={dispatch(hotelDetails.actions.setTotalPrice(pri[0] * individual))}>total <span className="sum">{pri[0] * individual}$/night </span></p>
     </section>
     </section> 
    

     <span className="actions">
     <button type="button" className="cartBtnDelete"  onClick={() =>
                      dispatch(
                        hotelDetails.actions.setRoomName(''))
                      }>Delete</button>
                      { parseInt(total) < parseInt(coins)  ?  
                      
                      <button type="button" className="cartBtn" onClick={accessToken ? () => navigate("/reservation") : 
                      () =>  navigate("/signin")}> {accessToken?  'make reservation' : 'login to reservat'}  </button>
                    :
                    <button type="button" className="cartBtn" onClick={accessToken ? () => navigate("/profil") : 
                    () =>  navigate("/signin")}> {accessToken?  'set in coins' : 'login to reservat'}  </button>
                    
                    
                    }
      
     </span>
   </section>



    
)


};
