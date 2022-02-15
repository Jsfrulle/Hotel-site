import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navbar } from "./components/Navbar";
import { HotelRooms } from "./pages/HotelRooms";
import { MakeReservation } from "./pages/MakeReservation";
import { Inspiration } from "./pages/Inspiration";
import { Reservations } from "./pages/Reservations";
import { Profil } from "./pages/loggin/Profil";
import { SignIn } from "./pages/loggin/SignIn";
import { ForgottPassword } from "./pages/loggin/ForgottPassword";
import { Home } from "pages/Home";
import { Hotels } from "pages/Hotels";
import { PageNotFound } from "pages/PageNotFound";
import { ReservationCart } from "components/ReservationCart";

export const Main = () => {
  const roomname = useSelector((store) => store.hotelDetails.roomName);
  return (
    <Router>
      <article className="appContainer">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/Inspiration" element={<Inspiration />}></Route>
          <Route exact path="/Reservations" element={<Reservations />}></Route>
          <Route exact path="/Profil" element={<Profil />}></Route>
          <Route exact path="/signin" element={<SignIn />}></Route>
          <Route exact path="/password" element={<ForgottPassword />}></Route>
          <Route exact path="/hotels" element={<Hotels />}></Route>
          <Route exact path="/rooms" element={<HotelRooms />}></Route>
          <Route
            exact
            path="/reservation"
            element={<MakeReservation />}
          ></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>

        {roomname === "" ? "" : <ReservationCart />}
      </article>
    </Router>
  );
};
