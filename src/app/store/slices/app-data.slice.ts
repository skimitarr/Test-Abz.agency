import { createSlice } from '@reduxjs/toolkit';
import { AppDataState } from '../types';

export const name = 'appData';

const userInitialState: AppDataState = {
  allUsers: {
    success: false,
    page: 0,
    total_pages: 0,
    total_users: 0,
    count: 0,
    links: { next_url: null, prev_url: null },
    users: [],
  },
  positions: {success: false, positions : []},
  newUser: {success : false,  user_id : 0,  message : ""},
};

export const appDataSlice = createSlice({
  name,
  initialState: userInitialState,
  reducers: {
    getAllUsers(state, action) {
      state.allUsers = action.payload;
    },
    getPositions(state, action) {
      state.positions = action.payload;
    },
    newUser(state, action) {
      state.newUser = action.payload;
    },
  },
});

export const { getAllUsers, getPositions, newUser } = appDataSlice.actions;
