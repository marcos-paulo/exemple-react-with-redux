import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import notificationReducers from "../features/appNotification/appNotificationSlice";
import counterReducers from "../features/counter/counterSlice";

const rootReducer = combineReducers({
  counter: counterReducers,
  notification: notificationReducers,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
