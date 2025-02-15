import * as React from "react";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import {
  Input,
  Stack,
  InputLabel,
  Typography,
  FormControl,
  InputAdornment,
} from "@mui/material";
import { RootState } from "../../features";
import DialogTitle from "@mui/material/DialogTitle";
import LoansAPI from "../../features/loans/LoansAPI";
import { useDispatch, useSelector } from "react-redux";
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

export default function LoanSlideInAlertDialog({
  open,
  type,
  title,
  message,
  acceptText,
  rejectText,
  handleOpen,
  loanDetails,
}: {
  type: string;
  open: boolean;
  title: string;
  message: string;
  loanDetails: any;
  acceptText: string;
  rejectText: string;
  handleOpen: () => void;
}) {
  const dispatch = useDispatch();
  const [amount, setAmount] = React.useState(0);
  const [reason, setReason] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const {
    approveLoanData,
  } = useSelector((state: RootState) => state.loans);
  const handleAccept = async () => {
    type === "approve" &&
    dispatch(
      // @ts-ignore
      new LoansAPI().approveLoan({
          amount,
          loanId: loanDetails.loanId,
          userId: loanDetails.userId,
          duration: loanDetails.duration,
        })
      );
      type === "decline" &&
      dispatch(
        // @ts-ignore
        new LoansAPI().declineLoan({
          loanId: loanDetails.loanId,
          amount,
          duration: loanDetails.duration,
        })
      );
  };

  React.useEffect(() => {
    if (approveLoanData.error) {
      setErrorMessage(approveLoanData.error);
    }
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  }, [approveLoanData.error]);

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
          className="flex flex-col justify-between gap-3"
        >
          {type === "approve" && (
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">
                Amount
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                type="number"
                placeholder="3000 - 5000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                startAdornment={
                  <InputAdornment position="start">₦</InputAdornment>
                }
              />
            </FormControl>
          )}
          {type === "decline" && (
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">
                Reason for declining
              </InputLabel>
              <Input
                id="standard-adornment-amount"
                type="text"
                placeholder="Reason for declining"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </FormControl>
          )}
          <Stack
            direction="row"
            spacing={2}
            justifyContent="end"
            className="w-full"
          >
            <Button color="primary" variant="contained" onClick={handleClose}>
              {rejectText}
            </Button>
            <Button
              color="error"
              variant="contained"
              disabled={!approveLoanData.isLoading? true : false}
              onClick={async () => {
                await handleAccept();
              }}
            >
              {approveLoanData.isLoading ? (
                <div className="flex items-center">
                  <div className="mr-2">Please wait...</div>
                  <div className={`animate-spin rounded-full h-4 w-4 border-b-2 border-white`}></div>
                </div>
              ) : (
                acceptText
              )}
            </Button>
          </Stack>
          <div  className="w-full flex justify-start">
          <Typography variant="inherit" color="error">
            {errorMessage}
          </Typography>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}