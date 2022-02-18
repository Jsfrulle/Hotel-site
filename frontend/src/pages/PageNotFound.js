import React from "react";
import Lottie from "react-lottie";
import animationData from "../lotties/404.json";
export const PageNotFound = () => {
  const defaultOptionsLoading = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className="notContainer">
      <div className="notContent">
        <Lottie
          options={defaultOptionsLoading}
          style={{ width: "50vh", height: "50vh", position: "absolute" }}
        />
      </div>
    </div>
  );
};
