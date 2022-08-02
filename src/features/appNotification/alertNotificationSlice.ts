import { createAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  AppNotificationState,
  isPayloadActionContainAppNotification,
  NoticeAlert,
  PayloadAppNotification,
  ReducerAppNotification,
} from "./alertNotificationTypes";

const initialState: AppNotificationState = {
  notices: [],
};

/** Removes only the first elements of the list where
 * notice.appNotification === undefined */
export const removeHeadUndefinedNotices: ReducerAppNotification<string> = (
  state
) => {
  while (state.notices[0].appNotification === undefined) state.notices.shift();
  return state;
};

const pushNotification: ReducerAppNotification<PayloadAppNotification> = (
  { notices },
  { payload: { appNotification } }
) => ({ notices: [...notices, { id: appNotification.id, appNotification }] });

const removeNotificationByIdReducer: ReducerAppNotification<string> = (
  { notices },
  { payload }
) => ({
  notices: notices.map((notice) =>
    notice.id === payload
      ? ({ ...notice, appNotification: undefined } as NoticeAlert)
      : notice
  ),
});

const removeNotificationById = createAction<string, "removeNotificationById">(
  "removeNotificationById"
);

const notificationSlice = createSlice({
  name: "appNotification",
  initialState,
  reducers: {
    pushNotification,
    [removeNotificationById.type]: removeNotificationByIdReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(removeNotificationById, removeHeadUndefinedNotices);
    builder.addMatcher(isPayloadActionContainAppNotification, pushNotification);
  },
});

export const appNotificationSelector = {
  notices: (state: RootState) => state.notification.notices,
};
export const appNotificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
