
import { configureStore } from '@reduxjs/toolkit';
import {
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";
import { setupListeners } from "@reduxjs/toolkit/query";
// import thunk from 'redux-thunk';
import rootReducer from './features'; // Your root reducer

const store = configureStore({
	reducer: rootReducer,
	// middleware: (getDefaultMiddleware) =>
	// 	getDefaultMiddleware({
	// 		serializableCheck: {
	// 		ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
	// 		},
	// 	})
	// 	.concat(thunk)
	// 	,
	devTools: true
});

export default store;
setupListeners(store.dispatch);