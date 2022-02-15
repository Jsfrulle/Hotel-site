import "./App.css";
import React from "react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import roomDetail from "./reducers/roomDetail";
import hotelDetails from "./reducers/hotelDetails";
import reservationList from "./reducers/reservationList";
import hotelLocation from "./reducers/hotelLocation";
import insparationReducer from "reducers/insparationReducer";
import user from "./reducers/user";
import { ui } from "./reducers/ui";
import { Main } from "Main";

const reducer = combineReducers({
  ui: ui.reducer,
  user: user.reducer,
  hotelDetails: hotelDetails.reducer,
  roomDetail: roomDetail.reducer,
  reservationList: reservationList.reducer,
  hotelLocation: hotelLocation.reducer,
  insparationReducer: insparationReducer.reducer
});

let preloadedState = {};
let preloadedStateTwo = {};
let preloadedStateThree = {};
let preloadedStateFour = {};

const store = configureStore({
  reducer,
  preloadedState,
  preloadedStateTwo,
  preloadedStateThree,
  preloadedStateFour
});

const preloadedStateJSON = localStorage.getItem("hotelList");
const preloadedStateTwoJSON = localStorage.getItem("roomList");
const preloadedStateThreeJSON = localStorage.getItem("room");
const preloadedStateFourJSON = localStorage.getItem("hotelLocation");

if (preloadedStateJSON) {
  preloadedState = JSON.parse(preloadedStateJSON);
}
if (preloadedStateTwoJSON) {
  preloadedState = JSON.parse(preloadedStateJSON);
}
if (preloadedStateThreeJSON) {
  preloadedState = JSON.parse(preloadedStateJSON);
}
if (preloadedStateFourJSON) {
  preloadedState = JSON.parse(preloadedStateJSON);
}

store.subscribe(() => {
  localStorage.setItem(
    "hotelList",
    JSON.stringify(store.getState().hotelDetails.hotelList)
  );
  localStorage.setItem(
    "roomList",
    JSON.stringify(store.getState().roomDetail.roomList)
  );
  localStorage.setItem(
    "room",
    JSON.stringify(store.getState().roomDetail.roomDetails)
  );
  localStorage.setItem(
    "hotelLocation",
    JSON.stringify(store.getState().hotelLocation.place)
  );
});

export const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

export default App;
