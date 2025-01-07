import { createAsyncThunk, } from '@reduxjs/toolkit';
import { handleError, supabaseClient, } from '../../utils';

export default class LoansAPI {
    public getMultipleLoans = createAsyncThunk('loans/getallLoans', async ({
        // page = 1,
        // limit = 10,
    }: {
        page?: number;
        limit?: number;
    }, thunkAPI) => {
        const { data, error, } = await supabaseClient.from('loans').select('*')//.range((page - 1) * limit, page * limit - 1);
        if (error) return thunkAPI.rejectWithValue(handleError(error));
        else return data;
    });

    public getLoanOverviewData = createAsyncThunk('loans/getLoanOverviewData', async ({
        // page = 1,
        // limit = 10,
    }: {
        page?: number;
        limit?: number;
    }, thunkAPI) => {
        const { data, error, } = await supabaseClient.from('loans').select(
            'id, first_name, last_name, amount, status, repayment_date, percentage, base64Image'
        )//.range((page - 1) * limit, page * limit - 1);
        if (error) return thunkAPI.rejectWithValue(handleError(error));
        // if (error) return thunkAPI.abort('An error occurred!');
        else return data;
    });

    public getLoansKPIData = createAsyncThunk('loans/getLoansKPIData', async (_, thunkAPI) => {
        const { data, error, } = await supabaseClient.from('loans').select('*')
        if (error) return thunkAPI.rejectWithValue(handleError(error));
        // if (error) return thunkAPI.abort('An error occurred!');
        else return {
            totalLoans: data.length,
            activeLoans: (data.filter((loan: any) => loan.status === 'active')).length,
            repaidLoans: (data.filter((loan: any) => loan.status === 'repaid')).length,
            dueLoans: (data.filter((loan: any) => loan.status === 'due')).length,
            overdueLoans: (data.filter((loan: any) => loan.status === 'overdue')).length,
            totalLoanRevenue: (data.reduce((acc: number, loan: any) => acc + (isNaN(Number.parseFloat(loan.amount)) ? 0 : Number(loan.amount)), 0)),
        }
    });
}