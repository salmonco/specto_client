import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  email: "",
  name: "",
  accessToken: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export default userSlice;
