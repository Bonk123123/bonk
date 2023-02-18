import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: null,
  surname: null,
  thname: null,
  position: null,
  address: null,
  phone_number: null,
  email: null,
  password: null,
};

export const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.thaname = action.payload.thaname;
      state.position = action.payload.position;
      state.address = action.payload.address;
      state.phone_number = action.payload.phone_number;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    exit: (state) => {
      state.id = null;
      state.name = null;
      state.surname = null;
      state.thaname = null;
      state.position = null;
      state.address = null;
      state.phone_number = null;
      state.email = null;
      state.password = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signIn, exit } = signInSlice.actions;

export default signInSlice.reducer;
