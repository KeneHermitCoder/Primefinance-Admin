import React, { useEffect, useState } from "react";
import LoanExpandedRowSkeleton from "./LoanExpandedRowSkeleton";
import { Box, Grid, Typography, Tabs, Tab, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features";
import LoansAPI from "../../features/loans/LoansAPI";
import { ICreditScore } from "../../contracts";
import TableErrorComponent from "./TableErrorComponent";

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
}> = ({ loanDetails, }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);
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

  const {
    loanCreditScoreData,
  } = useSelector((state: RootState) => state.loans);

  const runCreditScore = () => {
    // Fetch loans when the component mounts
    // @ts-ignore
    dispatch(new LoansAPI().getLoansCreditScoreData({ loanId: loanDetails.loanId, }));
  };

  useEffect(() => {
    if (loanCreditScoreData.data) {
      alert('loanCreditScoreData')
      setCreditScore(loanCreditScoreData.data);
    }
  }, [dispatch]);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={activeTab}
        onChange={(_, newValue) => {
          if (newValue === 1 && !loanCreditScoreData.isLoading) runCreditScore();
          setActiveTab(newValue);
        }}
        aria-label="loan details tabs"
      >
        <Tab label="Loan  Details" />
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
                <Typography variant="body2">{loanDetails.loanType}</Typography>
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

      {activeTab === 1 &&
        (
          loanCreditScoreData?.error ? (
          <TableErrorComponent message="Failed to load credit score data." onRetry={runCreditScore} />
        ) :
        loanCreditScoreData?.isLoading ? (
          <LoanExpandedRowSkeleton />
        ) : (
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Credit Check
            </Typography>
            <Grid container spacing={2}>
              {/* Group 1: Last Reported, Creditor Name, Total Debt, Account Type */}
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

              {/* Group 2: Outstanding Balance, Active Loan, Loans Taken, Income */}
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
                  <Typography variant="body2">{creditScore.income}</Typography>
                </Grid>
              </Grid>

              {/* Group 3: Repayment History, Opened Date, Credit History Length, Remarks */}
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
                  <Typography variant="body2">{creditScore.remarks}</Typography>
                </Grid>
              </Grid>
            </Grid>
            {
              creditScore.loansTaken > 100000 && (
                <Button variant="contained" color="primary" onClick={() => console.log('ijn ')} className="self-end md:self-center">
                  Retry
                </Button>
              )
            }
            
          </Box>
        ))}
    </Box>
  );
}

export default LoanExpandableRow;