import { createAsyncThunk, } from '@reduxjs/toolkit';
import { handleError, supabaseClient, } from '../../utils';

export default class UsersAPI {

    public getMultipleUsers = createAsyncThunk('loans/getallUsers', async ({
        // page = 1,
        // limit = 10,
    }: {
        page?: number;
        limit?: number;
    }, thunkAPI) => {
        const { data, error, } = await supabaseClient.from('auth.users').select('*')//.range((page - 1) * limit, page * limit - 1);
        if (error) return thunkAPI.rejectWithValue(handleError(error));
        else return data;
    });

    public getUserOverviewData = createAsyncThunk('loans/getLoanOverviewData', async ({
        // page = 1,
        // limit = 10,
    }: {
        page?: number;
        limit?: number;
    }, thunkAPI) => {
        const { data, error, } = await supabaseClient.from('auth.users').select(
            'id, first_name, last_name, email, status'
        );
        console.log({ data, error, });
        if (error) return thunkAPI.rejectWithValue(handleError(error));
        else return data;
    });

    public getUsersKPIData = createAsyncThunk('loans/getUsersKPIData', async (_, thunkAPI) => {
        const { data, error, } = await supabaseClient.from('auth.users').select('*');
        console.log({ data, error, });
        if (error) return thunkAPI.rejectWithValue(handleError(error));
        else return {
            newUsersCount: data.filter((user: any) => user.status === 'active').length || 0,
            totalUsersCount: data.length || 0,
            activeUsersCount: data.filter((user: any) => user.status === 'active').length || 0,
            flaggedUsersCount: data.filter((user: any) => user.status === 'flagged').length || 0
        }
    });

}