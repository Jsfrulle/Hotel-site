import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import hotelDetails from "reducers/hotelDetails";
import insparationReducer, {
  FetchInsparation,
  FetchInspoCountry
} from "reducers/insparationReducer";
import moment from "moment";
import Stars from "components/Stars";
import { useNavigate } from "react-router-dom";
import Loading from "components/Loading";
import reservationList from "reducers/reservationList";
import { FetchHotelRooms } from "reducers/roomDetail";
import "./Inspiration.css";
import dotenv from "dotenv";
import useFetch from "hook/useFetch";


import test from "../images/backgroundDay.jpg"
import { HotelComponent } from "components/HotelComponent";

dotenv.config();

export const Inspiration = () => {
  const city = useSelector((store) => store.insparationReducer.city);
  const flag = useSelector((store) => store.insparationReducer.flag);
  const [country, setcountry] = useState();
  const hotel = useSelector((store) => store.hotelDetails.hotelList);
  const rooms = useSelector((store) => store.roomDetail.roomList);
  const isLoading = useSelector((store) => store.ui.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
   const API_KEY_BACKGROUND = process.env.REACT_APP_BACKGROUND;
  const { response } = useFetch(
    `http://api.unsplash.com/search/photos/?per_page=30&query=${city}&client_id=${API_KEY_BACKGROUND}`,
    []
  );



  const [hello, sethello] = useState();


console.log(response)
  useEffect(() => {
    const array = ["US", "TH", "MV"];
    const Country = array.sort(() => 0.5 - Math.random());
    setcountry(Country[0]);
    dispatch(insparationReducer.actions.setInsoCountry(Country[0]));
    console.log("hello");

    if (Country[0] === "US") {
      dispatch(insparationReducer.actions.setLocationInsparation(1708651));
    } else if (Country[0] === "TH") {
      dispatch(insparationReducer.actions.setLocationInsparation(1313946));
    } else {
      dispatch(insparationReducer.actions.setLocationInsparation(10233105));
    }

    let today = moment().format("YYYY-MM-DD");
    let future = moment().add(3, "days").format("YYYY-MM-DD");
    dispatch(hotelDetails.actions.setDateFrom(today));
    dispatch(hotelDetails.actions.setDateTo(future));

    dispatch(FetchInsparation());
    dispatch(FetchInspoCountry());
  }, []);

  useEffect(() => {}, []);



  const ToRoomList = ({ target }) => {

    console.log(target.value)
    dispatch(hotelDetails.actions.setHotelId(target.value));
    dispatch(FetchHotelRooms());

    if (rooms.length === 0) {
    } else {
      navigate("/rooms");
    }
  };
 


  return (
    <article className="inspoContainer">
       <section className="inspoHero">
        <img src={ flag } alt="flag" className="flagImg" />
        <h1
          className={country === "MV" ? "inspoFlagHeaderMv" : "inspoFlagHeader"}
        >
          {city}{" "}
        </h1>
      </section>
      <section className="hotelInspoContainer">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="hotelInspoContent">


            {hotel &&
              hotel.map((item) => {
                
                

                return (
                
                 <HotelComponent item={item} ToRoomList={ToRoomList}  />


                )


              })}
          </div>
        )}
      </section>

   

    </article>
  );
};
