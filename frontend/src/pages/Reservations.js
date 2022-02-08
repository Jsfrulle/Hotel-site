import React, { useState, useEffect } from "react";
import "./Reservation.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch, batch } from "react-redux";
import reservations from "../reducers/hotelDetails";
import user from "reducers/user";
import reservationList, {
  SearchReservations
} from "../reducers/reservationList";
export const Reservations = () => {
  const [ids, setIds] = useState();
  let error = useSelector((store) => store.reservationList.error);
  let notShow = useSelector((store) => store.reservationList.notShow);
  const afterSearch  = useSelector((store) => store.reservationList.searchReservation);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClick = () => {
    dispatch(reservationList.actions.setReservationId(ids));
    dispatch(SearchReservations());
    
  };

  const onClickBack = () => {
    setIds("");
    dispatch(reservationList.actions.setSearchReservation());
    dispatch(reservationList.actions.setError(true))
    dispatch(reservationList.actions.setNotShow(true))
  };

  console.log( afterSearch, ids);

  return (
    <>
      {notShow ? (
        <article className="ReservationContainer">
          <div className="ReservationForm">
            <section className="BookingNrInputContainer">
              <label>Bokningsnummer</label>
              <input
                id="ids"
                maxLength={20}
                type="text"
                value={ids}
                onChange={(e) => setIds(e.target.value)}
              ></input>
            </section>

            <section className="ReservationBtnContainer">
              <button onClick={ids ? onClick : ""}>Submit</button>

              {error ? `Oh no cant find reservation` : ``}
            </section>
          </div>
        </article>
      ) : (
        <article className="ReservationContainer">
          
          <div>
            <p> {afterSearch.hotelName} </p>
            <p> {afterSearch.checkIn} </p>
            <p> {afterSearch.checkOut} </p>
            <p> {afterSearch.roomName} </p>
            <p> {afterSearch.individuals} </p>
            <p> {afterSearch.priceOfRoom} </p>
            <p>{afterSearch.totalPrice} </p>
            <p> {afterSearch.user} </p>
            <p> {afterSearch.reservationId} </p>
          </div> 
          <button onClick={onClickBack}>back</button>
        </article>
      )}
    </>
  );
};
