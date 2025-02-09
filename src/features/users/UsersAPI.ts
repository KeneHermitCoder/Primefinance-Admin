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
                method: 'get',
                url: '/api/users/get-users',
                data: {},
                isAuth: true,
                // headers: options.headers,
                // params: options.params,
            });
            // return response.data?.filter((user: any) => user.is_super_admin);
            return response.data?.filter((user: any) => user.role == 'admin');
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
            const data = response.data;
            return {
                id: data?.filter((user:any)=> user.id),
                email: data?.filter((user: any)=> user.name),
                last_login: data?.filter((user: any)=> user.name),

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
            const data = response.data?.filter((user: any) => user.role == 'user');
            return {
                newUsersCount: data?.filter((user: any) => {
                    const createdAt = new Date(user?.createdAt);
                    const sevenDaysAgo = new Date();
                    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                    return createdAt.getTime() > sevenDaysAgo.getTime() && user.role === 'admin';
                }).length || 0,
                totalUsersCount: data.length || 0,
                activeUsersCount: data?.filter((user: any) => user.confirmed_at).length || 0,
                flaggedUsersCount: data?.filter((user: any) => !user.confirmed_at).length || 0

            };
        } catch (error: any) {
            const errorResponse = handleError(error);
            thunkAPI.rejectWithValue(errorResponse);
        }
        
    });

}