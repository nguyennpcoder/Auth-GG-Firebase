import { configureStore } from '@reduxjs/toolkit';
import CounterReducer from './features/counter/counterReducer';
import RecallApiLoading from './features/apiSave/recallApiLoading';

export default configureStore({
  reducer: {
    counter: CounterReducer,
    apiSave: RecallApiLoading,
    // some reducer here...
  }
})