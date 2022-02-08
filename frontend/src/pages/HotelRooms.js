import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./HotelRooms.css";
import hotelDetails from "reducers/hotelDetails";
import roomDetail from "reducers/roomDetail";
import { History } from "components/History";
import { ui } from "reducers/ui";
import Loading from "components/Loading";
import { Reservations } from "./Reservations";

import { ReservationCart } from "components/ReservationCart";
import RoomTypDropDown from "components/RoomTypDropDown";
import IndividualsDropDown from "components/IndividualsDropDown";

import RoomItem from "components/RoomItem";
export const HotelRooms = () => {
  const rooms = useSelector((store) => store.roomDetail.roomList);
  const roomDet = useSelector((store) => store.roomDetail.roomDetails);
  const isLoading = useSelector((store) => store.ui.loading);
  const [room, setRoom] = useState(rooms.rooms);
  const dispatch = useDispatch();
  const individualsCount = useSelector((store) => store.roomDetail.individuals);
  const roomTypes = useSelector((store) => store.roomDetail.roomType);
  const priceRange = useSelector((store) => store.roomDetail.priceRange);
  const [lowest, setLowest] = useState();
  const [highest, setHighest] = useState();
  const [result, setResult] = useState();
  const checkIn = useSelector((store) => store.hotelDetails.dateFrom);
  const checkOut = useSelector((store) => store.hotelDetails.dateTo);
  const [state, setState] = useState({
    price: 10000
  });

  useEffect(() => {
    dispatch(hotelDetails.actions.setIndividuals(individualsCount));
    if (priceRange) {
      if (roomTypes === "none") {
        const result = roomDet.filter(
          (item) =>
            item.ratePlans[0].price.unformattedCurrent <= priceRange.price &&
            item.ratePlans[0].occupancy.maxAdults >= individualsCount
        );
        return setRoom(result);
      } else {
        const result = roomDet.filter(
          (item) =>
            item.ratePlans[0].price.unformattedCurrent <= priceRange.price &&
            item.ratePlans[0].occupancy.maxAdults >= individualsCount &&
            item.name.toLowerCase().indexOf(roomTypes) > -1
        );
        return setRoom(result);
      }
    } else if (roomTypes === "none") {
      const result = roomDet.filter(
        (item) => item.ratePlans[0].occupancy.maxAdults >= individualsCount
      );
      return setRoom(result);
    } else {
      const result = roomDet.filter(
        (item) =>
          item.ratePlans[0].occupancy.maxAdults >= individualsCount &&
          item.name.toLowerCase().indexOf(roomTypes) > -1
      );
      return setRoom(result);
    }
  }, [priceRange, individualsCount, roomTypes]);

  const onChange = () => {
    /* drop-down to set the price range */
    setRoom(room.map((val, index, array) => array[array.length - 1 - index]));
  };

  useEffect(() => {
    setLowest(roomDet[0].ratePlans[0].price.unformattedCurrent);
    setHighest(roomDet.slice(-1)[0].ratePlans[0].price.unformattedCurrent);
    dispatch(roomDetail.actions.setPriceRange({ highest }));
    setState({
      price: roomDet.slice(-1)[0].ratePlans[0].price.unformattedCurrent
    });
  }, []);

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    dispatch(roomDetail.actions.setPriceRange(state));
  }, [state]);

  return (
    <article className="roomPageConatiner">
      {isLoading ? (
        <>
          {" "}
          <Loading />{" "}
        </>
      ) : (
        <section className="roomPageContent">
          <select className="dropDown_room" onChange={onChange}>
            <option>Lowest price</option>
            <option>Highest price</option>
          </select>

          <section className="FormInputs">
            <section className="FormDropDownContent">
              <label className="FormdropDownLabel">individuals</label>
              <IndividualsDropDown />
            </section>

            <section className="FormDropDownContent">
              <label className="FormdropDownLabel">Room type</label>
              <RoomTypDropDown />
            </section>

            <form className="FormDropDownContent">
              <label className="FormdropDownLabel">
                Price : ${state.price}
              </label>
              <div className="FormDiv">
                <label for="price">{lowest}</label>
                <input
                  type="range"
                  id="price"
                  name="price"
                  min={lowest}
                  max={highest}
                  value={state.price}
                  onChange={handleChange}
                />
                <label for="price">{highest}</label>
              </div>
            </form>
          </section>

          <section className="RoomItemsListContainer">
            <RoomItem room={room} />
          </section>

          <div className="historyContainerRooms">
            <History />
          </div>
        </section>
      )}
    </article>
  );
};
