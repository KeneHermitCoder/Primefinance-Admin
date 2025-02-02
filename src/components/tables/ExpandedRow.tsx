import React, { useState } from "react";
import { Box, Grid, Typography, Tabs, Tab } from "@mui/material";

export type LOANCATEGORY = "personal" | "working";
export type LOANTYPE = "request" | "repay";
export type LOANSTATUS = "pending" | "rejected" | "accepted";
export type LOANPAYMENTSTATUS = "complete" | "in-progress" | "not-started";
export type ACCOUNTTIER = "Tier 1" | "Tier 2" | "Tier 3";

export interface LoanOwnerDetails {
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

export interface CreditCheck {
  lastReported: string;
  creditorName: string;
  totalDebt: string;
  accountype: string;
  outstandingBalance: number;
  activeLoan: number;
  loansTaken: number;
  income: number;
  repaymentHistory: string;
  openedDate:  string;
  lengthOfCreditHistory: string;
  remarks: string;
}

export interface LoanRecord {
  id: number;
  name: string;
  amount: number;
  status: string;
  loanDetails: LoanOwnerDetails;
  creditCheck: CreditCheck;
}

const ExpandableRow: React.FC<{ loanDetails: LoanOwnerDetails; creditCheck: CreditCheck }> = ({ loanDetails, creditCheck }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isRunningCreditCheck, setIsRunningCreditCheck] = useState(false);
  const runCreditCheck = () => {
    alert("Running credit check...");
    // Run credit check on the loan owner
    setIsRunningCreditCheck(true);
    setTimeout(() => {
      setIsRunningCreditCheck(false);
    }, 3000);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={activeTab} onChange={(_, newValue) => {
        if (newValue === 1 && !isRunningCreditCheck) {
          runCreditCheck();
        }
        setActiveTab(newValue);
      }} aria-label="loan details tabs">
        <Tab label="Loan  Details" />
        <Tab label="Credit Check" />
      </Tabs>

      {activeTab === 0 && (
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>Loan Details</Typography>
          <Grid container spacing={2}>
            {/* Group 1: Loan Type, Address, Active Status, Income */}
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ color: "gray" }}><strong>Loan Type:</strong></Typography>
                <Typography variant="body2">{loanDetails.loanType}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ color: "gray" }}><strong>Address:</strong></Typography>
                <Typography variant="body2">{loanDetails.address}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ color: "gray" }}><strong>Active Status:</strong></Typography>
                <Typography variant="body2">{loanDetails.activeStatus}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ color: "gray" }}><strong>Income:</strong></Typography>
                <Typography variant="body2">{loanDetails.income}</Typography>
              </Grid>
            </Grid>

            {/* Group 2: Balance, Job, Relative's Phone, Account Tier */}
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ color: "gray" }}><strong>Balance:</strong></Typography>
                <Typography variant="body2">{loanDetails.balance}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ color: "gray" }}><strong>Job:</strong></Typography>
                <Typography variant="body2">{loanDetails.job}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ color: "gray" }}><strong>Relative's Phone:</strong></Typography>
                <Typography variant="body2">{loanDetails.relativePhone}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ color: "gray" }}><strong>Account Tier:</strong></Typography>
                <Typography variant="body2">{loanDetails.accountTier}</Typography>
              </Grid>
            </Grid>

            {/* Group 3: Highest Balance, Phone Number, BVN, NIN */}
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ color: "gray" }}><strong>Highest Balance:</strong></Typography>
                <Typography variant="body2">{loanDetails.highestBalance}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ color: "gray" }}><strong>Phone Number:</strong></Typography>
                <Typography variant="body2">{loanDetails.phoneNumber}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ color: "gray" }}><strong>BVN:</strong></Typography>
                <Typography variant="body2">{loanDetails.bvn}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ color: "gray" }}><strong>NIN:</strong></Typography>
                <Typography variant="body2">{loanDetails.nin}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}

      {activeTab === 1 && (
        isRunningCreditCheck ? (
          <Box sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>Running Credit Check...</Typography>
          </Box>
        ) :
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>Credit Check</Typography>
          <Grid container spacing={2}>
            {/* Group 1: Last Reported, Creditor Name, Total Debt, Account Type */}
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ color: "gray" }}><strong>Last Reported:</strong></Typography>
                <Typography variant="body2">{creditCheck.lastReported}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ color: "gray" }}><strong>Creditor Name:</strong></Typography>
                <Typography variant="body2">{creditCheck.creditorName}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ color: "gray" }}><strong>Total Debt:</strong></Typography>
                <Typography variant="body2">{creditCheck.totalDebt}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ color: "gray" }}><strong>Account Type:</strong></Typography>
                <Typography variant="body2">{creditCheck.accountype}</Typography>
              </Grid>
            </Grid>

            {/* Group 2: Outstanding Balance, Active Loan, Loans Taken, Income */}
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ color: "gray" }}><strong>Outstanding Balance:</strong></Typography>
                <Typography variant="body2">{creditCheck.outstandingBalance}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ color: "gray" }}><strong>Active Loan:</strong></Typography>
                <Typography variant="body2">{creditCheck.activeLoan}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ color: "gray" }}><strong>Loans Taken:</strong></Typography>
                <Typography variant="body2">{creditCheck.loansTaken}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ color: "gray" }}><strong>Income:</strong></Typography>
                <Typography variant="body2">{creditCheck.income}</Typography>
              </Grid>
            </Grid>

            {/* Group 3: Repayment History, Opened Date, Credit History Length, Remarks */}
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ color: "gray" }}><strong>Repayment History:</strong></Typography>
                <Typography variant="body2">{creditCheck.repaymentHistory}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ color: "gray" }}><strong>Opened Date:</strong></Typography>
                <Typography variant="body2">{creditCheck.openedDate}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ color: "gray" }}><strong>Credit History Length:</strong></Typography>
                <Typography variant="body2">{creditCheck.lengthOfCreditHistory}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="caption" sx={{ color: "gray" }}><strong>Remarks:</strong></Typography>
                <Typography variant="body2">{creditCheck.remarks}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default ExpandableRow;
