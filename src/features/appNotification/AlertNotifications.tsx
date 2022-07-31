import { useEffect, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import "./AlertNotifications.scss";
import { appNotificationSelector } from "./alertNotificationSlice";
import { AppNotification } from "./alertNotificationTypes";
import { Alert } from "./components/Alert";

interface NotificationState {
  id: string;
  appNotification: AppNotification | undefined;
}

export const AlertNotifications = () => {
  const [notificationsState, setNotificationsState] = useState<
    NotificationState[]
  >([]);
  const notifications = useAppSelector(appNotificationSelector.notifications);

  useEffect(() => {
    if (notifications.length !== 0) {
      const notContainsInNotificationState = (a: AppNotification) =>
        notificationsState.filter((e) => e.id === a.id).length === 0;

      const addedNotificationsState: NotificationState[] = [];
      notifications.forEach((notification) => {
        if (notContainsInNotificationState(notification)) {
          const notificationState: NotificationState = {
            id: notification.id,
            appNotification: notification,
          };
          addedNotificationsState.push(notificationState);
        }
      });

      const notContainsInNotifications = (a: NotificationState) =>
        notifications.filter((e) => e.id === a.id).length === 0;

      const temp = notificationsState.map((notificationState) => {
        if (notContainsInNotifications(notificationState)) {
          return {
            ...notificationState,
            appNotification: undefined,
          } as NotificationState;
        }
        return notificationState;
      });

      setNotificationsState([...temp, ...addedNotificationsState]);
    } else setNotificationsState([]);
  }, [notifications, notificationsState]);

  return (
    <>
      {notifications.length > 0 && (
        <div className="notification-container">
          {notificationsState
            .map(({ id, appNotification }) => (
              <div key={id}>
                {appNotification && <Alert appNotification={appNotification} />}
              </div>
            ))
            .reverse()}
        </div>
      )}
    </>
  );
};
