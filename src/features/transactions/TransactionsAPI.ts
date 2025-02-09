import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, httpClient } from "../../utils";

export default class TransactionsAPI {
  private async fetchTransactions(_thunkAPI: any) {
    try {
      const response = await httpClient({
        method: "GET",
        url: "/api/data/all-transactions",
        data: {},
        isAuth: true,
      });

      // Extract data from the response
      const transaction = response.data;

      // Validate the response structure
      if (!transaction) throw new Error("No transaction data available");

      // Ensure transactions are always returned as an array
      return Array.isArray(transaction)
        ? transaction
        : [transaction];
    } catch (error) {
      throw error;
    }
  }

  public getMultipleTransactions = createAsyncThunk(
    "transactions/getallTransactions",
    async (thunkAPI: any) => {
      try {
        const response = await this.fetchTransactions(thunkAPI);
        return response;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  );

  public getTransactionOverviewData = createAsyncThunk(
    "transactions/getTransactionOverviewData",
    async (_, thunkAPI) => {
      const transactions: any[] = await this.fetchTransactions(thunkAPI);
      return transactions;
    }
  );

  public getTransactionsKPIData = createAsyncThunk(
    "transactions/getTransactionsKPIData",
    async (_, thunkAPI) => {
      try {
        const transactions: any[] = await this.fetchTransactions(
          thunkAPI
        );
  
        const totalTranxCount = transactions.length;
        const failedTranxCount = transactions.filter(
          (t) => t.status === "failed"
        ).length;
        const pendingTranxCount = transactions.filter(
          (t) => t.status === "active"
        ).length;
        const totalTransactions = transactions.reduce(
          (acc, t) => acc + (t.amount || 0),
          0
        );
        const successfulTranxCount = transactions.filter(
          (t) => t.status === "success"
        ).length;
        const failedTransactions = transactions.reduce(
          (acc, t) => acc + (t.status === "failed" ? t.amount : 0),
          0
        );
        const pendingTransactions = transactions.reduce(
          (acc, t) => acc + (t.status === "active" ? t.amount : 0),
          0
        );
        const successfulTransactions = transactions.reduce(
          (acc, t) => acc + (t.status === "success" ? t.amount : 0),
          0
        );

        return {
          totalTranxCount,
          failedTranxCount,
          pendingTranxCount,
          totalTransactions,
          successfulTranxCount,
          failedTransactions,
          pendingTransactions,
          successfulTransactions,
        };
      } catch (error) {
        console.log('Error: ', error);
        // Handle exceptions properly
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  );
}