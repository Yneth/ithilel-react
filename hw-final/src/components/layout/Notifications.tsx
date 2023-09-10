import { FC, useCallback } from "react";
import { Alert, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import {
  notificationActions,
  selectFirstNotification,
} from "../../store/notifications.slice";
import { useAppDispatch } from "../../store/root.store";

const DEFAULT_NOTIFICATION_AUTO_HIDE_MS: number = 3000;

const Notifications: FC = () => {
  const notification = useSelector(selectFirstNotification);

  const dispatch = useAppDispatch();

  const onClose = useCallback(() => {
    if (notification) {
      dispatch(notificationActions.hideNotification(notification.id));
    }
  }, [dispatch, notification]);

  return (
    <>
      {notification && (
        <Snackbar
          open={!!notification}
          autoHideDuration={
            notification.payload.autoHideAfterMillis ||
            DEFAULT_NOTIFICATION_AUTO_HIDE_MS
          }
          onClose={onClose}
        >
          <Alert severity={notification.payload.severity}>
            {notification.payload.message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default Notifications;
