import React from "react";
import Stars from "components/Stars";
import "./HotelComponent.css";
import { FetchHotelRooms } from "reducers/roomDetail";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import hotelDetails from "reducers/hotelDetails";
import dotenv from "dotenv";
dotenv.config();

export const HotelComponent = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rooms = useSelector((store) => store.roomDetail.roomList);
  
  const ToRoomList = ({ target }) => {
    dispatch(hotelDetails.actions.setHotelId(item.id));
    dispatch(FetchHotelRooms());

    if (rooms.length === 0) {
    } else {
      navigate("/rooms");
    }
  };

  return (
    <section
      onClick={ToRoomList}
      value={item.id}
      className="hotelItemContainer"
      key={item.id}
    >
      <img
        className="hotelItemImg"
        src={item.optimizedThumbUrls.srpDesktop}
        alt="hotel"
      />
      <div className="hotelItemContent">
        <div className="price">
          {" "}
          <p className="priceP">{item.ratePlan.price.current} /person</p>{" "}
        </div>
        <div className="textAndStars">
          <p className="hotelItemName"> {item.name} </p>
          <p className="hotelItemStars">{<Stars item={item} />} </p>
        </div>
      </div>
    </section>
  );
};
