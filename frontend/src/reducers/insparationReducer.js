import { createSlice } from "@reduxjs/toolkit";
import { ui } from "reducers/ui";
import dotenv from "dotenv";
import hotelDetails from "reducers/hotelDetails";
dotenv.config();

const insparationReducer = createSlice({
  name: "insparationReducer",
  initialState: {
    locationInsparation: "",
    insoCountry: "",
    city: "",
    flag: ""
  },

  reducers: {
    setLocationInsparation: (store, action) => {
      store.locationInsparation = action.payload;
    },

    setInsoCountry: (store, action) => {
      store.insoCountry = action.payload;
    },
    setCity: (store, action) => {
      store.city = action.payload;
    },
    setFlag: (store, action) => {
      store.flag = action.payload;
    }
  }
});

export default insparationReducer;

export const FetchInsparation = () => {
  return async (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true));

    if (getState().insparationReducer.locationInsparation === "") {
    } else if (getState().insparationReducer.locationInsparation) {
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
          getState().insparationReducer.locationInsparation
        }&pageNumber=1&pageSize=12&checkIn=${
          getState().hotelDetails.dateFrom
        }&checkOut=${
          getState().hotelDetails.dateTo
        }&adults1=1&sortOrder=STAR_RATING_HIGHEST_FIRST&locale=en_US&currency=USD`,
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

export const FetchInspoCountry = () => {
  return async (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true));

    if (getState().insparationReducer.insoCountry === "") {
    } else if (getState().insparationReducer.insoCountry) {
      dispatch(ui.actions.setLoading(true));
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-host": process.env.REACT_APP_HOST_COUNTRY,
          "x-rapidapi-key": process.env.REACT_APP_KEY_COUNTRY
        }
      };
      await fetch(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${
          getState().insparationReducer.insoCountry
        }`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          dispatch(insparationReducer.actions.setCity(response.data.name));
          dispatch(
            insparationReducer.actions.setFlag(response.data.flagImageUri)
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
};
