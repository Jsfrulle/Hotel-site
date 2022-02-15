import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import hotelDetails from "../reducers/hotelDetails";
import "./Date.css";

export const Pickdate = () => {
  const [dateOne, setDateOne] = useState();
  const [dateTwo, setDateTwo] = useState();
  const checkIn = useSelector((store) => store.hotelDetails.dateFrom);
  const checkOut = useSelector((store) => store.hotelDetails.dateTo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hotelDetails.actions.setDateFrom(checkIn));
    dispatch(hotelDetails.actions.setDateTo(checkOut));
    setDateOne(checkIn);
    setDateTwo(checkOut);
  }, [dateOne, dateTwo, checkIn, checkOut, dispatch]);

  return (
    <article className="containerDate">
      <section className="contentDate">
        <label>From</label>
        <input
          type="date"
          id="timeOne"
          value={dateOne}
          onChange={(e) =>
            dispatch(hotelDetails.actions.setDateFrom(e.target.value))
          }
          className="dateInput"
        />
      </section>
      <section className="contentDate">
        <label>To</label>
        <input
          type="date"
          id="dateTwo"
          value={dateTwo}
          onChange={(e) =>
            dispatch(hotelDetails.actions.setDateTo(e.target.value))
          }
          placeholder={dateTwo}
          className="dateInput"
        />
      </section>
    </article>
  );
};
