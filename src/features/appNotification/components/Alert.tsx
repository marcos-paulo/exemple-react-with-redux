import { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { appNotificationActions } from "../alertNotificationSlice";
import { AppNotification } from "../alertNotificationTypes";

interface Props {
  appNotification: AppNotification;
}
export const Alert: React.FC<Props> = ({
  appNotification: { id, message, time },
}) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (time) {
      setTimeout(() => {
        dispatch(appNotificationActions.removeNotificationById(id));
      }, time);
    }
  }, [id, message, time, dispatch]);

  const removeNotification = () => {
    dispatch(appNotificationActions.removeNotificationById(id));
  };

  return (
    <div className="alert alert-primary">
      <div className="alert-body" key={id}>
        <p>{message + id}</p>
        <button className="close" onClick={(event) => removeNotification()} />
      </div>
      {!!time && (
        <div
          style={{ animationDuration: time + "ms" }}
          className="alert-progress-bar"
        ></div>
      )}
    </div>
  );
};
