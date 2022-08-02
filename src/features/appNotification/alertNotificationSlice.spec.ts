import { removeHeadUndefinedNotices } from "./alertNotificationSlice";
import {
  AppNotificationState,
  TypeAppNotificationEnum,
} from "./alertNotificationTypes";

const payload = (): void => {};
const action = { type: "", payload: "payload()" };
let state: AppNotificationState;
beforeEach(() => {
  state = {
    notices: [
      { id: "one notification undefined", appNotification: undefined },
      {
        id: "two notification ok",
        appNotification: {
          id: "two notification ok",
          message: "notification info",
          type: TypeAppNotificationEnum.info,
        },
      },
      { id: "tree notification undefined", appNotification: undefined },
      {
        id: "four notification ok",
        appNotification: {
          id: "four notification ok",
          message: "notification success",
          type: TypeAppNotificationEnum.success,
        },
      },
    ],
  };
});

describe("Clear Firsts Alert Notifications Undefined", () => {
  it("Two", () => {
    removeHeadUndefinedNotices(state, action);
    expect(state.notices.length).toBe(3);
    expect(state.notices[0].id).toBe("two notification ok");
    expect(state.notices[1].id).toBe("tree notification undefined");
  });
});
