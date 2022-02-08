import React, { useEffect, useState } from "react";
import { ui } from "reducers/ui";
import { History } from "../components/History";
import { Weather } from "../components/Weather";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Hotels.css";
import hotelDetails, {FetchHotelLocationId} from "reducers/hotelDetails";
import dotenv from "dotenv";
import Loading from "components/Loading";
import Stars from "components/Stars";
import { FetchHotelRooms } from "reducers/roomDetail";
import { HotelComponent } from "components/HotelComponent";
dotenv.config();

export const Hotels = () => {
  const [dropDownSorter, setdropDownSorter] = useState();
  const place = useSelector((store) => store.hotelLocation.place.toUpperCase());
  const getLocationId = useSelector((store) => store.hotelDetails.locationId);
  const checkIn = useSelector((store) => store.hotelDetails.dateFrom);
  const checkOut = useSelector((store) => store.hotelDetails.dateTo);
  const hotel = useSelector((store) => store.hotelDetails.hotelList);
  const hotelIds = useSelector((store) => store.hotelDetails.hotelId);
  const isLoading = useSelector((store) => store.ui.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rooms = useSelector((store) => store.roomDetail.roomList);
  console.log(rooms)


  const onChange = ({ target }) => {
    setdropDownSorter(target.value);
    dispatch(hotelDetails.actions.setDropDown(target.value))
    
  };


  useEffect(() => {
   dispatch(FetchHotelLocationId())
  }, [dropDownSorter, getLocationId, checkIn, checkOut, dispatch]);



  
  const ToRoomList = ({ target }) => {
    dispatch(hotelDetails.actions.setHotelId(target.value));
    dispatch(FetchHotelRooms())
 
    if(rooms.length === 0){}else{
    navigate("/rooms");}
  };

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
        {isLoading ? (
          <Loading />
        ) : (
          <section className="hotelContainer">
            <div className="hotelContent">
              {hotel &&
                hotel.map((item) => {
                  const value = item.id;
                  
                  return (
                   <HotelComponent item={item} ToRoomList={ToRoomList} value={value} /> 
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
