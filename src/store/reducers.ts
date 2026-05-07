import { combineReducers } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import customerReducer from '../features/components/Customer/reducers';

const rootReducer = combineReducers({
  app: appReducer,
  customer: customerReducer,
});

export default rootReducer;
