import React from "react";

import { useSelector, useDispatch } from "react-redux";
import hotelDetails from "reducers/hotelDetails";
import Slider from "react-perfect-slider";
import "../pages/test.css";
const RoomItem = ({ room }) => {
  const individualsCount = useSelector((store) => store.roomDetail.individuals);

  const dispatch = useDispatch();

  return (
    <section className="roomsItemContainer">
      {room &&
        room.map((item) => {
          return (
            <div className="roomsItemContent" key={item.name}>
              <section className="textContent">
                <h1 className="textinRoom"> {item.name} </h1>
                <section className="textsmall">
                  <p>
                    Max individuals: {item.ratePlans[0].occupancy.maxAdults}{" "}
                  </p>

                  <p> Info: {item.ratePlans[0].features[0].info} </p>
                  <p>
                    Price: {item.ratePlans[0].price.unformattedCurrent} $/person
                  </p>
                </section>
              </section>

              <div className="ImgSliderContainer">
                <Slider
                  autoplay={false}
                  renderControls={(next, previous) => [
                    <div className="sliderBtn">
                      <button className="nextBtn" onClick={previous}>
                        {"<<"}
                      </button>
                      <button className="nextBtn" onClick={next}>
                        {">>"}
                      </button>
                    </div>
                  ]}
                >
                  {item.images.map((image) => {
                    return (
                      <img
                        className="roomImg"
                        src={image.thumbnailUrl}
                        alt="room"
                      />
                    );
                  })}
                </Slider>
                <div className="reservationBtnContainer">
                  <button
                    className="reservationBtn"
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
                    {individualsCount === 0
                      ? "individuals is missing"
                      : "Reservate"}{" "}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default RoomItem;
