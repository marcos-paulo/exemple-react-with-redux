import { useAppSelector } from "../../app/hooks";
import "./AlertNotifications.scss";
import { appNotificationSelector } from "./alertNotificationSlice";
import { AlertComponent } from "./components/Alert";

export const AlertNotifications = () => {
  const notices = useAppSelector(appNotificationSelector.notices);

  return (
    <>
      {notices.length > 0 && (
        <div className="notification-container">
          {notices
            .map(({ id, appNotification }) => (
              <div key={id} onContextMenu={(e) => e.preventDefault()}>
                {appNotification && (
                  <AlertComponent appNotification={appNotification} />
                )}
              </div>
            ))
            .reverse()}
        </div>
      )}
    </>
  );
};
