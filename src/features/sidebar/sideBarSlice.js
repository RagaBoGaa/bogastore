import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideBarOn: false,
};

const sideBarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    showSideBar(state) {
      state.isSideBarOn = true;
    },
    hideSideBar(state) {
      state.isSideBarOn = false;
    },
  },
});

export const { showSideBar, hideSideBar } = sideBarSlice.actions;
export default sideBarSlice.reducer;

export const getSideBarStatus = (state) => state.sidebar.isSideBarOn;
