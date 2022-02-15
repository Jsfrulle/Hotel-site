import "./Navbar.css";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import user from "../reducers/user";

export const Navbar = () => {
  const dispatch = useDispatch();

  const accessToken = useSelector((store) => store.user.accessToken);

  const onClick = (event) => {
    event.preventDefault();
    dispatch(user.actions.setAccessToken(null));
  };

  if (!accessToken) {
    return (
      <article className="navbarContainer">
        <Link to="/">
          <section className="logoContainer">
            <img src={logo} alt="logo" />
          </section>
        </Link>
        <ul>
          <li>
            <Link to="/inspiration" className="navLink">
              Inspiration
            </Link>
          </li>
          <li>
            <Link to="/reservations" className="navLink">
              Reservations
            </Link>
          </li>
          <li>
            <Link to="/signin" className="navLink">
              Log in
            </Link>
          </li>
        </ul>
      </article>
    );
  } else {
    return (
      <article className="navbarContainer">
        <Link to="/">
          <section className="logoContainer">
            <img src={logo} alt="logo" />
          </section>
        </Link>
        <ul>
          <li>
            <Link to="/inspiration" className="navLink">
              Inspiration
            </Link>
          </li>
          <li>
            <Link to="/reservations" className="navLink">
              Reservations
            </Link>
          </li>

          <li>
            <Link to="/Profil" className="navLink">
              Profil
            </Link>
          </li>

          <li>
            <Link to="/" className="navLink" onClick={onClick}>
              Log out
            </Link>
          </li>
        </ul>
      </article>
    );
  }
};
