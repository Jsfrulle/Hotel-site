import { createSlice } from "@reduxjs/toolkit";
import { ui } from "reducers/ui";
import hotelDetails from "./hotelDetails";
import user from "./user";
import {  batch } from "react-redux";


const reservationList = createSlice({
  name: "reservationList",
  initialState: {
    error: '',
    reservation: [],
    getReservation: [],
    listAfterDelete:[],
    searchReservation:[],
    ids: "",
    deleteId:"",
    reservationId:'',
    notShow:true,
  },

  reducers: {
    setReservation: (store, action) => {
      store.reservation = action.payload;
    },
    setGetReservation: (store, action) => {
      store.getReservation = action.payload;
    },
    setListAfterDelete: (store, action) => {
      store.listAfterDelete = action.payload;
    },

    setSearchReservation:(store, action) => {
      store.searchReservation = action.payload;
    },

    setIds: (store, action) => {
      store.ids = action.payload;
    },
    setDeleteId: (store, action) => {
      store.deleteId = action.payload;
    },
    setReservationId: (store, action) => {
      store.reservationId = action.payload;
    },

    setError: (store, action) => {
      store.error = action.payload;
    },
 setNotShow : (store, action) => {
  store.notShow = action.payload;
},


  }
});

export default reservationList;


/* POST A RESERVATION */


export const PostReservations = () => {
  return async (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true));

    const options = {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        hotelName: getState().hotelDetails.hotelName,
        checkIn: getState().hotelDetails.dateFrom,
        checkOut: getState().hotelDetails.dateTo,
        roomName: getState().hotelDetails.roomName,
        individuals: getState().roomDetail.individuals,
        priceOfRoom: getState().hotelDetails.priceOfRoom,
        totalPrice: getState().hotelDetails.totalPrice,
        user: getState().user.username
      })
    };

    await fetch("http://localhost:8080/reservation", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(hotelDetails.actions.setRoomName(""));
          dispatch(reservationList.actions.setReservation(data.response));
          console.log(data);
        } else {
          console.log("no");
        }
      });
  };
};




/* ALL RESERVATIONs DONE BY USER */

export const GetReservations = () => {
  return (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true));
    const options = {
      method: "GET",
      headers: {
        user: getState().user.username
      }
    };

    fetch(`http://localhost:8080/reservation`, options)
      .then((res) => res.json())
      .then((data) => {
       
          dispatch(reservationList.actions.setGetReservation(data.response));
         
      })
      .finally(() => dispatch(ui.actions.setLoading(false)));
  };
};

/* FIND A RESERVATION */

export const SearchReservations = () => {
  return (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true));

      const options = {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      
    };
    
    
    fetch(`http://localhost:8080/find/${getState().reservationList.reservationId}` , options)
      .then((res) => res.json())
      .then((data) =>{
        if (data.success) {
          batch(() => {
            
            dispatch(reservationList.actions.setSearchReservation(data.response));
            dispatch(reservationList.actions.setError(false))
            dispatch(reservationList.actions.setNotShow(false))
            console.log('work')}
            
           ) 
        } else {
          batch(() => {
            dispatch(reservationList.actions.setError(true))
            dispatch(reservationList.actions.setNotShow(true))
            dispatch(reservationList.actions.setSearchReservation([]));
            console.log('not')
          });
        } })
      .finally(() => dispatch(ui.actions.setLoading(false) ))
  
} }
    
  
/* DELETE A RESERVATION */

export const DeleteReservations = () => {
  return (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true));

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },

      
    };
    
    
    
    fetch(`http://localhost:8080/reservation/${getState().reservationList.deleteId}` , options)
      .then((res) => res.json())
      .then((data) =>{
        if (data.success) {
          batch(() => {
            
            console.log('work')
            dispatch(user.actions.setError(false));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setError(true));
            console.log('not')
          });
        } })
      .finally(() => dispatch(ui.actions.setLoading(false)))
  
} }

     