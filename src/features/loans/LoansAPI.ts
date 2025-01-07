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
        else return {
            data,
            totalLoans: data.length
        };
    });
}