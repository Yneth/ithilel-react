import React, { FC, memo } from "react";
import { Modal } from "@mui/material";
import AbsoluteCenter from "../layout/AbsoluteCenter";
import UpsertEventForm from "./UpsertEventForm";
import { useAppDispatch, useAppSelector } from "../../store/root.store";
import {
  eventActions,
  selectModalOptions,
} from "../../store/events/events.slice";

const UpsertEventModal: FC = memo(() => {
  const modalOptions = useAppSelector(selectModalOptions);
  const dispatch = useAppDispatch();

  return (
    <Modal
      open={modalOptions.open}
      onClose={() => dispatch(eventActions.hideUpsertModal())}
    >
      <AbsoluteCenter>
        <UpsertEventForm />
      </AbsoluteCenter>
    </Modal>
  );
});

export default UpsertEventModal;
