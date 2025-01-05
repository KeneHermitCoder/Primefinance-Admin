import * as React from "react";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { TransitionProps } from "@mui/material/transitions";
import DialogContentText from "@mui/material/DialogContentText";

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
  acceptActionInProgress,
}: {
  open: boolean;
  title: string;
  message: string;
  acceptText: string;
  rejectText: string;
  handleOpen: () => void;
  acceptActionInProgress: boolean;
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
            {
              acceptActionInProgress ? (
                <div className="flex items-center">
                  <div className="mr-2">Please wait...</div>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                </div>
              ) : (
                acceptText
              )
            }
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
