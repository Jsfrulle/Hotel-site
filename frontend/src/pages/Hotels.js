import React, { useEffect, useState } from "react";
import { History } from "../components/History";
import { Weather } from "../components/Weather";
import { useSelector, useDispatch } from "react-redux";
import "./Hotels.css";
import hotelDetails, {FetchHotelLocationId} from "reducers/hotelDetails";
import dotenv from "dotenv";
import Loading from "components/Loading";



import { HotelComponent } from "components/HotelComponent";
dotenv.config();

export const Hotels = () => {
  const [dropDownSorter, setdropDownSorter] = useState();
  const place = useSelector((store) => store.hotelLocation.place.toUpperCase());
  const getLocationId = useSelector((store) => store.hotelDetails.locationId);
  const checkIn = useSelector((store) => store.hotelDetails.dateFrom);
  const checkOut = useSelector((store) => store.hotelDetails.dateTo);
  const hotel = useSelector((store) => store.hotelDetails.hotelList);
  const isLoading = useSelector((store) => store.ui.loading);
  const dispatch = useDispatch();
  

  const rooms = useSelector((store) => store.roomDetail.roomList);
 


  const onChange = ({ target }) => {
    setdropDownSorter(target.value);
    dispatch(hotelDetails.actions.setDropDown(target.value))
    
  };


  useEffect(() => {
   dispatch(FetchHotelLocationId())
  }, [dropDownSorter, getLocationId, checkIn, checkOut, dispatch]);





  return (

    

    <article className="pageTwoConatiner">




      <section className="topInfoContainer">
        {" "}
        <h1> {place} </h1>
      </section>

      <section className="historyAndWeather">
        <Weather />
      </section>
      <section className="dropDownContainer">
        <select className="dropDown_hotels" onChange={onChange}>
          <option value="BEST_SELLER">Best seller</option>
          <option value="PRICE">Lowest price</option>
          <option value="PRICE_HIGHEST_FIRST">Highest price</option>
          <option value="STAR_RATING_HIGHEST_FIRST">Highest star rating</option>
          <option value="STAR_RATING_LOWEST_FIRST"> Lowest star rating</option>
        </select>
      </section>
      <section className="RoomChooicePageTwo">
        {isLoading ? 
          
          
          <Loading />
       
         : (
          <section className="hotelContainer">
            
            <div className="hotelContent">
              {hotel &&
                hotel.map((item) => {
                  
                  
                  return (
                   <HotelComponent item={item}  /> 
                  );
                })}
            </div>
          </section>)}
      </section>
      <div className="historyContainer">
        <History />
      </div>
       
    </article>
    
  );
};
