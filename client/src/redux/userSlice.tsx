import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    allUser: {
      pending: false,
      error: false,
      userInfo: [],
    },
    oneUser: {
      pending: false,
      error: false,
      userInfo: null,
    },
    deleteUser: {
      pending: false,
      error: false,
    },
    updateUser: {
      pending: false,
      error: false,
    },
    user: {
      currentUser: null,
      pending: false,
      error: false,
    },
  },
  reducers: {
    getUserStart: (state) => {
      state.oneUser.pending = true;
    },
    getUserSuccess: (state, action) => {
      state.oneUser.pending = false;
      state.oneUser.userInfo = action.payload;
      state.oneUser.error = false;
    },
    getUserError: (state) => {
      state.oneUser.pending = false;
      state.oneUser.error = true;
    },
    getAllUserStart: (state) => {
      state.allUser.pending = true;
    },
    getAllUserSuccess: (state, action) => {
      state.allUser.pending = false;
      state.allUser.userInfo = action.payload;
      state.allUser.error = false;
    },
    getAllUserError: (state) => {
      state.allUser.pending = false;
      state.allUser.error = true;
    },
    deleteUserStart: (state) => {
      state.deleteUser.pending = true;
    },
    deleteUserSuccess: (state) => {
      state.deleteUser.pending = false;
      state.deleteUser.error = false;
    },
    deleteUserFail: (state) => {
      state.deleteUser.pending = false;
      state.deleteUser.error = true;
    },
    updateUserStart: (state) => {
      state.updateUser.pending = true;
    },
    updateUserSuccess: (state) => {
      state.updateUser.pending = false;
      state.updateUser.error = false;
    },
    updateUserFail: (state) => {
      state.updateUser.pending = false;
      state.updateUser.error = true;
    },
    getUserInfoStart: (state) => {
      state.user.pending = true;
    },
    getUserInfoSuccess: (state,action) => {
      state.user.pending = false;
      state.user.error = false;
      state.user.currentUser = action.payload;
    },
    getUserInfoFail: (state) => {
      state.user.pending = false;
      state.user.error = true;
    },
  },
});

export const {
  getUserStart,
  getUserSuccess,
  getUserError,
  getAllUserStart,
  getAllUserSuccess,
  getAllUserError,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFail,
  updateUserStart,
  updateUserSuccess,
  updateUserFail,
  getUserInfoStart,
  getUserInfoSuccess,
  getUserInfoFail,
} = userSlice.actions;
export default userSlice.reducer;
