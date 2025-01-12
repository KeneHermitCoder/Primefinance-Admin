import { createAsyncThunk, } from '@reduxjs/toolkit';
import { handleError, supabaseClient, } from '../../utils';

export default class TransactionsAPI {

    public getMultipleTransactions = createAsyncThunk('transactions/getallTransactions', async ({
        // page = 1,
        // limit = 10,
    }: {
        page?: number;
        limit?: number;
    }, thunkAPI) => {
        const { data, error, } = await supabaseClient.from('transactions').select('*')//.range((page - 1) * limit, page * limit - 1);
        if (error) return thunkAPI.rejectWithValue(handleError(error));
        else return data;
    });

    public getTransactionOverviewData = createAsyncThunk('transactions/getTransactionOverviewData', async ({
        // page = 1,
        // limit = 10,
    }: {
        page?: number;
        limit?: number;
    }, thunkAPI) => {
        const { data, error, } = await supabaseClient.from('transactions').select(
            'id, first_name, last_name, amount, status, repayment_date, percentage, base64Image'
        )//.range((page - 1) * limit, page * limit - 1);
        if (error) return thunkAPI.rejectWithValue(handleError(error));
        else return data;
    });

    public getTransactionsKPIData = createAsyncThunk('transactions/getTransactionsKPIData', async (_, thunkAPI) => {
        const { data, error, } = await supabaseClient.from('transactions').select('*')
        if (error) return thunkAPI.rejectWithValue(handleError(error));
        else return {
            totalTranxCount: data.length || 0,
            totalTransactions: (data.filter((transaction: any) => transaction.status === 'due')).length,
            pendingTranxCount: (data.filter((transaction: any) => transaction.status === 'due')).length,
            failedTranxCount: (data.filter((transaction: any) => transaction.status === 'failed')).length,
            successfulTranxCount: (data.filter((transaction: any) => transaction.status === 'paid')).length,
        }
    });

}