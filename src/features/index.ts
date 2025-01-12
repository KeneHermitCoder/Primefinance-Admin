import { combineReducers, } from "@reduxjs/toolkit";

// import authReducers from "./auth/authSlice";
import { auth, } from "./auth/authSlice";
import { loans } from "./loans/loansSlice";
import { bills } from "./bills/billsSlice";
import { users, } from "./users/usersSlice";
import { escrow } from "./escrow/escrowSlice";
import navigationReducer from "./navigation/navigationSlice";
import { transactions } from "./transactions/transactionsSlice";
import { notifications } from "./notifications/notificationsSlice";

const rootReducer = combineReducers({
  navigation: navigationReducer,
  // ...authReducers,
  auth,
  bills,
  loans,
  users,
  escrow,
  transactions,
  notifications,
  // [authApi.reducerPath]: authApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
}