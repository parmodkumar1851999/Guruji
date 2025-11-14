import { configureStore } from '@reduxjs/toolkit';
import reducer from './Reducers/auth';

export default configureStore({ 
    reducer: reducer,
})