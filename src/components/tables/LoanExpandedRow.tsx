import {
  Box,
  Tab,
  Grid,
  Tabs,
  Stack,
  Table,
  Button,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Typography,
  TableContainer,
} from "@mui/material";
import LoanExpandedRowSkeleton from "./LoanExpandedRowSkeleton";
import React, { useState, useCallback } from "react";
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
  relativePhone: string | number | (string | number)[];
  accountTier: ACCOUNTTIER;
  homeAddress: string;
  highestBalance: number;
  income: number;
  address: string;
  phoneNumber: number;
  bvn: string;
  nin: string;
  repayment_history: any[];
  loan_repayment_status: LOANPAYMENTSTATUS;
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
  const [modalData, setModalData] = useState<{
    type: 'approve' | 'decline';
    loanDetails: any;
    message: string;
  }>({
    type: 'approve',
    loanDetails,
    message: 'Are you sure you want to continue with the loan approval?',
  });

  const handleToggleModal = useCallback(() => {
    setModalOpen(prev => !prev);
  }, []);

  const setLogModalData = useCallback((type: 'approve' | 'decline') => {
    setModalData({
      type,
      loanDetails,
      message: `Are you sure you want to continue with the loan ${type === 'approve'? 'approval': 'decline'}?`,
    });
    handleToggleModal();
  }, [loanDetails, handleToggleModal]);

  const { loanCreditScoreData } = useSelector((state: RootState) => state.loans);

  const runCreditScore = useCallback(() => {
    // @ts-ignore
    dispatch(new LoansAPI().getLoansCreditScoreData({ loanId: loanDetails.loanId }));
  }, [dispatch, loanDetails.loanId]);

  const handleTabChange = useCallback((_: any, newValue: number) => {
    if (newValue === 2) runCreditScore();
    setActiveTab(newValue);
  }, [runCreditScore]);

  const renderLoanDetails = useCallback(() => (
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
  ), [loanDetails]);

  const renderRepaymentHistory = useCallback(() => (
    <Box sx={{ paddingX: 2, paddingY: 1 }}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="loan repayment history table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="caption" sx={{ color: "gray" }}>
                  <strong>ID</strong>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="caption" sx={{ color: "gray" }}>
                  <strong>Amount</strong>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="caption" sx={{ color: "gray" }}>
                  <strong>Date</strong>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="caption" sx={{ color: "gray" }}>
                  <strong>Oustanding</strong>
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loanDetails?.repayment_history?.map((repayment: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{repayment._id}</TableCell>
                <TableCell>{repayment.amount}</TableCell>
                <TableCell>{repayment.date}</TableCell>
                <TableCell>{repayment.outstanding}</TableCell>
              </TableRow>
            )) || <TableRow><TableCell colSpan={4}>No repayment history found.</TableCell></TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  ), [loanDetails.repayment_history]);

  const renderCreditCheck = useCallback(() => {
    if (loanCreditScoreData?.error) {
      return (
        <TableErrorComponent
          message="Failed to load credit score data."
          onRetry={runCreditScore}
        />
      );
    }

    if (loanCreditScoreData?.isLoading) {
      return <LoanExpandedRowSkeleton />;
    }

    return (
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
                {loanCreditScoreData.data.lastReported}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="caption" sx={{ color: "gray" }}>
                <strong>Creditor Name:</strong>
              </Typography>
              <Typography variant="body2">
                {loanCreditScoreData.data.creditorName}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="caption" sx={{ color: "gray" }}>
                <strong>Total Debt:</strong>
              </Typography>
              <Typography variant="body2">
                {loanCreditScoreData.data.totalDebt}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="caption" sx={{ color: "gray" }}>
                <strong>Account Type:</strong>
              </Typography>
              <Typography variant="body2">
                {loanCreditScoreData.data.accountype}
              </Typography>
            </Grid>
          </Grid>

          <Grid container item xs={12} spacing={2}>
            <Grid item xs={3}>
              <Typography variant="caption" sx={{ color: "gray" }}>
                <strong>Outstanding Balance:</strong>
              </Typography>
              <Typography variant="body2">
                {loanCreditScoreData.data.outstandingBalance}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="caption" sx={{ color: "gray" }}>
                <strong>Active Loan:</strong>
              </Typography>
              <Typography variant="body2">
                {loanCreditScoreData.data.activeLoan}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="caption" sx={{ color: "gray" }}>
                <strong>Loans Taken:</strong>
              </Typography>
              <Typography variant="body2">
                {loanCreditScoreData.data.loansTaken}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="caption" sx={{ color: "gray" }}>
                <strong>Income:</strong>
              </Typography>
              <Typography variant="body2">
                {loanCreditScoreData.data.income}
              </Typography>
            </Grid>
          </Grid>

          <Grid container item xs={12} spacing={2}>
            <Grid item xs={3}>
              <Typography variant="caption" sx={{ color: "gray" }}>
                <strong>Repayment History:</strong>
              </Typography>
              <Typography variant="body2">
                {loanCreditScoreData.data.repaymentHistory || "N/A"}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="caption" sx={{ color: "gray" }}>
                <strong>Opened Date:</strong>
              </Typography>
              <Typography variant="body2">
                {loanCreditScoreData.data.openedDate}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="caption" sx={{ color: "gray" }}>
                <strong>Credit History Length:</strong>
              </Typography>
              <Typography variant="body2">
                {loanCreditScoreData.data.lengthOfCreditHistory}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="caption" sx={{ color: "gray" }}>
                <strong>Remarks:</strong>
              </Typography>
              <Typography variant="body2">
                {loanCreditScoreData.data.remarks}
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
            disabled={['accepted'].includes(loanDetails.activeStatus)}
            className="self-end md:self-center"
          >
            Decline
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={['accepted'].includes(loanDetails.activeStatus)}
            onClick={() => setLogModalData("approve")}
            className="self-end md:self-center"
          >
            Approve
          </Button>
        </Stack>
      </Box>
    );
  }, [loanCreditScoreData, loanDetails.activeStatus, runCreditScore, setLogModalData]);

  return (
    <>
      <LoanSlideInAlertDialog
        open={modalOpen}
        title={`Loan ${modalData.type === "approve" ? "Approval" : "Decline"}`}
        message={modalData.message}
        type={modalData.type}
        acceptText="Continue"
        rejectText="Cancel"
        handleOpen={handleToggleModal}
        loanDetails={modalData.loanDetails}
      />
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="loan details tabs"
        >
          <Tab label="Loan Details" />
          <Tab label="Loan Repayment History" />
          <Tab label="Credit Check" />
        </Tabs>

        {activeTab === 0 && renderLoanDetails()}
        {activeTab === 1 && renderRepaymentHistory()}
        {activeTab === 2 && renderCreditCheck()}
      </Box>
    </>
  );
}

export default LoanExpandableRow;