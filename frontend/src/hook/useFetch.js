
import React, { useState, useEffect } from "react";
import {  useDispatch} from "react-redux";


import { ui } from "reducers/ui";
const useFetch = (url, options) => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  


const dispatch = useDispatch();


  React.useEffect(() => {
    
    const fetchData = async () => {

      try {
        dispatch(ui.actions.setLoading(true));
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
        dispatch(ui.actions.setLoading(false));
        setError(null)
      } 
      
      catch (error) {
        setError(error);
        dispatch(ui.actions.setLoading(false));
      }
    };

    fetchData();
  
  }, [url]);

  return { response };
};

export default useFetch