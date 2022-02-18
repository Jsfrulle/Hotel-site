import React, { useState } from "react";
import "./Reservation.css";
import { useSelector, useDispatch } from "react-redux";
import reservationList, {
  SearchReservations
} from "../reducers/reservationList";
import { ShowReservationComponent } from "components/ShowReservationComponent";
export const Reservations = () => {
  const [ids, setIds] = useState();
  let error = useSelector((store) => store.reservationList.error);
  let notShow = useSelector((store) => store.reservationList.notShow);
  const afterSearch = useSelector(
    (store) => store.reservationList.searchReservation
  );
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(reservationList.actions.setReservationId(ids));
    dispatch(SearchReservations());
  };

  const onClickBack = () => {
    setIds("");
    dispatch(reservationList.actions.setSearchReservation());
    dispatch(reservationList.actions.setError(false));
    dispatch(reservationList.actions.setNotShow(true));
  };


  return (
    <div className="div">
      {notShow ? (
        <section novalidate="novalidate">
          <section class="login-in">
            <main class="login-card">
              <div class="login-card__title">
                <label>Reservation id</label>
              </div>
              <label class="custom-input login-card__label">
                <input
                  id="ids"
                  maxLength={20}
                  type="text"
                  value={ids}
                  onChange={(e) => setIds(e.target.value)}
                  class="custom-input__input login-card__input"
                  autocomplete="off"
                  required="required"
                />

                <div class="custom-input__border"></div>
              </label>

              <button
                type="submit"
                class="login-card__button"
                onClick={ids ? onClick : ""}
              >
                {ids ? "Check" : ""}
              </button>

              {error ? `Oh no cant find reservation` : ``}
            </main>
          </section>
        </section>
      ) : (
        <article className="ReservationContainer">
          <ShowReservationComponent item={afterSearch} className="resCon" />

          <button className="reservationBt" onClick={onClickBack}>
            Back
          </button>
        </article>
      )}
    </div>
  );
};
