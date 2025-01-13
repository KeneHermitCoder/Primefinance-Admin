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
            'id, name, amount, type, category, status, created_at'
        );
        if (error) return thunkAPI.rejectWithValue(handleError(error));
        else return data;
    });

    public getTransactionsKPIData = createAsyncThunk('transactions/getTransactionsKPIData', async (_, thunkAPI) => {
        const { data, error, } = await supabaseClient.from('transactions').select('*')
        if (error) return thunkAPI.rejectWithValue(handleError(error));
        else return {
            totalTranxCount: data.length || 0,
            failedTranxCount: (data.filter((transaction: any) => transaction.status === 'failed')).length,
            pendingTranxCount: (data.filter((transaction: any) => transaction.status === 'active')).length,
            totalTransactions: data.reduce((acc: number, transaction: any) => acc + transaction.amount, 0),
            successfulTranxCount: (data.filter((transaction: any) => transaction.status === 'success')).length,
            failedTransactions: data.reduce((acc: number, transaction: any) => acc + (transaction.status === 'failed' ? transaction.amount : 0), 0),
            pendingTransactions: data.reduce((acc: number, transaction: any) => acc + (transaction.status === 'active' ? transaction.amount : 0), 0),
            successfullTransactions: data.reduce((acc: number, transaction: any) => acc + (transaction.status === 'success' ? transaction.amount : 0), 0),
        }
    });

}