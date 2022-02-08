import React, { useEffect, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FetchUser, UpdatehUser } from "reducers/user";
import { GetReservations, DeleteReservations } from "reducers/reservationList";
import user from "../../reducers/user";
import reservationList from "../../reducers/reservationList";
import "./Profil.css"
import moment from "moment";
import { FcRating } from "react-icons/fc";
import { ShowReservationComponent } from "components/ShowReservationComponent";
import { DeleteReservationComponent } from "components/DeleteReservationComponent";

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

  let today = moment().format("YYYY-MM-DD");

  return (
    <article className="userContainer">
      <section className="userContent">
        <h1 className="welcomTex">Welcome {names}! </h1>
        <section className="coinsContainer" > 
        <label><FcRating /> {coins} </label>

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
        </section>
<section className="userInfoContainer" > 
     

        <label> Name </label>
        <input
          id="name"
          type="text"
          
          minLength={3}
          value={changeName}
          onChange={(e) => setChangeName(e.target.value)}
          placeholder={names}
        />

        <label> Adress </label>
        <input
          id="adress"
          type="text"
          
          minLength={3}
          value={changeAdress}
          onChange={(e) => setChangeAdress(e.target.value)}
          placeholder={adress}
        />

        <label> Phone </label>
        <input
          id="phone"
          type="number"
          value={changePhone}
          onChange={(e) => setChangePhone(e.target.value)}
          placeholder={phone}
        />
    
      <button onClick={changeName && changeAdress && changePhone?  handelUpdate : ''}>{changeName && changeAdress && changePhone?  'Update user' : 'fill out info'}</button>
      </section>
      </section>
      <section className="reservatinContainer">
        
      <section className="reservationItems"> 
        <h1 className="textRes">Reservations</h1>
        <section className="reservatinContent"> 
      
        {reservation &&
          reservation.map((item) => {

if(item.checkIn >= today ){

            return (
            <DeleteReservationComponent item={item} onClickDelete={onClickDelete} />
            )}

          })}
          </section>
          </section>
          <section className="reservationItems">  
<h1 className="textRes">Old reservations</h1> 
<section className="reservatinContent"> 

{reservation &&
          reservation.map((item) => {

if(item.checkIn < today ){

            return (
              <ShowReservationComponent item={item } />
            )}

          })}
          </section>
          </section>
          
      </section>
    </article>
  );
};
