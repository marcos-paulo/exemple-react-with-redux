import {
  isPayloadActionContainAppNotification,
  TypeAppNotificationEnum,
} from "./alertNotificationTypes";

describe("isPayloadActionContainAppNotification", () => {
  it("failure payload type string", () => {
    const callback = () =>
      isPayloadActionContainAppNotification({
        type: "type/type",
        payload: "string",
      });
    expect(callback()).toBe(false);
  });

  it("failure payload type number", () => {
    const callback = () =>
      isPayloadActionContainAppNotification({
        type: "type/type",
        payload: 1,
      });
    expect(callback()).toBe(false);
  });

  it("failure appNotification is not object", () => {
    const callback = () =>
      isPayloadActionContainAppNotification({
        type: "type/type",
        payload: { appNotification: "string" },
      });
    expect(callback).toThrow();
  });

  it("failure appNotification is not empty object", () => {
    const callback = () =>
      isPayloadActionContainAppNotification({
        type: "type/type",
        payload: { appNotification: {} },
      });
    expect(callback).toThrow();
  });

  it("failure appNotification invalid attributes one", () => {
    const callback = () =>
      isPayloadActionContainAppNotification({
        type: "type/type",
        payload: {
          appNotification: {
            type: "",
            message: 5,
            id: 1,
          },
        },
      });
    expect(callback).toThrow();
  });

  it("failure appNotification invalid attributes two", () => {
    const callback = () =>
      isPayloadActionContainAppNotification({
        type: "type/type",
        payload: {
          appNotification: {
            type: "",
            message: "",
            id: "",
          },
        },
      });
    expect(callback).toThrow();
  });

  it("successfully appNotification", () => {
    const callback = () =>
      isPayloadActionContainAppNotification({
        type: "type/type",
        payload: {
          appNotification: {
            type: TypeAppNotificationEnum.info,
            message: "mensagem",
            id: "idqualquer",
          },
        },
      });
    expect(callback()).toBe(true);
  });
});
