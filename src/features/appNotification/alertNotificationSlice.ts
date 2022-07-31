import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  AppNotificationState,
  isPayloadActionContainAppNotification,
  PayloadAppNotification,
  ReducerAppNotification,
} from "./alertNotificationTypes";

const initialState: AppNotificationState = {
  notifications: [],
};

const pushNotification: ReducerAppNotification<PayloadAppNotification> = (
  { notifications },
  { payload }
) => ({ notifications: [...notifications, payload.appNotification] });

const removeNotificationByIndex: ReducerAppNotification<number> = (
  { notifications },
  { payload }
) => ({ notifications: notifications.filter((_, index) => index !== payload) });

const removeNotificationById: ReducerAppNotification<string> = (
  { notifications },
  { payload }
) => ({ notifications: notifications.filter(({ id }) => id !== payload) });

const notificationSlice = createSlice({
  name: "appNotification",
  initialState,
  reducers: {
    pushNotification,
    removeNotificationByIndex,
    removeNotificationById,
  },
  extraReducers: (builder) => {
    builder.addMatcher(isPayloadActionContainAppNotification, pushNotification);
  },
});

export const appNotificationSelector = {
  notifications: (state: RootState) => state.notification.notifications,
};
export const appNotificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
