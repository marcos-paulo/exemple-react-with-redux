import {
  AppNotification,
  GroupTemplatesNotification,
  TypeAppNotificationEnum,
} from "./alertNotificationTypes";

export const prepareNotification = (appNotification: () => AppNotification) => {
  return (args?: any) => ({
    payload: {
      appNotification: appNotification(),
      ...args,
    },
  });
};

/** Each property returns a function that returns an AppNotification
 * whose id will be Date.now + message */
export const groupTemplateNotification: GroupTemplatesNotification = {
  info: (message, time) => () => ({
    id: Date.now().toString() + message,
    type: TypeAppNotificationEnum.info,
    message: message || "Information...",
    time,
  }),
  loading: (message, time) => () => ({
    id: Date.now().toString() + message,
    type: TypeAppNotificationEnum.loading,
    message: message || "Loading...",
    time,
  }),
  success: (message, time) => () => ({
    id: Date.now().toString() + message,
    type: TypeAppNotificationEnum.success,
    message: message || "Loaded Successfully",
    time: time || 2000,
  }),
  failure: (message, time) => () => ({
    id: Date.now().toString() + message,
    type: TypeAppNotificationEnum.failure,
    message: message || "Loading Failure",
    time: time || 2000,
  }),
};
