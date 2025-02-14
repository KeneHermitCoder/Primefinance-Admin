import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, httpClient } from "../../utils";

export default class LoansAPI {

  private async fetchLoans(_thunkAPI: any, page = 1, limit = 10) {
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

      console.log({loan})
      // Validate the response structure
      if (!loan) throw new Error("No loan data available");

      // Ensure loans are always returned as an array
      return Array.isArray(loan)
        ? loan
        : [loan];
    } catch (error) {
      // Handle exceptions properly
      throw error;
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
        console.log({response})
        return response;
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
        // if (!response || response?.length < 1) return thunkAPI.rejectWithValue("No loan data available");
        if(!response) throw new Error("No loan data available")

        const loan = response;

        const dueLoans = loan.filter((l: any) => l.status === "due");
        const pendingLoans = loan.filter((l: any) => l.status === "pending");
        const repaidLoans = loan.filter((l: any) => l.status === "complete");
        const overdueLoans = loan.filter((l: any) => new Date(l?.repayment_date || new Date()).getTime() < new Date().getTime() && l.status === "pending");
        const totalLoansRevenue = repaidLoans.reduce(
          (acc: number, l: any) =>
            acc + (isNaN(Number.parseFloat(l.amount)) ? 0 : Number(l.amount)),
          0
        );
        const dueLoansRevenue = dueLoans.reduce(
          (acc: number, l: any) =>
            acc + (isNaN(Number.parseFloat(l.amount)) ? 0 : Number(l.amount)),
          0
        );
        const activeLoansRevenue = pendingLoans.reduce(
          (acc: number, l: any) =>
            acc + (isNaN(Number.parseFloat(l.amount)) ? 0 : Number(l.amount)),
          0
        );
        const repaidLoansRevenue = repaidLoans.reduce(
          (acc: number, l: any) =>
            acc + (isNaN(Number.parseFloat(l.amount)) ? 0 : Number(l.amount)),
          0
        );
        const overdueLoansRevenue = overdueLoans.reduce(
          (acc: number, l: any) =>
            acc + (isNaN(Number.parseFloat(l.amount)) ? 0 : Number(l.amount)),
          0
        );
        return {
          dueLoans: dueLoans.length,
          totalLoans: loan.length,
          activeLoans: pendingLoans.length,
          repaidLoans: repaidLoans.length,
          overdueLoans: overdueLoans.length,
          totalLoansRevenue,
          dueLoansRevenue,
          activeLoansRevenue,
          repaidLoansRevenue,
          overdueLoansRevenue,
        };
      } catch (error) {
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
          data: { transactionId: `${loanId}` },
        });

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
          userId: response.data.userId,
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
        userId,
        amount,
        duration,
      }: {
        amount: number;
        loanId: string;
        userId: string;
        duration: number;
      },
      thunkAPI
    ) => {
      try {
        const response = await httpClient({
          method: "POST",
          url: `/api/loans/create-and-disburse-loan`,
          isAuth: true,
          data: {
            userId,
            duration: duration || '30',
            transactionId: loanId,
            amount: `${amount.toString}` },
        });

        return response.data;
      } catch (error) {
        console.log(JSON.stringify(error, null, 2));
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
        console.log({ loanId, amount, duration });
        const response = await httpClient({
          method: "POST",
          url: `/api/loans/reject-loan`,
          isAuth: true,
          data: { 
            transactionId: loanId,
            amount, 
            duration: 30 
          },
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  );

}