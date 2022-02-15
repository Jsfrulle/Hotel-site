import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FetchUser, UpdatehCoins, UpdatehUser } from "reducers/user";
import { GetReservations, DeleteReservations } from "reducers/reservationList";
import user from "../../reducers/user";
import reservationList from "../../reducers/reservationList";
import "./Profil.css";
import moment from "moment";
import { FcRating } from "react-icons/fc";
import { ShowReservationComponent } from "components/ShowReservationComponent";
import { DeleteReservationComponent } from "components/DeleteReservationComponent";

export const Profil = () => {
  const [changeName, setChangeName] = useState();
  const [changeCoins, setChangeCoins] = useState();
  const [changeAdress, setChangeAdress] = useState();
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  const names = useSelector((store) => store.user.name);
  const [coins , setCoins] = useSelector((store) => store.user.coins);
  const adress = useSelector((store) => store.user.adress);
  const [deleteIt, setDeleteIt] = useState(false);
  const list = useSelector((store) => store.reservationList.getReservation);
  const [reservation, setReservation] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    } else {
      setReservation(list);
      navigate("/profil");
    }
  }, [accessToken, navigate, list]);

  useEffect(() => {
    dispatch(FetchUser());
    dispatch(GetReservations());
  }, [dispatch]);

  useEffect(() => {
    if (deleteIt === true) {
      dispatch(GetReservations());
      dispatch(DeleteReservations());
      setReservation(list);
      setDeleteIt(false);
    }
  }, [deleteIt, dispatch, list]);

  const onClickDelete = ({ target }) => {
    dispatch(reservationList.actions.setDeleteId(target.value));
    setDeleteIt(true);
  };

  const handelUpdate = () => {
    dispatch(user.actions.setName(changeName));
    setChangeCoins("");
    dispatch(user.actions.setAdress(changeAdress));

    dispatch(UpdatehUser());
  };

  
 

  const handelUpdateCoins = () => {
    const newCoin = parseInt(changeCoins) + parseInt(coins)
    if(newCoin){
      setCoins(newCoin)
    dispatch(user.actions.setCoins(newCoin))
    dispatch(UpdatehCoins());}
  };

  let today = moment().format("YYYY-MM-DD");

  return (
    <article className="userContainer">
      <section className="userContent">
        <h1 className="welcomTex">Welcome {names}! </h1>
        <section className="coinsContainer">
          <label>
            <FcRating /> {coins}{" "}
          </label>

          <input
            id="coins"
            type="number"
            minLength={1}
            value={changeCoins}
            onChange={(e) => setChangeCoins(e.target.value)}
            className="userInput"
            autocomplete="off"
          />
          <button className="btnUser" onClick={handelUpdateCoins}>
            Add coins
          </button>
        </section>
        <section className="userInfoContainer">
          <label> Name </label>
          <input
            id="name"
            type="text"
            className="userInput"
            minLength={3}
            value={changeName}
            onChange={(e) => setChangeName(e.target.value)}
            placeholder={names}
            autocomplete="off"
          />

          <label> Adress </label>
          <input
            id="adress"
            type="text"
            className="userInput"
            minLength={3}
            value={changeAdress}
            onChange={(e) => setChangeAdress(e.target.value)}
            placeholder={adress}
            autocomplete="off"
          />

          <button
            className="btnUser"
            onClick={changeName && changeAdress ? handelUpdate : ""}
          >
            {changeName && changeAdress ? "Update user" : "fill out info"}
          </button>
        </section>
      </section>
      <section className="reservatinContainer">
        <section className="reservationItems">
          <h1 className="textRes">Reservations</h1>
          <section className="reservatinContent">
            {reservation &&
              reservation.map((item) => {
                if (item.checkIn >= today && item.user === username) {
                  return (
                    <DeleteReservationComponent
                      item={item}
                      onClickDelete={onClickDelete}
                    />
                  );
                } else {
                  return (
                    <>
                      {" "}
                      <></>{" "}
                    </>
                  );
                }
              })}
          </section>
        </section>
        <section className="reservationItems">
          <h1 className="textRes">Old reservations</h1>
          <section className="reservatinContent">
            {reservation &&
              reservation.map((item) => {
                if (item.checkIn < today && item.user === username) {
                  return <ShowReservationComponent item={item} />;
                } else {
                  return (
                    <>
                      {" "}
                      <></>{" "}
                    </>
                  );
                }
              })}
          </section>
        </section>
      </section>
    </article>
  );
};
