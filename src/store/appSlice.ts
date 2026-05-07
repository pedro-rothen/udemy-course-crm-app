import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isInitialized: boolean;
  user: any | null;
}

const initialState: AppState = {
  isInitialized: false,
  user: null,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initialize: (state) => {
      state.isInitialized = true;
    },
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
});

export const { initialize, setUser } = appSlice.actions;
export default appSlice.reducer;
