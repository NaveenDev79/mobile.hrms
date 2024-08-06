import {configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import attendenceReducer from './attendenceSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        attendence: attendenceReducer
    }
});