import { createAsyncThunk, } from '@reduxjs/toolkit';
import { handleError, supabaseClient, } from '../../utils';

class LoansAPI {
    getMultipleLoans = createAsyncThunk('loans/getallLoans', async ({
        page = 1,
        limit = 10,
    }: {
            page: number;
        limit: number;
    }, thunkAPI) =>  {
        // const { data, error, } = await supabaseClient.from('loans').select('*');
        const { data, error, } = await supabaseClient.from('loans').select('*').range((page - 1) * limit, page * limit - 1);
        if (error) {
            console.log({ error });
            const errorResponse = handleError(error);
            return thunkAPI.rejectWithValue(errorResponse);
        } else return data;
    })
}

export default LoansAPI;