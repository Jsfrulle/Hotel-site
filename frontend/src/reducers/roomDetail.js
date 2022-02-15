import { createSlice } from "@reduxjs/toolkit";
import { ui } from "reducers/ui";
import hotelDetails from "reducers/hotelDetails";

import dotenv from "dotenv";
dotenv.config();
const roomDetail = createSlice({
  name: "roomDetail",
  initialState: {
    individuals: 0,
    roomType: "none",
    priceRange: null,
    roomList: [],
    roomDetails: []
  },

  reducers: {
    setIndividuals: (store, action) => {
      store.individuals = action.payload;
    },

    setRoomType: (store, action) => {
      store.roomType = action.payload;
    },

    setPriceRange: (store, action) => {
      store.priceRange = action.payload;
    },
    setRoomList: (store, action) => {
      store.roomList = action.payload;
    },
    setRoomDetails: (store, action) => {
      store.roomDetails = action.payload;
    }
  }
});

export default roomDetail;

export const FetchHotelRooms = () => {
  return async (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true));

    if (getState().hotelDetails.hotelId === "") {
    } else if (getState().hotelDetails.hotelId) {
      dispatch(ui.actions.setLoading(true));
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-host": process.env.REACT_APP_HOST,
          "x-rapidapi-key": process.env.REACT_APP_KEY
        }
      };

      await fetch(
        `https://hotels4.p.rapidapi.com/properties/get-details?id=${
          getState().hotelDetails.hotelId
        }&checkIn=${getState().hotelDetails.dateFrom}&checkOut=${
          getState().hotelDetails.dateTo
        }&adults1=1&currency=USD&locale=en_US`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          dispatch(ui.actions.setLoading(false));
          dispatch(
            roomDetail.actions.setRoomList(response.data.body.roomsAndRates)
          );

          dispatch(
            hotelDetails.actions.setHotelName(
              response.data.body.propertyDescription.name
            )
          );

          dispatch(
            roomDetail.actions.setRoomDetails(
              response.data.body.roomsAndRates.rooms
            )
          );
          console.log(response.data.body.propertyDescription.name);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log("not working rooms");
    }
  };
};
