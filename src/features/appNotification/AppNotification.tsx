import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./AppNotification.scss";
import {
  appNotificationActions,
  appNotificationSelector,
} from "./appNotificationSlice";
import { AppNotification as AppNotificationType } from "./appNotificationTypes";

interface Props {
  appNotification: AppNotificationType;
}
const FloatingNotification: React.FC<Props> = ({
  appNotification: { id, message, time },
}) => {
  const dispatch = useAppDispatch();
  var colors = [
    "red",
    "blue",
    "green",
    "teal",
    "rosybrown",
    "tan",
    "plum",
    "saddlebrown",
  ];

  useEffect(() => {
    if (time) {
      setTimeout(() => {
        dispatch(appNotificationActions.removeNotificationById(id));
      }, time);
    }
  }, [{ id, message, time }]);

  const removeNotification = () => {
    dispatch(appNotificationActions.removeNotificationById(id));
  };

  return (
    <div
      className="floating-notification"
      style={{
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      }}
    >
      <div className="floating-notification-body" key={id}>
        <p>{message}</p>
        <button onClick={(event) => removeNotification()}>x</button>
      </div>
      <div className="floating-notification-footer"></div>
    </div>
  );
};

export const AppNotification = () => {
  const notifications = useAppSelector(appNotificationSelector.notifications);
  return (
    <>
      {notifications.length > 0 && (
        <div className="notification-container">
          {notifications
            .map((notification, index) => (
              <FloatingNotification appNotification={notification} />
            ))
            .reverse()}
        </div>
      )}
    </>
  );
};
