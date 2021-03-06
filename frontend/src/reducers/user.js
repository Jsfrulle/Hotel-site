import { createSlice } from "@reduxjs/toolkit";

import { batch } from "react-redux";
import { ui } from "reducers/ui";
const user = createSlice({
  name: "user",
  initialState: {
    userId: null,
    username: null,
    name: null,
    accessToken: null,
    error: false,
    coins: 10,
    adress: null,
    phone: null
  },

  reducers: {
    setUserId: (store, action) => {
      store.userId = action.payload;
    },
    setUsername: (store, action) => {
      store.username = action.payload;
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    setName: (store, action) => {
      store.name = action.payload;
    },
    setCoins: (store, action) => {
      store.coins = action.payload;
    },
    setAdress: (store, action) => {
      store.adress = action.payload;
    },

    setPhone: (store, action) => {
      store.phone = action.payload;
    }
  }
});

export default user;

export const FetchUser = () => {
  return (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true));
    const options = {
      method: "GET",
      headers: {
        Authorization: getState().user.accessToken
      }
    };

    fetch(`https://hotel-backend-1.herokuapp.com/secrets`, options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(user.actions.setError(false));
        } else {
          dispatch(user.actions.setError(data.response));
          dispatch(ui.actions.setLoading(true));
        }
      });
  };
};

/* update user */

export const UpdatehUser = () => {
  return (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true));
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name: getState().user.name,
        adress: getState().user.adress
      })
    };

    fetch(
      `https://hotel-backend-1.herokuapp.com/update/${getState().user.userId}`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            
           
            dispatch(user.actions.setError(false));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setError(true));
          });
        }
      });
  };
};

export const UpdatehCoins = () => {
  return (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true));
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        coins: getState().user.coins
      })
    };

    fetch(
      `https://hotel-backend-1.herokuapp.com/coins/${getState().user.userId}`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
         
            console.log("OK", data.response);
            dispatch(user.actions.setError(false));
          });
        } else {
          batch(() => {
            dispatch(user.actions.setError(true));
          });
        }
      });
  };
};
