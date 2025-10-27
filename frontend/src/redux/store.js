import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./userSlices";


export const store = configureStore({
  reducer: {
    userSliceName: authReducer,
   
  },
});