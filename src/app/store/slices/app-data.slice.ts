import { createSlice } from '@reduxjs/toolkit';
import { AppDataState } from '../types';

export const name = 'appData';

const userInitialState: AppDataState = {
  answer: {
    success: false,
    page: 0,
    total_pages: 0,
    total_users: 0,
    count: 0,
    links: { next_url: null, prev_url: null },
    users: [],
  },
  allUsers: [],
  positions: {success: false, positions : []},
  newUser: {success : false,  user_id : 0,  message : ""},
};

export const appDataSlice = createSlice({
  name,
  initialState: userInitialState,
  reducers: {
    getAPIAnswer(state, action) {
      state.answer = action.payload;
    },
    getAllUsers(state, action) {
      state.allUsers = [...state.allUsers, ...action.payload];
    },
    getPositions(state, action) {
      state.positions = action.payload;
    },
    newUser(state, action) {
      state.newUser = action.payload;
    },
  },
});

export const { getAPIAnswer, getAllUsers, getPositions, newUser } = appDataSlice.actions;
