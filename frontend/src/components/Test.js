import React from "react";
import "../pages/test.css";
import Slider from 'react-perfect-slider';




import image1 from "../images/stockholm.jpg"




const Test = () => {
  
  



  




  return (
    
    <section className="RoomItemsList">
   
          <section className="roomsItemContainer" >
            <section className="roomsItemContent">
              <section className="textContent">
                <h1 className="textinRoom"> NAMN </h1>
                <div className="textAdultChildContainer">
                  <p>
                    Max individuals:{" "}
                   4
                  </p>
                </div>
                <p> Info 138 </p>
                <p>
                  {" "}
                  Price: 333
                  $/person{" "}
                </p>
                <p>
                 Fel meddelande
                </p>
              </section>
           

             
        
             

<div className="ImgSliderContainer"> 

             <Slider autoplay={false} renderControls={(next, previous) => [
               <div className="sliderBtn"> 
    <button onClick={previous}>Previous</button>,
    <button onClick={next}>Next</button>
    </div>
]}>
        <img className="roomImg"  src={image1} alt="room"/>
             <img className="roomImg" src={image1} alt="room"/>
</Slider>
<button
            
            >
              {" "}
              add{" "}
            </button>
</div>

            </section>
            <section className="addBtn">
            
            </section>

          </section>




          
       
 </section>

)
  
};

export default Test;
