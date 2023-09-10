import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertColor } from "@mui/material/Alert/Alert";
import type { RootState } from "./root.store";

type NotificationId = number;

const INITIAL_STATE = {
  list: [] as Notification[],
  sequenceId: 0 as NotificationId,
};

export interface Notification {
  id: NotificationId;
  payload: NotificationData;
}

export interface NotificationData {
  message: string;
  severity: AlertColor;
  autoHideAfterMillis?: number;
}

const slice = createSlice({
  name: "notifications",
  initialState: INITIAL_STATE,
  reducers: {
    showNotification: (state, { payload }: PayloadAction<NotificationData>) => {
      state.sequenceId++;
      state.list.push({ id: state.sequenceId, payload });
    },

    hideNotification: (state, { payload }: PayloadAction<NotificationId>) => ({
      ...state,
      list: state.list.filter((notification) => notification.id !== payload),
    }),
  },
});

export const notificationActions = slice.actions;

export const selectFirstNotification = (
  state: RootState,
): Notification | null =>
  state.notifications.list.length > 0 ? state.notifications.list[0] : null;

export default slice.reducer;
