import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SlideInAlertDialog({
  open,
  title,
  message,
  acceptText,
  rejectText,
  handleOpen,
  acceptAction,
  rejectAction,
}: {
  open: boolean;
  title: string;
  message: string;
  acceptText: string;
  rejectText: string;
  handleOpen: () => void;
  acceptAction: () => Promise<void>;
  rejectAction: () => Promise<void>;
}) {
  const handleClose = () => {
    handleOpen();
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={"xs"}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "10px",
          },
          "& .MuiDialogActions-root": {
            padding: "20px",
          },
        }}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            //spacing between buttons
            "& > :not(:first-of-type)": {
              ml: 3,
            },
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={async () => {
              await rejectAction();
              handleClose();
            }}
          >
            {rejectText}
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={async () => {
              await acceptAction();
              handleClose();
            }}
          >
            {acceptText}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}