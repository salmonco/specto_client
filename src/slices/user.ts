import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  accessToken: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.accessToken = action.payload.accessToken;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
  },
});

export default userSlice;
