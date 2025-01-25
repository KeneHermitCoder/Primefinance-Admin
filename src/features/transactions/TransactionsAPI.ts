import { createAsyncThunk, } from '@reduxjs/toolkit';
import { handleError, supabaseClient, } from '../../utils';
import { primebase } from '../../lib/primebase';

export default class TransactionsAPI {

    public getMultipleTransactions = createAsyncThunk('transactions/getallTransactions', async ({
        // page = 1,
        // limit = 10,
    }: {
        page?: number;
        limit?: number;
    }, thunkAPI) => {
        const { data, error, } = await primebase.data.transactions();//.range((page - 1) * limit, page * limit - 1);
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
        try {
            const { data, error } = await primebase.data.transactions();

            if (!data || !data.transaction) {
                return thunkAPI.rejectWithValue('No transaction data available');
            }
            if (error) {
                return thunkAPI.rejectWithValue(handleError(error));
            }

            const transactions = Array.isArray(data.transaction) ? data.transaction : [data.transaction];

            return {
                totalTranxCount: transactions.length || 0,
                failedTranxCount: transactions.filter((transaction: any) => transaction.status === 'failed').length,
                pendingTranxCount: transactions.filter((transaction: any) => transaction.status === 'active').length,
                totalTransactions: transactions.reduce((acc: number, transaction: any) => acc + (transaction.amount || 0), 0),
                successfulTranxCount: transactions.filter((transaction: any) => transaction.status === 'success').length,
                failedTransactions: transactions.reduce((acc: number, transaction: any) => acc + (transaction.status === 'failed' ? transaction.amount : 0), 0),
                pendingTransactions: transactions.reduce((acc: number, transaction: any) => acc + (transaction.status === 'active' ? transaction.amount : 0), 0),
                successfullTransactions: transactions.reduce((acc: number, transaction: any) => acc + (transaction.status === 'success' ? transaction.amount : 0), 0),
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(handleError(error));
        }
    });

}