import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullname: "",
  username: "",
  email: "",
  phone: "",
  access_token: "",
  id: "",
  refreshToken: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      const {
        fullname = "",
        username = "",
        email = "",
        phone = "",
        access_token = "",
        _id = "",
        refreshToken = "",
      } = action.payload;
      state.fullname = fullname ? fullname : state.fullname;
      state.username = username ? username : state.username;
      state.email = email ? email : state.email;
      state.phone = phone ? phone : state.phone;
      state.id = _id ? _id : state.id;
      state.access_token = access_token ? access_token : state.access_token;
      state.refreshToken = refreshToken ? refreshToken : state.refreshToken;
    },
    resetUser: (state) => {
      state.fullname = "";
      state.username = "";
      state.email = "";
      state.phone = "";
      state.id = "";
      state.access_token = "";
      state.refreshToken = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
