import React from "react";
import "../pages/test.css";
import Slider from "react-perfect-slider";

import image1 from "../images/stockholm.jpg";

const Test = () => {
  return (
   
<div className="tests"> 
   
{/* 

<section className="roomsItemContent" key={item.name}>
          <section className="textContent">
            <h1 className="textinRoom"> {item.name} </h1>
            <section className="textsmall"> 
          
              <p>Max individuals:  {item.ratePlans[0].occupancy.maxAdults} </p>
           
            <p> Info: {item.ratePlans[0].features[0].info}  </p>
            <p>Price: {item.ratePlans[0].price.unformattedCurrent} $/person</p>
            </section>
            <p>
          {" "}
          {individualsCount === 0
            ? "individuals is missing"
            : ""}{" "}
        </p>
            
          </section>

          <div className="ImgSliderContainer">
            <Slider
              autoplay={false}
              renderControls={(next, previous) => [
                <div className="sliderBtn">
                  <button onClick={previous}>Previous</button>,
                  <button onClick={next}>Next</button>
                </div>
              ]}
            >
           {item.images.map((image) => {
        return <img className="roomImg" src={image.thumbnailUrl} alt="room"/>;
      })}
            </Slider>
            <div className="reservationBtnContainer"> 
            <button className="reservationBtn"    onClick={
        individualsCount === 0
          ? ""
          : () =>
              dispatch(
                hotelDetails.actions.setRoomName(item.name)
              )}> add </button>
            </div>
          </div>
          
        </section>


 */}
        </div>

    
  );
};

export default Test;
