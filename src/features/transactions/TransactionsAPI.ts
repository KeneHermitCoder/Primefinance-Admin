import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleError, httpClient } from '../../utils';

interface Transaction {
  _id: string;
  name: string;
  amount: number;
  type: string;
  category: string;
  status: string;
  created_at: string;
}

export default class TransactionsAPI {
  private async fetchTransactions(thunkAPI: any) {
    try {
        const response = await httpClient({
            method: 'GET',
            url: '/api/data/all-transactions',
            data: {},
            isAuth: true,
        });

        // Extract data from the response
        const data = response.data;

        // Validate the response structure
        if (!data || !data.transaction) {
            return thunkAPI.rejectWithValue('No transaction data available');
        }

        // Ensure transactions are always returned as an array
        return Array.isArray(data.transaction) ? data.transaction : [data.transaction];

    } catch (error) {
        // Handle exceptions properly
        return thunkAPI.rejectWithValue(handleError(error));
    }
}

         

  public getMultipleTransactions = createAsyncThunk(
    'transactions/getallTransactions',
    async ( thunkAPI) => {
      return await this.fetchTransactions(thunkAPI);
    }
  );

  public getTransactionOverviewData = createAsyncThunk(
    'transactions/getTransactionOverviewData',
    async (_, thunkAPI) => {
      const transactions: Transaction[] = await this.fetchTransactions(thunkAPI);

      const overviewData = {
        id: [] as string[],
        name: [] as string[],
        amount: [] as number[],
        type: [] as string[],
        category: [] as string[],
        status: [] as string[],
        created_at: [] as string[],
      };

      transactions.forEach(tranx => {
        overviewData.id.push(tranx._id);
        overviewData.name.push(tranx.name);
        overviewData.amount.push(tranx.amount);
        overviewData.type.push(tranx.type);
        overviewData.category.push(tranx.category);
        overviewData.status.push(tranx.status);
        overviewData.created_at.push(tranx.created_at);
      });

      return overviewData;
    }
  );

  public getTransactionsKPIData = createAsyncThunk(
    'transactions/getTransactionsKPIData',
    async (_, thunkAPI) => {
      const transactions: Transaction[] = await this.fetchTransactions(thunkAPI);

      const totalTranxCount = transactions.length;
      const failedTranxCount = transactions.filter((t) => t.status === 'failed').length;
      const pendingTranxCount = transactions.filter((t) => t.status === 'active').length;
      const totalTransactions = transactions.reduce((acc, t) => acc + (t.amount || 0), 0);
      const successfulTranxCount = transactions.filter((t) => t.status === 'success').length;
      const failedTransactions = transactions.reduce((acc, t) => acc + (t.status === 'failed' ? t.amount : 0), 0);
      const pendingTransactions = transactions.reduce((acc, t) => acc + (t.status === 'active' ? t.amount : 0), 0);
      const successfulTransactions = transactions.reduce((acc, t) => acc + (t.status === 'success' ? t.amount : 0), 0);

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
    }
  );
}
