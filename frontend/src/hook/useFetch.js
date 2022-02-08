
import React from "react";
import {  useDispatch} from "react-redux";


import { ui } from "reducers/ui";
const useFetch = (url, options) => {
  const [response, setResponse] = React.useState(null);
 
  


const dispatch = useDispatch();


  React.useEffect(() => {
    
    const fetchData = async () => {

      try {
        dispatch(ui.actions.setLoading(true));
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
        dispatch(ui.actions.setLoading(false));
       
      } 
      
      catch (error) {
       
        dispatch(ui.actions.setLoading(false));
      }
    };

    fetchData();
  
  }, [url, dispatch, options]);

  return { response };
};

export default useFetch