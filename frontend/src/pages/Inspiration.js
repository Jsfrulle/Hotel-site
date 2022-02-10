import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import hotelDetails from "reducers/hotelDetails";
import insparationReducer, {
  FetchInsparation,
  FetchInspoCountry
} from "reducers/insparationReducer";
import moment from "moment";
import Loading from "components/Loading";
import "./Inspiration.css";
import dotenv from "dotenv";
import { HotelComponent } from "components/HotelComponent";

dotenv.config();

export const Inspiration = () => {
  const city = useSelector((store) => store.insparationReducer.city);
  const flag = useSelector((store) => store.insparationReducer.flag);

  const hotel = useSelector((store) => store.hotelDetails.hotelList);
  
  const isLoading = useSelector((store) => store.ui.loading);

  const dispatch = useDispatch();
  


  useEffect(() => {
    const array = ["BR", "TH", "MV"];
    const Country = array.sort(() => 0.5 - Math.random());
    
    dispatch(insparationReducer.actions.setInsoCountry(Country[0]));
    console.log("hello");

    if (Country[0] === "BR") {
      dispatch(insparationReducer.actions.setLocationInsparation(1693930));
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
  }, [dispatch]);



 
 


  return (
    <article className="inspoContainer">
       <section className="inspoHero">
        <img src={ flag } alt="flag" className="flagImg" />
        <h1
          className="inspoFlagHeader"
        >
          {city}{" "}
        </h1>
        <img src={ flag } alt="flag" className="flagImg" />
      </section>
      <section className="hotelInspoContainer">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="hotelInspoContent">
            {hotel &&
              hotel.map((item) => {
                

                return (
                 <HotelComponent item={item} />
                );
              })}
          </div>
        )}
      </section>

   

    </article>
  );
};
