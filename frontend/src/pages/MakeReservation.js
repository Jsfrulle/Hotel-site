import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PostReservations, GetReservations } from "reducers/reservationList";
import  user from "../reducers/user";
import {  UpdatehUser } from "reducers/user";
import hotelDetails from "reducers/hotelDetails";

export const MakeReservation = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const reservation = useSelector((store) => store.reservationList.reservation);
  const coins = useSelector((store) => store.user.coins);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = useSelector((store) => store.hotelDetails.totalPrice);

console.log( parseInt(coins) - parseInt(total) )


  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    } else {
      
    }
  }, [accessToken]);

useEffect(() => {
  dispatch(user.actions.setCoins(  parseInt(coins) - parseInt(total) ))
  dispatch(hotelDetails.actions.setRoomName(""));
  dispatch(GetReservations());
  dispatch(PostReservations());
  dispatch(UpdatehUser()) 
},[])


  return (
    <div>
      hello page 3
      <section className="btnContainer">
        <div>
          <p> {reservation.reservationId} </p>
          <p> {reservation.hotelName} </p>
          <p> {reservation.checkIn} </p>
          <p> {reservation.checkOut} </p>
          <p> {reservation.roomName} </p>
          <p> {reservation.individuals} </p>
          <p> {reservation.priceOfRoom} </p>
          <p>{reservation.totalPrice} </p>
          <p> {reservation.user} </p>
        </div>
      </section>
    </div>
  );
};
