import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authToken: null,
    role: "",
  },
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },

    removeToken: (state, action) => {
      state.authToken = null;
      state.role = "";
    }
    
  },
});

export const { setAuthToken, setRole ,removeToken} = authSlice.actions;
export default authSlice.reducer;
