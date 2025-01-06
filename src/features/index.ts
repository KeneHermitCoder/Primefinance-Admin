import { combineReducers, } from "@reduxjs/toolkit";

// import authReducers from "./auth/authSlice";
import { auth, } from "./auth/authSlice";
import navigationReducer from "./navigation/navigationSlice";
import { loans } from "./loans/loansSlice";

const rootReducer = combineReducers({
  navigation: navigationReducer,
  // ...authReducers,
  auth,
  loans,
  // [authApi.reducerPath]: authApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
}