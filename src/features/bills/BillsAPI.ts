import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, httpClient } from "../../utils";
import { Transaction } from "../../primebase/interfaces";

export default class BillsAPI {
  private async fetchTransactions(_thunkAPI: any) {
    try {
      const response = await httpClient({
        method: "GET",
        url: "/api/data/all-transactions",
        data: {},
        isAuth: true,
      });

      // Extract data from the response
      const transaction = response?.data?.filter(
        (trnx: Transaction) => trnx.type === "paybills"
      );

      // Validate the response structure
      if (!transaction) throw new Error("No transaction data available");

      // Ensure transactions are always returned as an array
      return Array.isArray(transaction) ? transaction : [transaction];
    } catch (error) {
      throw error;
    }
  }

  public getMultipleBills = createAsyncThunk(
    "bills/getallBills",
    async (
      {}: // page = 1, limit = 10
      { page?: number; limit?: number },
      thunkAPI
    ) => {
      try {
        const transactions: Transaction[] = await this.fetchTransactions(
          thunkAPI
        );
        return transactions?.filter((trnx) => trnx) || [];
      } catch (error: any) {
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  );

  public getBillOverviewData = createAsyncThunk(
    "bills/getBillOverviewData",
    async (_, thunkAPI) => {
      try {
        const response: Transaction[] = await this.fetchTransactions(thunkAPI);

        return {
          totalTransactions: response.length,
          totalAmount: response.reduce(
            (acc: number, curr: Transaction) => acc + curr.amount,
            0
          ),
          failedTransactions: response.filter((tx) => tx.status === "failed")
            .length,
          successfulTransactions: response.filter(
            (tx) => tx.status === "success"
          ).length,
          loanTransactions: response.filter((tx) => tx.type === "loan").length,
          paybillsTransactions: response.filter((tx) => tx.type === "paybills")
            .length,
        };
      } catch (error: any) {
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  );

  public getBillsKPIData = createAsyncThunk(
    "bills/getBillsKPIData",
    async (_, thunkAPI) => {
      try {
        const transactions = await this.fetchTransactions(thunkAPI);

        const totalBillsCount = transactions.length;
        const totalBills = transactions.reduce(
          (acc: number, curr: { amount: number }) => acc + curr.amount,
          0
        );
        const failedBillsCount = transactions.filter(
          (bill: { status: string }) => bill.status === "failed"
        ).length;
        const pendingBillsCount = transactions.filter(
          (bill: { status: string }) => bill.status === "pending"
        ).length;
        const airtimeBillsCount = transactions.filter(
          (bill: { category?: string }) => bill.category?.includes("airtime")
        ).length;
        const giftCardBillsCount = transactions.filter(
          (bill: { category?: string }) => bill.category?.includes("giftcard")
        ).length;
        const tvSubscriptionBillsCount = transactions.filter(
          (bill: { category?: string }) => bill.category?.includes("tv")
        ).length;
        const electricityBillsCount = transactions.filter(
          (bill: { category?: string }) =>
            bill.category?.includes("electricity")
        ).length;
        const otherBillsCount = transactions.filter(
          (bill: { category?: string }) =>
            !bill.category?.includes("airtime") &&
            !bill.category?.includes("giftcard") &&
            !bill.category?.includes("tv") &&
            !bill.category?.includes("electricity")
        ).length;
        return {
          totalBillsCount,
          totalBills,
          failedBillsCount,
          pendingBillsCount,
          airtimeBillsCount,
          giftCardBillsCount,
          tvSubscriptionBillsCount,
          electricityBillsCount,
          otherBillsCount,
        };
      } catch (error: any) {
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  );
}