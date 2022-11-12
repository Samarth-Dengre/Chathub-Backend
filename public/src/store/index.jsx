import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./user-slice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
const presistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({ user: userSlice.reducer });

const persistedReducer = persistReducer(presistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [],
});

export default store;
