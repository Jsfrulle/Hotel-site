import React, { useState, } from "react";
import "./Reservation.css";
import { useSelector, useDispatch,  } from "react-redux";
import reservationList, {
  SearchReservations
} from "../reducers/reservationList";
import { ShowReservationComponent } from "components/ShowReservationComponent";
export const Reservations = () => {
  const [ids, setIds] = useState();
  let error = useSelector((store) => store.reservationList.error);
  let notShow = useSelector((store) => store.reservationList.notShow);
  const afterSearch  = useSelector((store) => store.reservationList.searchReservation);
  const dispatch = useDispatch();


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
          
      

          <ShowReservationComponent item={afterSearch} />
         <button onClick={onClickBack}>Back</button>
        </article>
      )}
    </>
  );
};
