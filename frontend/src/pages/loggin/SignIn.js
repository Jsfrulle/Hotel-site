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
  const [coins, setcoins] = useState(null);
  const [mode, setMode] = useState("signin");

  const accessToken = useSelector((store) => store.user.accessToken);
  const error = useSelector((store) => store.user.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(user.actions.setError(false));

  },[])

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
    fetch(API_URL(mode), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setUserId(data.response.id));
            dispatch(user.actions.setUsername(data.response.username));
            dispatch(user.actions.setName(data.response.name));
            dispatch(user.actions.setCoins(data.response.coins));
            dispatch(user.actions.setCoins(data.response.adress));
            dispatch(user.actions.setCoins(data.response.phone));
            dispatch(user.actions.setAccessToken(data.response.accessToken));
            dispatch(user.actions.setError(false));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setUserId(null));
            dispatch(user.actions.setUsername(null));
            dispatch(user.actions.setName(null))
            dispatch(user.actions.setCoins(null));;
            dispatch(user.actions.setAccessToken(null));
            dispatch(user.actions.setError(true));
          });
        }
      });
  };

  return (
    <article className="containerSignIn">
      <section className="contentSignIn"> 

      <h1> Please {mode === "signin" ? "sign in" : "create a user"} </h1>
        <form onSubmit={onFormSubmit}>
        
          <section className="inputContainer">
          

            <input
              id="username"
              type="email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email"
            />

            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
         
          <section className={mode === "signup" ? "visible" : "hidden"}> 
          <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Firstname"
            />
            </section>


            <section className="radioBtnContainer">
            <button
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

            </section>
         
          <section className="btnContainerSignIn">
            <button type="submit">Submit</button>
          </section>
        </form>

        <section className="errorContainer">
          {error && mode === "signup"
            ? `Password must be 5 characters or longer`
            : ``}
            {error && mode === "signin"
            ? `Password or username is not correct`
            : ``}
        </section>
        </section>
    </article>
  );
};
