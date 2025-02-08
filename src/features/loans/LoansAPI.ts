import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, httpClient } from "../../utils";

export default class LoansAPI {

  private async fetchLoans(thunkAPI: any, page = 1, limit = 10) {
    try {
      const response = await httpClient({
        method: "GET",
        url: "/api/loans/all-loans",
        data: {},
        params: { page, limit },
        isAuth: true,
      });

      // Extract data from the response
      const loan = response.data;

      // Validate the response structure
      if (!loan) return thunkAPI.rejectWithValue("No loan data available");

      // Ensure loans are always returned as an array
      return Array.isArray(loan)
        ? loan
        : [loan];
    } catch (error) {
      // Handle exceptions properly
      return thunkAPI.rejectWithValue(handleError(error));
    }
  }

  public getMultipleLoans = createAsyncThunk(
    "loans/getallLoans",
    async (
      { page = 1, limit = 10 }: { page?: number; limit?: number },
      thunkAPI
    ) => {
      try {
        const response = await this.fetchLoans(thunkAPI, page, limit);
        return response.data; 
      } catch (error: any) {
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  );

  public getLoanOverviewData = createAsyncThunk(
    "loans/getLoanOverviewData",
    async (
      {
        page = 1,
        limit = 10,
      }: {
        page?: number;
        limit?: number;
      },
      thunkAPI
    ) => {
      try {
        const response = await this.fetchLoans(thunkAPI, page, limit);
        return response;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  );

  public getLoansKPIData = createAsyncThunk(
    "loans/getLoansKPIData",
    async (
      {
        page = 1,
        limit = 10,
      }: {
        page?: number;
        limit?: number;
      },
      thunkAPI
    ) => {
      try {
        const response = await this.fetchLoans(thunkAPI, page, limit);

        // Ensure 'data' is not null before accessing it
        if (!response || response?.length < 1) return thunkAPI.rejectWithValue("No loan data available");

        const loan = response;

        alert(JSON.stringify(loan));
        console.log({loan})
        return {
          totalLoans: loan.length || 0,
          activeLoans: loan.filter((l: any) => l.status === "pending").length,
          repaidLoans: loan.filter((l: any) => l.status === "complete").length,
          overdueLoans: loan.filter((l: any) => l.status === "overdue").length,
          totalLoansRevenue: loan.reduce(
            (acc: number, l: any) =>
              acc + (isNaN(Number.parseFloat(l.amount)) ? 0 : Number(l.amount)),
            0
          ),
          // totalLoansRevenue: 4000,
          dueLoansRevenue: loan
            .filter((l: any) => l.status === "due")
            .reduce(
              (acc: number, l: any) =>
                acc +
                (isNaN(Number.parseFloat(l.amount)) ? 0 : Number(l.amount)),
              0
            ),
          activeLoansRevenue: loan
            .filter((l: any) => l.status === "pending")
            .reduce(
              (acc: number, l: any) =>
                acc +
                (isNaN(Number.parseFloat(l.amount)) ? 0 : Number(l.amount)),
              0
            ),
          repaidLoansRevenue: loan
            .filter((l: any) => l.status === "complete")
            .reduce(
              (acc: number, l: any) =>
                acc +
                (isNaN(Number.parseFloat(l.amount)) ? 0 : Number(l.amount)),
              0
            ),
          overdueLoansRevenue: loan
            .filter((l: any) => new Date(l.repayment_date)?.getTime() < new Date().getTime())
            .reduce(
              (acc: number, l: any) =>
                acc +
                (isNaN(Number.parseFloat(l.amount)) ? 0 : Number(l.amount)),
              0
            ),
        };
      } catch (error) {
        alert(JSON.stringify(error));
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  );

  public getLoansCreditScoreData = createAsyncThunk(
    "loans/getLoansCreditScoreData",
    async (
      {
        loanId,
      }: {
        loanId: string;
      },
      thunkAPI
    ) => {
      try {
        const response = await httpClient({
          method: "POST",
          url: `/api/loans/loan-transaction-status`,
          isAuth: true,
          data: { transactionId: loanId.toString() },
        });

        console.log({response})

        // Ensure 'data' is not null before accessing it
        if (!response || !response.data) return thunkAPI.rejectWithValue("No loan data available");

        return {
          loanId: response.data.loanId,
          lastReported: response.data.lastReported,
          creditorName: response.data.creditorName,
          totalDebt: response.data.totalDebt,
          accountype: response.data.accountype,
          outstandingBalance: response.data.outstandingBalance,
          activeLoan: response.data.activeLoan,
          loansTaken: response.data.loansTaken,
          income: response.data.income,
          repaymentHistory: response.data.repaymentHistory,
          openedDate: response.data.openedDate,
          lengthOfCreditHistory: response.data.lengthOfCreditHistory,
          remarks: response.data.remarks,
        };
      } catch (error) {
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  );

  public approveLoan = createAsyncThunk(
    "loans/approveLoan",
    async (
      {
        loanId,
        status,
      }: {
        loanId: string;
        status: string;
      },
      thunkAPI
    ) => {
      try {
        const response = await httpClient({
          method: "POST",
          url: `/api/loans/create-and-disburse-loan`,
          isAuth: true,
          data: { loanId, status },
        });

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  );

  public declineLoan = createAsyncThunk(
    "loans/declineLoan",
    async (
      {
        loanId,
        amount,
        duration,
      }: {
        loanId: string;
        amount: number;
        duration: number;
      },
      thunkAPI
    ) => {
      try {
        const response = await httpClient({
          method: "POST",
          url: `/api/loans/reject-loan`,
          isAuth: true,
          data: { 
            transactionId: loanId,
            amount, 
            duration 
          },
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  );

}