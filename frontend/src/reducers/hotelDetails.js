import { createSlice } from "@reduxjs/toolkit";
import { ui } from "reducers/ui";
import dotenv from "dotenv";
import reservationList from "reducers/reservationList";
import { BASE } from "Urls/constants";
dotenv.config();


const hotelDetails = createSlice({
  name: "hotelDetails",
  initialState: {
   
    place: "",
    locationId: null,
    error: false,
    hotelList: [],
    hotelId: null,
    hotelName: "",
    dateFrom: null,
    dateTo: null,
    roomName:'',
    individuals: null,
    priceOfRoom: null,
    totalPrice: null,
    addreservations:null,
    dropDown: "BEST_SELLER",
  
  },

  reducers: {
    setDateFrom: (store, action) => {
      store.dateFrom = action.payload;
    },
    setDateTo: (store, action) => {
      store.dateTo = action.payload;
    },
    setPlace: (store, action) => {
      store.place = action.payload;
    },

    setLocationId: (store, action) => {
      store.locationId = action.payload;
    },

    setHotelList: (store, action) => {
      store.hotelList = action.payload;
    },

    setHotelId: (store, action) => {
      store.hotelId = action.payload;
    },

    
    setError: (store, action) => {
      store.error = action.payload;
    },
    setDropDown: (store, action) => {
      store.dropDown = action.payload;
    },
setHotelName: (store, action) => {
  store.hotelName = action.payload;
  },

  setRoomName:(store, action) => {
    store.roomName = action.payload;
    },
    setIndividuals: (store, action) => {
      store.individuals = action.payload;
      },
    setPriceOfRoom: (store, action) => {
      store.priceOfRoom = action.payload;
      },
    setTotalPrice: (store, action) => {
      store.totalPrice = action.payload;
      },
    setAddreservations:(store, action) => {
      store.addreservations = action.payload;
      }





} });

export default hotelDetails;




export const FetchHotelLocationId = () => {


  return async (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true));
   
    if (getState().hotelDetails.locationId === "") {
    } else if (getState().hotelDetails.locationId) {
      dispatch(ui.actions.setLoading(true));
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-host": process.env.REACT_APP_HOST,
          "x-rapidapi-key": process.env.REACT_APP_KEY
        }
      };
      await fetch(
        `https://hotels4.p.rapidapi.com/properties/list?destinationId=${
          getState().hotelDetails.locationId
        }&pageNumber=1&pageSize=25&checkIn=${
          getState().hotelDetails.dateFrom
        }&checkOut=${getState().hotelDetails.dateTo}&adults1=1&sortOrder=${
          getState().hotelDetails.dropDown
        }&locale=en_US&currency=USD`,
        options
      )
        .then((Response) => Response.json())
        .then((Response) => {
          dispatch(
            hotelDetails.actions.setHotelList(
              Response.data.body.searchResults.results
            )
          );
          dispatch(ui.actions.setLoading(false));
        })
        .catch((err) => {
          console.error(err);
          dispatch(ui.actions.setLoading(false));
        });
    } else {
      console.error("error");
    }
  };
};






export const PostReservations = () => {

  return async (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true));

console.log( getState().hotelDetails.roomName)


if( getState().hotelDetails.roomName === ''){ }

else{

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        roomName:  getState().hotelDetails.roomName
        })

    };

    await fetch('https://hotel-backend-1.herokuapp.com/reservation', options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(reservationList.actions.setReservation(data));
          console.log(data, 'funkar')
        } else {
          console.log('no data fetched')
        }
      });
  
} 


};
 }




