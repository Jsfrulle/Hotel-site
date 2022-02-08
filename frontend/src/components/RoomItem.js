import React from "react";
import "../pages/HotelRooms.css";
import { useSelector, useDispatch } from "react-redux";
import hotelDetails from "reducers/hotelDetails";
const RoomItem = ({room}) => {
  
  const individualsCount = useSelector((store) => store.roomDetail.individuals);

  const dispatch = useDispatch();


  return (
    
    <section className="RoomItemsList">
    {room &&
      room.map((item) => {
        return (
          <section className="roomsItemContainer" key={item.name}>
            <section className="roomsItemContent">
              <section className="textContent">
                <p> {item.name} </p>
                <div className="textAdultChildContainer">
                  <p>
                    Max individuals:{" "}
                    {item.ratePlans[0].occupancy.maxAdults}{" "}
                  </p>
                </div>
                <p> Info {item.ratePlans[0].features[0].info} </p>
                <p>
                  {" "}
                  Price: {item.ratePlans[0].price.unformattedCurrent}
                  $/person{" "}
                </p>
                <p>
                  {" "}
                  {individualsCount === 0
                    ? "individuals is missing"
                    : ""}{" "}
                </p>
              </section>

              {item.images.map((image) => {
                return <img src={image.thumbnailUrl} alt="room image"/>;
              })}
            </section>
            <section className="addBtn">
            <button
            
              onClick={
                individualsCount === 0
                  ? ""
                  : () =>
                      dispatch(
                        hotelDetails.actions.setRoomName(item.name)
                      )
                      
              }
            >
              {" "}
              add{" "}
            </button>
            </section>
          </section>
        );
      })}
 </section>

)
  
};

export default RoomItem;
