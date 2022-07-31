import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  groupTemplateNotification,
  prepareNotification,
} from "../appNotification/alertNotificationUtils";

const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    reset: {
      reducer: (state) => 0,
      prepare: prepareNotification(
        groupTemplateNotification.info("Resetting...", 4000)
      ),
    },
    increment: (state) => {
      return state + 1;
    },
    decrement: {
      reducer: (state) => state - 1,
      prepare: prepareNotification(
        groupTemplateNotification.info("Decrementing...")
      ),
    },
    addFive: {
      reducer: (state) => state + 5,
      prepare: prepareNotification(
        groupTemplateNotification.success(
          "Successfully on incrementing five..."
        )
      ),
    },
  },
});

export const counterSelector = (state: RootState) => state.counter;
export const counterActions = counterSlice.actions;
export default counterSlice.reducer;
