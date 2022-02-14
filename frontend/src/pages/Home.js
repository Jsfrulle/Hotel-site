import "./Home.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pickdate } from "../components/Date";
import hotelLocation, { FetchHotelLocation } from "../reducers/hotelLocation";
import hotelDetails from "reducers/hotelDetails";
import { ui } from "reducers/ui";
import dotenv from "dotenv";
import stockholm from "images/stockholm.jpg";
import tokyo from "images/tokyo.jpg";
import paris from "images/paris.jpg";
import moment from "moment";
import video from "../images/video.mp4";
import background from "../images/background.jpg"

dotenv.config();

export const Home = () => {
  const [location, setLocation] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkIn = useSelector((store) => store.hotelDetails.dateFrom);
  const checkOut = useSelector((store) => store.hotelDetails.dateTo);

  let today = moment().format("YYYY-MM-DD");
  let future = moment().add(3, "days").format("YYYY-MM-DD");

  useEffect(() => {
    dispatch(hotelDetails.actions.setDateFrom(today));
    dispatch(hotelDetails.actions.setDateTo(future));
  }, [dispatch, today, future]);

  /* setting the place here for the useffect to have a good statment to render */
  const onClickNew = ({ target }) => {
    setLocation(target.value);
    dispatch(hotelLocation.actions.setPlace(location));
  };

  const getLocation = () => {
    if (location === "") {
      console.log("argument is missing");
    } else if (location) {
      dispatch(hotelLocation.actions.setPlace(location));
      dispatch(ui.actions.setLoading(true));
      dispatch(FetchHotelLocation());
      navigate("/hotels");
    }
  };

  return (
    <article>
      <section className="homeContainer">
      <img className="background" src={background} alt="background"/>
        <div class="video-container">
      
          <video controls autoPlay muted loop type="video/mp4">
            <source src={video} type="video/mp4" />
          </video>
        </div>
        <main class="login-card_Home">
          <label className="heroText">Where do you want to go?</label>

          <label class="custom-input_Home login-card__label_Home">
            <input
              class="custom-input__input_Home login-card__input_Home"
              autocomplete="off"
              id="location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              minLength={3}
              maxLength={30}
            />

            <div class="custom-input__border_Home"></div>
          </label>

          <Pickdate className="DateHome" />
          <button
            class="login-card__button_Home"
            onClick={checkIn >= today && checkOut > checkIn ? getLocation : ""}
          >
            {" "}
            {checkIn >= today && checkOut > checkIn
              ? "search"
              : "not valid date"}
          </button>
        </main>

        <section className="formContainerHome"></section>
        <section className="overlayContainer">
          <div className="overlay" />

          <section className="inspoText">
            <h1>Go Somewhere New</h1>
          </section>
          <section className="inspoBubbleContainer">
            <button
              className="inspoBubble"
              onClick={onClickNew}
              value={`Stockholm`}
            >
              <option className="textInspo">Stockholm</option>
              <img className="inspoBubbleImg" src={stockholm} alt="" />
            </button>{" "}
            <button
              className="inspoBubble"
              onClick={onClickNew}
              value={`Tokyo`}
            >
              <option className="textInspo">Tokyo</option>
              <img className="inspoBubbleImg" src={tokyo} alt="" />
            </button>{" "}
            <button
              className="inspoBubble"
              onClick={onClickNew}
              value={`Paris`}
            >
              <option className="textInspo">Paris</option>
              <img className="inspoBubbleImg" src={paris} alt="" />
            </button>
          </section>
        </section>
      </section>
    </article>
  );
};
