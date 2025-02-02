import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, httpClient } from "../../utils";

export default class LoansAPI {
  public getMultipleLoans = createAsyncThunk(
    "loans/getallLoans",
    async (
      { page = 1, limit = 10 }: { page?: number; limit?: number },
      thunkAPI
    ) => {
      try {
        console.log({ page, limit, });
        const response = await httpClient({
          method: "GET",
          url: "/api/loans/all-loans",
          data: {},
          // params: { page, limit },
          isAuth: true,
        });

        console.log({ allLoansData: response.data });
        return response.data; 
      } catch (error: any) {
        console.error("Error fetching loans:", error);

        const errorResponse = handleError(error);
        return thunkAPI.rejectWithValue(errorResponse);
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
        const response = await httpClient({
          method: "GET",
          url: "/api/loans/all-loans",
          data: {},
          params: { page, limit },
          isAuth: true,
        });

        return response;
      } catch (error: any) {
        console.error("Error fetching loans:", error);

        const errorResponse = handleError(error);
        return thunkAPI.rejectWithValue(errorResponse);
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
        const response = await httpClient({
          method: "GET",
          url: "/api/loans/all-loans",
          params: { page, limit },
          isAuth: true,
        });
        console.log({ allLoans: response, });

        // Ensure 'data' is not null before accessing it
        if (!response || !response.data) {
          return thunkAPI.rejectWithValue("No loan data available");
        }

        const { loan } = response.data as any;

        return {
          totalLoans: loan.length || 0,
          activeLoans: loan.filter((l: any) => l.status === "active").length,
          repaidLoans: loan.filter((l: any) => l.status === "repaid").length,
          overdueLoans: loan.filter((l: any) => l.status === "overdue").length,
          totalLoansRevenue: loan.reduce(
            (acc: number, l: any) =>
              acc + (isNaN(Number.parseFloat(l.amount)) ? 0 : Number(l.amount)),
            0
          ),
          dueLoansRevenue: loan
            .filter((l: any) => l.status === "due")
            .reduce(
              (acc: number, l: any) =>
                acc +
                (isNaN(Number.parseFloat(l.amount)) ? 0 : Number(l.amount)),
              0
            ),
          activeLoansRevenue: loan
            .filter((l: any) => l.status === "active")
            .reduce(
              (acc: number, l: any) =>
                acc +
                (isNaN(Number.parseFloat(l.amount)) ? 0 : Number(l.amount)),
              0
            ),
          repaidLoansRevenue: loan
            .filter((l: any) => l.status === "repaid")
            .reduce(
              (acc: number, l: any) =>
                acc +
                (isNaN(Number.parseFloat(l.amount)) ? 0 : Number(l.amount)),
              0
            ),
          overdueLoansRevenue: loan
            .filter((l: any) => l.status === "overdue")
            .reduce(
              (acc: number, l: any) =>
                acc +
                (isNaN(Number.parseFloat(l.amount)) ? 0 : Number(l.amount)),
              0
            ),
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

        // return {
        //   loanId: response.data.loanId || "",
        //   lastReported: response.data.lastReported || "",
        //   creditorName: response.data.creditorName || "",
        //   totalDebt: response.data.totalDebt || "",
        //   accountype: response.data.accountype || "",
        //   outstandingBalance: response.data.outstandingBalance || 0,
        //   activeLoan: response.data.activeLoan || 0,
        //   loansTaken: response.data.loansTaken || 0,
        //   income: response.data.income || 0,
        //   repaymentHistory: response.data.repaymentHistory || "",
        //   openedDate: response.data.openedDate || "",
        //   lengthOfCreditHistory: response.data.lengthOfCreditHistory || "",
        //   remarks: response.data.remarks || "",
        // };

      } catch (error) {
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  );
}