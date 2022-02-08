import { createSlice } from "@reduxjs/toolkit";
import { API_URL } from "Urls/constants";
import { useSelector, batch } from "react-redux";
import { ui } from "reducers/ui";
const user = createSlice({
  name: "user",
  initialState: {
    userId: null,
    username: null,
    name: null,
    accessToken: null,
    error: false,
    coins: 0,
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

    fetch(API_URL("secrets"), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(user.actions.setError(null));
        } else {
          dispatch(user.actions.setError(data.response));
          dispatch(ui.actions.setLoading(false));
        }
      });
  };
};

/* update user */

export const UpdatehUser = () => {
  return (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true));
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        name: getState().user.name,
        coins: getState().user.coins,
        adress: getState().user.adress,
        phone: getState().user.phone
      })
    };

    fetch(API_URL(`update/${getState().user.userId}`), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          batch(() => {
            dispatch(user.actions.setName(data.response.name));
            dispatch(user.actions.setCoins(data.response.coins));
            dispatch(user.actions.setAdress(data.response.adress));
            dispatch(user.actions.setPhone(data.response.phone));
            console.log("OK");
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
