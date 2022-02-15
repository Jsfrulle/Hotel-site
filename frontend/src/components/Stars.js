import React from "react";
import star from "images/star.png";
import noStar from "images/star_empty.png";

const Stars = ({ item }) => {
  if (item.starRating >= 1 && item.starRating <= 1.9) {
    return (
      <div className="starContainer">
        <img className="star" src={star} alt="star" />
        <img className="star" src={noStar} alt="no star" />
        <img className="star" src={noStar} alt="no star" />
        <img className="star" src={noStar} alt="no star" />
        <img className="star" src={noStar} alt="no star" />
      </div>
    );
  } else if (item.starRating >= 2 && item.starRating <= 2.9) {
    return (
      <div className="starContainer">
        <img className="star" src={star} alt="star" />
        <img className="star" src={star} alt="star" />
        <img className="star" src={noStar} alt="no star" />
        <img className="star" src={noStar} alt="no star" />
        <img className="star" src={noStar} alt="no star" />
      </div>
    );
  } else if (item.starRating >= 3 && item.starRating <= 3.9) {
    return (
      <div className="starContainer">
        <img className="star" src={star} alt="star" />
        <img className="star" src={star} alt="star" />
        <img className="star" src={star} alt="star" />
        <img className="star" src={noStar} alt="no star" />
        <img className="star" src={noStar} alt="no star" />
      </div>
    );
  } else if (item.starRating >= 4 && item.starRating <= 4.9) {
    return (
      <div className="starContainer">
        <img className="star" src={star} alt="star" />
        <img className="star" src={star} alt="star" />
        <img className="star" src={star} alt="star" />
        <img className="star" src={star} alt="star" />
        <img className="star" src={noStar} alt="no star" />
      </div>
    );
  } else if (item.starRating >= 5) {
    return (
      <div className="starContainer">
        <img className="star" src={star} alt="star" />
        <img className="star" src={star} alt="star" />
        <img className="star" src={star} alt="star" />
        <img className="star" src={star} alt="star" />
        <img className="star" src={star} alt="star" />
      </div>
    );
  } else if (item.starRating <= 0.9) {
    return (
      <div className="starContainer">
        <img className="star" src={noStar} alt="no star" />
        <img className="star" src={noStar} alt="no star" />
        <img className="star" src={noStar} alt="no star" />
        <img className="star" src={noStar} alt="no star" />
        <img className="star" src={noStar} alt="no star" />
      </div>
    );
  }
};

export default Stars;
