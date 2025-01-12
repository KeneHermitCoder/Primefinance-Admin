import { createAsyncThunk, } from '@reduxjs/toolkit';
import { handleError, supabaseClient, } from '../../utils';

export default class EscrowAPI {

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
            totalLoans: data.length || 0,
            dueLoans: (data.filter((loan: any) => loan.status === 'due')).length,
            activeLoans: (data.filter((loan: any) => loan.status === 'active')).length,
            repaidLoans: (data.filter((loan: any) => loan.status === 'repaid')).length,
            overdueLoans: (data.filter((loan: any) => loan.status === 'overdue')).length,
            totalLoansRevenue: (data.reduce((acc: number, loan: any) => acc + (isNaN(Number.parseFloat(loan.amount)) ? 0 : Number(loan.amount)), 0)),
            dueLoansRevenue: (data.filter((loan: any) => loan.status === 'due')).reduce((acc: number, loan: any) => acc + (isNaN(Number.parseFloat(loan.amount)) ? 0 : Number(loan.amount)), 0),
            activeLoansRevenue: (data.filter((loan: any) => loan.status === 'active')).reduce((acc: number, loan: any) => acc + (isNaN(Number.parseFloat(loan.amount)) ? 0 : Number(loan.amount)), 0),
            repaidLoansRevenue: (data.filter((loan: any) => loan.status === 'repaid')).reduce((acc: number, loan: any) => acc + (isNaN(Number.parseFloat(loan.amount)) ? 0 : Number(loan.amount)), 0),
            overdueLoansRevenue: (data.filter((loan: any) => loan.status === 'overdue')).reduce((acc: number, loan: any) => acc + (isNaN(Number.parseFloat(loan.amount)) ? 0 : Number(loan.amount)), 0),
        }
    });

}