import React from "react";

import { useSelector, useDispatch } from "react-redux";
import hotelDetails from "reducers/hotelDetails";
import Slider from 'react-perfect-slider';
import "../pages/test.css"
const RoomItem = ({room}) => {
  
  const individualsCount = useSelector((store) => store.roomDetail.individuals);

  const dispatch = useDispatch();







  


  return (
    <section className="roomsItemContainer" >
   
    {room &&
      room.map((item) => {
       
  return (
    
   

<section className="roomsItemContent" key={item.name}>
          <section className="textContent">
            <h1 className="textinRoom"> {item.name} </h1>
            <section className="textsmall"> 
          
              <p>Max individuals:  {item.ratePlans[0].occupancy.maxAdults} </p>
           
            <p> Info: {item.ratePlans[0].features[0].info}  </p>
            <p>Price: {item.ratePlans[0].price.unformattedCurrent} $/person</p>
            </section>
           
            
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
              )}> {individualsCount === 0
                ? "individuals is missing"
                : "Reservate"} </button>
            </div>
          </div>
          
        </section>

          
         /*  <section className="roomsItemContainer" key={item.name}>
            <section className="roomsItemContent">
              <section className="textContent">
                <h1 className="textinRoom"> {item.name} </h1>
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
              <div className="ImgSliderContainer"> 

             <Slider autoplay={false} renderControls={(next, previous) => [
               <div className="sliderBtn"> 
    <button onClick={previous}>Previous</button>,
    <button onClick={next}>Next</button>
    </div>
]}> 

              {item.images.map((image) => {
                return <img className="roomImg" src={image.thumbnailUrl} alt="room"/>;
              })}

</Slider>



<button className="reservationBtn"
            
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


            </div>

            </section>
           
          </section> */
        );
      })}

 </section>
)
  
};

export default RoomItem;
