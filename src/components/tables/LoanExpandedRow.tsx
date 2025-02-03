import React, { useEffect, useState } from "react";
import LoanExpandedRowSkeleton from "./LoanExpandedRowSkeleton";
import { Box, Grid, Typography, Tabs, Tab, Button, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features";
import LoansAPI from "../../features/loans/LoansAPI";
import { ICreditScore } from "../../contracts";
import TableErrorComponent from "./TableErrorComponent";
import { LoanSlideInAlertDialog } from "../dialogs";

export type LOANCATEGORY = "personal" | "working";
export type LOANTYPE = "request" | "repay";
export type LOANSTATUS = "pending" | "rejected" | "accepted";
export type LOANPAYMENTSTATUS = "complete" | "in-progress" | "not-started";
export type ACCOUNTTIER = "Tier 1" | "Tier 2" | "Tier 3";

export interface LoanOwnerDetails {
  loanId: number | string;
  loanType: LOANTYPE;
  activeStatus: LOANSTATUS;
  balance: number;
  job: string;
  relativePhone: number;
  accountTier: ACCOUNTTIER;
  homeAddress: string;
  highestBalance: number;
  income: number;
  address: string;
  phoneNumber: number;
  bvn: string;
  nin: string;
}

export interface LoanRecord {
  id: number;
  name: string;
  amount: number;
  status: string;
  loanDetails: LoanOwnerDetails;
  creditScore: ICreditScore;
}

const LoanExpandableRow: React.FC<{
  loanDetails: LoanOwnerDetails;
}> = ({ loanDetails }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [creditScore, setCreditScore] = useState<ICreditScore>({
    loanId: "",
    lastReported: "",
    creditorName: "",
    totalDebt: "",
    accountype: "",
    outstandingBalance: 0,
    activeLoan: 0,
    loansTaken: 0,
    income: 0,
    repaymentHistory: "",
    openedDate: "",
    lengthOfCreditHistory: "",
    remarks: "",
  });

  const [modalData, setModalData] = useState<{
    type: 'approve' | 'decline';
    message: string;
    continueAction: () => void;
    cancelAction: () => void;
  }>({
    type: 'approve',
    message: 'Are you sure you want to continue with the loan approval?',
    continueAction: () => {},
    cancelAction: () => {},
  });

  const handleToggleModal = () => {
    setModalOpen(prev => !prev);
  }

  const setLogModalData = (type: 'approve' | 'decline') => {
    setModalData({
      type,
      message: `Are you sure you want to continue with the loan ${type === 'approve'? 'approval': 'decline'}?`,
      continueAction: type === 'approve'? handleApproveLoan: handleDeclineLoan,
      cancelAction: handleToggleModal,
    });
    handleToggleModal();
  };

  const handleApproveLoan = async () => {
    // @ts-ignore
    dispatch(new LoansAPI().approveLoan({ loanId: loanDetails.loanId }));
  }

  const handleDeclineLoan = async () => {
    // @ts-ignore
    dispatch(new LoansAPI().declineLoan({ loanId: loanDetails.loanId }));
  }

  const { loanCreditScoreData } = useSelector(
    (state: RootState) => state.loans
  );

  const runCreditScore = () => {
    // Fetch loans when the component mounts
    // @ts-ignore
    dispatch(new LoansAPI().getLoansCreditScoreData({ loanId: loanDetails.loanId }));
  };

  useEffect(() => {
    if (loanCreditScoreData.data) setCreditScore(loanCreditScoreData.data);
  }, [dispatch]);

  return (
    <>
      <LoanSlideInAlertDialog
        open={modalOpen}
        title={`Loan ${modalData.type === "approve" ? "Approval" : "Decline"}`}
        message={`Are you sure you want to continue with the loan ${
          modalData.type === "approve" ? "approval" : "decline"
        }?`}
        acceptText="Continue"
        rejectText="Cancel"
        handleOpen={handleToggleModal}
        acceptAction={handleApproveLoan}
        rejectAction={handleDeclineLoan}
        acceptActionInProgress={loanCreditScoreData?.isLoading}
      />
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={activeTab}
          onChange={(_, newValue) => {
            if (newValue === 1) runCreditScore();
            setActiveTab(newValue);
          }}
          aria-label="loan details tabs"
        >
          <Tab label="Loan  Details" />
          <Tab label="Loan Repayment History" />
          <Tab label="Credit Check" />
        </Tabs>

        {activeTab === 0 && (
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Loan Details
            </Typography>
            <Grid container spacing={2}>
              {/* Group 1: Loan Type, Address, Active Status, Income */}
              <Grid container item xs={12} spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="caption" sx={{ color: "gray" }}>
                    <strong>Loan Type:</strong>
                  </Typography>
                  <Typography variant="body2">
                    {loanDetails.loanType}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="caption" sx={{ color: "gray" }}>
                    <strong>Address:</strong>
                  </Typography>
                  <Typography variant="body2">{loanDetails.address}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="caption" sx={{ color: "gray" }}>
                    <strong>Active Status:</strong>
                  </Typography>
                  <Typography variant="body2">
                    {loanDetails.activeStatus}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="caption" sx={{ color: "gray" }}>
                    <strong>Income:</strong>
                  </Typography>
                  <Typography variant="body2">{loanDetails.income}</Typography>
                </Grid>
              </Grid>

              {/* Group 2: Balance, Job, Relative's Phone, Account Tier */}
              <Grid container item xs={12} spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="caption" sx={{ color: "gray" }}>
                    <strong>Balance:</strong>
                  </Typography>
                  <Typography variant="body2">{loanDetails.balance}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="caption" sx={{ color: "gray" }}>
                    <strong>Job:</strong>
                  </Typography>
                  <Typography variant="body2">{loanDetails.job}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="caption" sx={{ color: "gray" }}>
                    <strong>Relative's Phone:</strong>
                  </Typography>
                  <Typography variant="body2">
                    {loanDetails.relativePhone}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="caption" sx={{ color: "gray" }}>
                    <strong>Account Tier:</strong>
                  </Typography>
                  <Typography variant="body2">
                    {loanDetails.accountTier}
                  </Typography>
                </Grid>
              </Grid>

              {/* Group 3: Highest Balance, Phone Number, BVN, NIN */}
              <Grid container item xs={12} spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="caption" sx={{ color: "gray" }}>
                    <strong>Highest Balance:</strong>
                  </Typography>
                  <Typography variant="body2">
                    {loanDetails.highestBalance}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="caption" sx={{ color: "gray" }}>
                    <strong>Phone Number:</strong>
                  </Typography>
                  <Typography variant="body2">
                    {loanDetails.phoneNumber}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="caption" sx={{ color: "gray" }}>
                    <strong>BVN:</strong>
                  </Typography>
                  <Typography variant="body2">{loanDetails.bvn}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="caption" sx={{ color: "gray" }}>
                    <strong>NIN:</strong>
                  </Typography>
                  <Typography variant="body2">{loanDetails.nin}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}

        {activeTab === 1 && (
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Loan Repayment History
            </Typography>
            <Grid container spacing={2}>
              <Grid container item xs={12} spacing={2}>
                <Grid item xs={3}>
                  <Typography variant="caption" sx={{ color: "gray" }}>
                    <strong>Repayment Date:</strong>
                  </Typography>
                  <Typography variant="body2">
                    {creditScore.lastReported}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="caption" sx={{ color: "gray" }}>
                    <strong>Amount Paid:</strong>
                  </Typography>
                  <Typography variant="body2">
                    {creditScore.creditorName}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="caption" sx={{ color: "gray" }}>
                    <strong>Payment Status:</strong>
                  </Typography>
                  <Typography variant="body2">
                    {creditScore.totalDebt}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="caption" sx={{ color: "gray" }}>
                    <strong>Outstanding Balance:</strong>
                  </Typography>
                  <Typography variant="body2">
                    {creditScore.accountype}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        )}

        {activeTab === 2 &&
          (loanCreditScoreData?.error ? (
            <TableErrorComponent
              message="Failed to load credit score data."
              onRetry={runCreditScore}
            />
          ) : loanCreditScoreData?.isLoading ? (
            <LoanExpandedRowSkeleton />
          ) : (
            <Box sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Credit Check
              </Typography>
              <Grid container spacing={2}>
                <Grid container item xs={12} spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="caption" sx={{ color: "gray" }}>
                      <strong>Last Reported:</strong>
                    </Typography>
                    <Typography variant="body2">
                      {creditScore.lastReported}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="caption" sx={{ color: "gray" }}>
                      <strong>Creditor Name:</strong>
                    </Typography>
                    <Typography variant="body2">
                      {creditScore.creditorName}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="caption" sx={{ color: "gray" }}>
                      <strong>Total Debt:</strong>
                    </Typography>
                    <Typography variant="body2">
                      {creditScore.totalDebt}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="caption" sx={{ color: "gray" }}>
                      <strong>Account Type:</strong>
                    </Typography>
                    <Typography variant="body2">
                      {creditScore.accountype}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xs={12} spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="caption" sx={{ color: "gray" }}>
                      <strong>Outstanding Balance:</strong>
                    </Typography>
                    <Typography variant="body2">
                      {creditScore.outstandingBalance}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="caption" sx={{ color: "gray" }}>
                      <strong>Active Loan:</strong>
                    </Typography>
                    <Typography variant="body2">
                      {creditScore.activeLoan}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="caption" sx={{ color: "gray" }}>
                      <strong>Loans Taken:</strong>
                    </Typography>
                    <Typography variant="body2">
                      {creditScore.loansTaken}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="caption" sx={{ color: "gray" }}>
                      <strong>Income:</strong>
                    </Typography>
                    <Typography variant="body2">
                      {creditScore.income}
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item xs={12} spacing={2}>
                  <Grid item xs={3}>
                    <Typography variant="caption" sx={{ color: "gray" }}>
                      <strong>Repayment History:</strong>
                    </Typography>
                    <Typography variant="body2">
                      {creditScore.repaymentHistory}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="caption" sx={{ color: "gray" }}>
                      <strong>Opened Date:</strong>
                    </Typography>
                    <Typography variant="body2">
                      {creditScore.openedDate}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="caption" sx={{ color: "gray" }}>
                      <strong>Credit History Length:</strong>
                    </Typography>
                    <Typography variant="body2">
                      {creditScore.lengthOfCreditHistory}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="caption" sx={{ color: "gray" }}>
                      <strong>Remarks:</strong>
                    </Typography>
                    <Typography variant="body2">
                      {creditScore.remarks}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Stack
                direction="row"
                spacing={2}
                paddingY={2}
                paddingTop={4}
                sx={{ justifyContent: "start" }}
              >
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => setLogModalData("decline")}
                  className="self-end md:self-center"
                >
                  Decline
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => setLogModalData("approve")}
                  className="self-end md:self-center"
                >
                  Approve
                </Button>
              </Stack>
            </Box>
          ))}
      </Box>
    </>
  );
}

export default LoanExpandableRow;