import { combineReducers, } from "@reduxjs/toolkit";

// import authReducers from "./auth/authSlice";
import { auth, } from "./auth/authSlice";
import navigationReducer from "./navigation/navigationSlice";

const rootReducer = combineReducers({
  navigation: navigationReducer,
  // ...authReducers,
  ...auth,
  // [authApi.reducerPath]: authApi.reducer,
});

export default rootReducer;

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
}