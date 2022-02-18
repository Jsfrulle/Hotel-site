import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdatehCoins } from "reducers/user";
import hotelDetails from "reducers/hotelDetails";
import { useNavigate } from "react-router-dom";
import user from "../reducers/user";
import "./ReservationCart.css";
import moment from "moment";
export const ReservationCart = () => {
  const checkIn = useSelector((store) => store.hotelDetails.dateFrom);
  const checkOut = useSelector((store) => store.hotelDetails.dateTo);
  const roomName = useSelector((store) => store.hotelDetails.roomName);
  const individual = useSelector((store) => store.hotelDetails.individuals);
  const roomss = useSelector((store) => store.roomDetail.roomList);
  const accessToken = useSelector((store) => store.user.accessToken);
  const roomDetail = roomss.rooms.filter((item) => item.name === roomName);
  const coins = useSelector((store) => store.user.coins);
  const totalp = useSelector((store) => store.hotelDetails.totalPrice);
  const price = parseInt(coins) - parseInt(totalp);
  const pri = roomDetail.map(
    (item) => item.ratePlans[0].price.unformattedCurrent
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();


  /* take out the total price for a reservation (first take out amount off days, then days * price/person(= "priceAndDays") 
  and last priceAndDays * individual(s)  ) */
  let a = moment(checkIn);
  let b = moment(checkOut);
  const day = b.diff(a, "days");
  const priceAndDays = day * pri[0];
  const total = priceAndDays * individual;

  const onClick = () => {
    dispatch(user.actions.setCoins(price));
    navigate("/reservation");
      dispatch(UpdatehCoins());
  };

  useEffect(() => {
    dispatch(hotelDetails.actions.setPriceOfRoom(pri[0]));
  }, [pri, dispatch]);

  return (
    <section className="cartContainer">
      <section>
        <h1 className="CartH1">{roomName} </h1>
        <section className="cartItems">
          <p className="cartP">
            {checkIn} - {checkOut}
          </p>
          <p className="cartP"> individual: {individual} </p>
          <p className="cartP"> price {pri[0]}$/person </p>
          <p
            className="cartP"
            onChange={dispatch(hotelDetails.actions.setTotalPrice(total))}
          >
            total
            <span className="sum">{total}$ </span>
          </p>
        </section>
      </section>

      <span className="actions">
        <button
          type="button"
          className="cartBtnDelete"
          onClick={() => dispatch(hotelDetails.actions.setRoomName(""))}
        >
          Delete
        </button>

        {parseInt(total) < parseInt(coins) ? (
          <button
            type="button"
            className="cartBtn"
            onClick={accessToken ? onClick : () => navigate("/signin")}
          >
            {" "}
            {accessToken ? "make reservation" : "login to reservat"}{" "}
          </button>
        ) : (
          <button
            type="button"
            className="cartBtn"
            onClick={
              accessToken
                ? () => navigate("/profil")
                : () => navigate("/signin")
            }
          >
            {" "}
            {accessToken ? "set in coins" : "login to reservat"}{" "}
          </button>
        )}
      </span>
    </section>
  );
};
