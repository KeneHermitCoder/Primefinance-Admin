import { createAsyncThunk, } from '@reduxjs/toolkit';
import { handleError, httpClient, } from '../../utils';

export default class UsersAPI {

    public getMultipleUsers = createAsyncThunk('loans/getallUsers', async ({
        // page = 1,
        // limit = 10,
    }: {
        page?: number;
        limit?: number;
    }, thunkAPI) => {
        try {
            const response = await httpClient({
                method: 'POST',
                url: '/api/users/get-users',
                data: {},
                isAuth: true,
                // headers: options.headers,
                // params: options.params,
            });
            console.log({ response, })
        } catch (error: any) {
            console.log({ error, });
            const errorResponse = handleError(error);
            thunkAPI.rejectWithValue(errorResponse);
        }
    });

    public getUserOverviewData = createAsyncThunk('loans/getLoanOverviewData', async ({
        // page = 1,
        // limit = 10,
    }: {
        page?: number;
        limit?: number;
    }, thunkAPI) => {
        try {
            const response = await httpClient({
                method: 'GET',
                url: '/api/users/get-users',
                data: {},
                isAuth: true,
                // headers: options.headers,
                // params: options.params,
            });
            const {data} = response.data;
            return {
                id: data.filter((user:any)=> user.id),
                email: data.filter((user: any)=> user.name),
                last_login: data.filter((user: any)=> user.name),

            };
        } catch (error: any) {
            console.log({ error, });
            const errorResponse = handleError(error);
            thunkAPI.rejectWithValue(errorResponse);
        }
    });

    public getUsersKPIData = createAsyncThunk('loans/getUsersKPIData', async (_, thunkAPI) => {
        try {
            const response = await httpClient({
                method: 'GET',
                url: '/api/users/get-users',
                data: {},
                isAuth: true,
                // headers: options.headers,
                // params: options.params,
            });
            const {data} = response.data;
            return {
                newUsersCount: data.filter((user: any) => user.status === 'active').length || 0,
                // totalUsersCount: data.length || 0,
                totalUsersCount: 0,
                activeUsersCount: data.filter((user: any) => user.status === 'active').length || 0,
                flaggedUsersCount: data.filter((user: any) => user.status === 'flagged').length || 0

            };
        } catch (error: any) {
            console.log({ error, });
            const errorResponse = handleError(error);
            thunkAPI.rejectWithValue(errorResponse);
        }
        
    });

}