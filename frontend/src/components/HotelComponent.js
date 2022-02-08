import React from 'react';
import Stars from "components/Stars";
import "./HotelComponent.css"



export const HotelComponent = ({item, ToRoomList}) => {

  return(
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
    <div className="price"> <p className="priceP">
 
    {item.ratePlan.price.current}{" "}/person
  </p> </div>
<div className="textAndStars"> 
   <p className="hotelItemName"> {item.name} </p>
  <p className="hotelItemStars">{<Stars item={item} />} </p>
  </div>
  </div>
</section>
)

};
