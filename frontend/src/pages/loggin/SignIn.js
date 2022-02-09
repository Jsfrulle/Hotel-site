import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { API_URL } from "../../Urls/constants";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";
import user from "../../reducers/user";

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [mode, setMode] = useState("signin");

  const accessToken = useSelector((store) => store.user.accessToken);
  const error = useSelector((store) => store.user.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(user.actions.setError(false));
  }, [dispatch]);

  useEffect(() => {
    if (accessToken) {
      navigate("/profil");
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password, name })
    };
    fetch(API_URL(`${mode}`), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.id));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setName(data.response.name));
            dispatch(user.actions.setCoins(data.response.coins));
            dispatch(user.actions.setAdress(data.response.adress));
            dispatch(user.actions.setPhone(data.response.phone));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(false));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setName(null));
            dispatch(user.actions.setCoins(null));
            dispatch(user.actions.setPhone(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(true));
          });
        }
      });


      
  };

  return (
    <article className="containerSignIn">
      <form novalidate="novalidate" onSubmit={onFormSubmit}>
        <section class="login-in">
          <main class="login-card">
            <div class="login-card__title">
              {" "}
              {mode === "signin" ? "Welcome" : "Please create a user"}
            </div>
            <label class="custom-input login-card__label">
              <input
                class="custom-input__input login-card__input"
                autocomplete="off"
                required="required"
                type="email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Email"
              />
          
              <div class="custom-input__border"></div>
            </label>
            <label class="custom-input login-card__label">
              <input
                class="custom-input__input login-card__input"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required="required"
              />
              <div class="custom-input__border"></div>
            </label>

            <div className={mode === "signup" ? "visible" : "hidden"}>
              <label class="custom-input login-card__label">
                <input
                  class="custom-input__input login-card__input"
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Firstname"
                  autocomplete="off"
                  required="required"
                />
                <div class="custom-input__border"></div>
              </label>
            </div>

            <section className="radioBtnContainer">
              <button class="signup-card__button"
                id="signup"
                type="button"
                onClick={
                  mode === "signup"
                    ? () => setMode("signin")
                    : () => setMode("signup")
                }
              >
                {mode === "signup" ? "Sign in" : "Create a user"}
              </button>
            </section>

            <section className="errorContainer">
              {error && mode === "signup"
                ? `Password must be 5 characters or longer`
                : ``}
              {error && mode === "signin"
                ? `Password or username is not correct`
                : ``}
            </section>

            <button type="submit" class="login-card__button">
              {mode === "signup" ? "Sign up" : "sign in"}
            </button>
          </main>
        </section>
      </form>
    </article>
  );
};
