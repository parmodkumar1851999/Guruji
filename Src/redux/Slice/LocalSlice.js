import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLocal: false,
  isLocalData: ''  
};

const IsLocalSlice = createSlice({
  name: 'isLocal',
  initialState,
  reducers: {
    setIsLocal: (state, action) => {
      state.isLocal = action.payload;
    },
  },
});

export const { setIsLocal } = IsLocalSlice.actions;

export default IsLocalSlice.reducer;