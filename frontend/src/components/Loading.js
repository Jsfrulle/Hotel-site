import React from 'react'
import './Loading.css'
import Lottie from 'react-lottie'
 import  animationData from '../lotties/loading.json'
const Loading = () => {


  const defaultOptionsLoading = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };


  return (
    <div className="loadingContainer">
   

      <div className="loadingContent">
      <Lottie
              options={defaultOptionsLoading}
             
              style={{  width:'40vw', height:'40vw', position:"absolute",}}
              
            />
            
        
      </div>
    </div>
  );
};

export default Loading;
