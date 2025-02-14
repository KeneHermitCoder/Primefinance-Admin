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

        // alert(JSON.stringify(loan));
        const totalLoans = loan.filter((l: any) => l.status !== 'rejected');
        const totalLoansAmount = totalLoans.reduce(
          (acc: number, l: any) =>
            acc + (isNaN(Number.parseFloat(l.repayment_amount)) ? 0 : Number(l.repayment_amount)),
          0
        );
        const totalLoansCount = totalLoans.length;

        const dueLoans = loan.filter((l: any) => l.status === "due");
        const dueLoansAmount = dueLoans.reduce(
          (acc: number, l: any) =>
            acc + (isNaN(Number.parseFloat(l.repayment_amount)) ? 0 : Number(l.repayment_amount)),
          0
        );
        const dueLoansCount = dueLoans.length;

        const pendingLoans = loan.filter((l: any) => l.status === "pending");
        const pendingLoansAmount = pendingLoans.reduce(
          (acc: number, l: any) =>
            acc + (isNaN(Number.parseFloat(l.repayment_amount)) ? 0 : Number(l.repayment_amount)),
          0
        );
        const pendingLoansCount = pendingLoans.length;

        const activeLoans = loan.filter((l: any) => l.status === "accepted" && l.loan_payment_status !== 'complete');
        const activeLoansAmount = activeLoans.reduce(
          (acc: number, l: any) =>
            acc + (isNaN(Number.parseFloat(l.repayment_amount)) ? 0 : Number(l.repayment_amount)),
          0
        );
        const activeLoansCount = activeLoans.length;

        const repaidLoans = loan.filter((l: any) => l.loan_payment_status === "complete");
        const repaidLoansAmount = repaidLoans.reduce(
          (acc: number, l: any) =>
            acc + ((isNaN(Number.parseFloat(l.repayment_amount)) ? 0 : Number(l.repayment_amount)) - (isNaN(Number.parseFloat(l.requested_amount)) ? 0 : Number(l.requested_amount))) + 500,
          0
        );
        const repaidLoansCount = repaidLoans.length;


        const overdueLoans = loan.filter((l: any) => new Date(l?.repayment_date || new Date()).getTime() < new Date().getTime() && l.status === "pending");
        const overdueLoansAmount = overdueLoans.reduce(
          (acc: number, l: any) =>
            acc + (isNaN(Number.parseFloat(l.repayment_amount)) ? 0 : Number(l.repayment_amount)),
          0
        );
        const overdueLoansCount = overdueLoans.length;


        return {
          totalLoansCount,
          totalLoansAmount,

          dueLoansCount,
          dueLoansAmount,

          pendingLoansCount,
          pendingLoansAmount,

          activeLoansCount,
          activeLoansAmount,

          repaidLoansCount,
          repaidLoansAmount,

          overdueLoansCount,
          overdueLoansAmount,

        }
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

        console.log({responseufbbrubrubiure: response.data});
        const creditScoredata = response?.data?.credit_score || {};
        return {
          loanId: creditScoredata?.loanId || "",
          lastReported: creditScoredata?.lastReported || "",
          creditorName: creditScoredata?.creditorName || "",
          totalDebt: creditScoredata?.totalDebt || "",
          accountype: creditScoredata?.accountype || "",
          outstandingBalance: creditScoredata?.outstandingBalance || "",
          activeLoan: creditScoredata?.activeLoan || "",
          loansTaken: creditScoredata?.loansTaken || "",
          income: creditScoredata?.income || "",
          repaymentHistory: creditScoredata?.repaymentHistory || "",
          openedDate: creditScoredata?.openedDate || "",
          lengthOfCreditHistory: creditScoredata?.lengthOfCreditHistory || "",
          remarks: creditScoredata?.remarks || "",
          userId: creditScoredata?.userId || "",
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