import { createAsyncThunk, } from '@reduxjs/toolkit';
import { handleError, supabaseClient, } from '../../utils';

class LoansAPI {
    getMultipleLoans = createAsyncThunk('loans/getallLoans', async ({
        page = 1,
        limit = 10,
    }: {
        page: number;
        limit: number;
    }, thunkAPI) => {
        // const { data, error, } = await supabaseClient.from('loans').select(
        //     'id, first_name, last_name, amount, status'
        // ).range((page - 1) * limit, page * limit - 1);
        const { data, error, } = await supabaseClient.from('loans').select(
            '*'
        ).range((page - 1) * limit, page * limit - 1);
        if (error) return thunkAPI.rejectWithValue(handleError(error));
        else return data;
    });
}

export default LoansAPI;