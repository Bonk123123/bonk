import { configureStore } from "@reduxjs/toolkit";
import signInReducer from "./slices/signInSlice";

export const store = configureStore({
  reducer: {
    signIn: signInReducer,
  },
});
