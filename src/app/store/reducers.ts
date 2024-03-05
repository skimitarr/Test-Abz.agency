import { combineReducers } from '@reduxjs/toolkit';
import { appDataSlice } from './slices/app-data.slice';

export const rootReducer = combineReducers({
        appData: appDataSlice.reducer,
    }
)
