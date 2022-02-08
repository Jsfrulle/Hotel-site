import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FetchUser, UpdatehUser } from "reducers/user";
import { GetReservations, DeleteReservations } from "reducers/reservationList";
import user from "../../reducers/user";
import reservationList from "../../reducers/reservationList";
export const Profil = () => {
  const [changeName, setChangeName] = useState();
  const [changeCoins, setChangeCoins] = useState();
  const [changeAdress, setChangeAdress] = useState();
  const [changePhone, setChangePhone] = useState();
  
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  const names = useSelector((store) => store.user.name);
  const coins = useSelector((store) => store.user.coins);
  const adress = useSelector((store) => store.user.adress);
  const phone = useSelector((store) => store.user.phone);
  const [deleteIt, setDeleteIt] = useState(false);
  const list = useSelector((store) => store.reservationList.getReservation);
 /*  const listAfter = useSelector((store) => store.reservationList.listAfterDelete); */
  const [reservation, setReservation] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    } else {
      navigate("/profil");
      setReservation(list);
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    dispatch(FetchUser());
    dispatch(GetReservations());
    setReservation(list);
  }, []);

  useEffect(() => {
    
      dispatch(GetReservations());
      dispatch(DeleteReservations());
      setReservation(list);
      setDeleteIt(false)
    
  },[ deleteIt === true]);

  const onClickDelete = ({ target }) => {
    dispatch(reservationList.actions.setDeleteId(target.value));
    setDeleteIt(true)
  };

  const handelUpdate = () => {
    dispatch(user.actions.setName(changeName));
    setChangeCoins("");
    dispatch(user.actions.setAdress(changeAdress));
    dispatch(user.actions.setPhone(changePhone));

    dispatch(UpdatehUser());
  };

  return (
    <article className="mainContainer">
      <section className="mainContent">
        <h1>Welcome {names}! </h1>
        <p> {coins} </p>

        <input
          id="coins"
          type="number"
          required
          minLength={1}
          value={changeCoins}
          onChange={(e) => setChangeCoins(e.target.value)}
        />
        <button
          onClick={
            (handelUpdate,
            () =>
              setChangeCoins(
                dispatch(
                  user.actions.setCoins(parseInt(changeCoins) + parseInt(coins))
                )
              ))
          }
        >
          Add coins
        </button>

        <label> {username} </label>

        <label> Name </label>
        <input
          id="name"
          type="text"
          required
          minLength={3}
          value={changeName}
          onChange={(e) => setChangeName(e.target.value)}
          placeholder={names}
        />

        <label> Adress </label>
        <input
          id="adress"
          type="text"
          required
          minLength={3}
          value={changeAdress}
          onChange={(e) => setChangeAdress(e.target.value)}
          placeholder={adress}
        />

        <label> Phone </label>
        <input
          id="phone"
          type="number"
          required
          minLength={3}
          value={changePhone}
          onChange={(e) => setChangePhone(e.target.value)}
          placeholder={phone}
        />
      </section>
      <button onClick={handelUpdate}>Update user</button>

      <section>
        {reservation &&
          reservation.map((item) => {
            return (
              <div value={item._id} key={item._id}>
                <p> {item.coins} </p>
                <p> {item.hotelName} </p>
                <p> {item.checkIn} </p>
                <p> {item.checkOut} </p>
                <p> {item.roomName} </p>
                <p> {item.individuals} </p>
                <p> {item.priceOfRoom} </p>
                <p>{item.totalPrice} </p>
                <p> {item.reservationId} </p>
                <p> {item.user} </p>
                <button
                  onClick={onClickDelete}
                  value={item._id}
                >
                  {" "}
                  Delete{" "}
                </button>
              </div>
            );
          })}
      </section>
    </article>
  );
};
