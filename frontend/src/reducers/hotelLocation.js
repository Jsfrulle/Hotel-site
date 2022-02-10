import { createSlice } from "@reduxjs/toolkit";
import { ui } from "reducers/ui";
import dotenv from "dotenv";
import hotelDetails from "reducers/hotelDetails"
dotenv.config();

const hotelLocation = createSlice({
  name: "hotelLocation",
  initialState: {
    place: '',
  },

  reducers: {
   
    setPlace: (store, action) => {
      store.place = action.payload;
    },

  }
});

export default hotelLocation;

export const FetchHotelLocation = () => {
  return async (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true));
    if( getState().hotelLocation.place === ''){}
    else if( getState().hotelLocation.place){
      dispatch(ui.actions.setLoading(true));
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-host": process.env.REACT_APP_HOST,
        "x-rapidapi-key": process.env.REACT_APP_KEY
      }
    };


    const response = await fetch(
      `https://hotels4.p.rapidapi.com/locations/search?query=${
        getState().hotelLocation.place
      }&locale=en_US`,
      options
    );
    
    if (response.status === 200) {
      const res = await response.json();
    
      if (res) {
        return (
          dispatch(
            hotelDetails.actions.setLocationId(
              res.suggestions[0].entities[0].destinationId
            )
          ),
          dispatch(ui.actions.setLoading(false))
        );
      } else {
        dispatch(ui.actions.setLoading(false));
      }
    } else {
      console.log("argument is missing");
      dispatch(ui.actions.setLoading(false));
    }
  };}
};
