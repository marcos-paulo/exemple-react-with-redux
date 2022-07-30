import { AnyAction, CaseReducer, PayloadAction } from "@reduxjs/toolkit";

export enum TypeAppNotificationEnum {
  info = "info",
  loading = "loading",
  success = "success",
  failure = "failure",
}

export interface AppNotification {
  id: string;
  type: TypeAppNotificationEnum;
  message: string;
  time?: number;
}

/** Types Utils */

export type TemplateNotification = (
  message?: string,
  time?: number
) => () => AppNotification;

export type GroupTemplatesNotification = Record<
  TypeAppNotificationEnum,
  TemplateNotification
>;

/**  Types for Redux*/

export interface AppNotificationState {
  notifications: AppNotification[];
}

export interface PayloadAppNotification {
  appNotification: AppNotification;
}

export type ReducerAppNotification<T> = CaseReducer<
  AppNotificationState,
  PayloadAction<T>
>;

/** Type Guards */

export function isPayloadActionContainAppNotification(
  action: AnyAction
): action is PayloadAction<PayloadAppNotification> {
  const appNotification = action.payload?.appNotification as AppNotification;
  let errors = "";
  if (appNotification) {
    if (typeof appNotification !== "object")
      errors += "invalid appNotification is not object\n";
    if (!TypeAppNotificationEnum[appNotification.type])
      errors += "invalid appNotification.type is not TypeAppNotificationEnum\n";
    if (typeof appNotification.message !== "string")
      errors += "invalid appNotification.message is not valid string\n";
    if (typeof appNotification.id !== "string")
      errors += "invalid appNotification.id is not valid string";
  } else {
    return false;
  }
  if (errors) throw new Error(errors);
  return !errors;
}
