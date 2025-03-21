import { createAsyncThunk, } from '@reduxjs/toolkit';
import { handleError, httpClient, } from '../../utils';

export default class UsersAPI {

    private async fetchUsers(_thunkAPI: any, page = 1, limit = 10) {
        try {
            const response = await httpClient({
                method: 'GET',
                url: '/api/users/get-users',
                data: {},
                params: { page, limit },
                isAuth: true,
            });
            const users = response.data;
            const sortedUsers = Array.isArray(users) ? users : [users];
            return sortedUsers.sort((a, b) => 
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        } catch (error) {
            throw error;
        }
    }

    public getMultipleAdmins = createAsyncThunk('loans/getAllAdmins', async ({
        // page = 1,
        // limit = 10,
    }: {
        page?: number;
        limit?: number;
    }, thunkAPI) => {
        try {
            const admins = ((await this.fetchUsers(thunkAPI)) || []).filter((admin: any) => admin.role === 'admin');
            return admins?.filter((admin: any) => admin.role === 'admin');
        } catch (error: any) {
            return thunkAPI.rejectWithValue(handleError(error));
        }
    });

    public getAdminOverviewData = createAsyncThunk('loans/getAdminOverviewData', async ({
        // page = 1,
        // limit = 10,
    }: {
        page?: number;
        limit?: number;
    }, thunkAPI) => {
        try {
            const admins = ((await this.fetchUsers(thunkAPI)) || []).filter((admin: any) => admin.role === 'admin');
            return {
                id: admins?.filter((admin: any) => admin.id),
                email: admins?.filter((admin: any) => admin.name),
                last_login: admins?.filter((admin: any) => admin.name),
            };
        } catch (error: any) {
            return thunkAPI.rejectWithValue(handleError(error));
        }
    });

    public getAdminsKPIData = createAsyncThunk('loans/getAdminsKPIData', async (_, thunkAPI) => {
        try {
            const admins = ((await this.fetchUsers(thunkAPI)) || []).filter((admin: any) => admin.role === 'admin');
            return {
                newAdminsCount: admins?.filter((admin: any) => {
                    const createdAt = new Date(admin?.createdAt);
                    const sevenDaysAgo = new Date();
                    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                    return createdAt.getTime() > sevenDaysAgo.getTime() && admin.role === 'admin';
                }).length || 0,
                totalAdminsCount: admins.length || 0,
                activeAdminsCount: admins?.filter((admin: any) => admin.status === 'active').length || 0,
                suspendedAdminsCount: admins?.filter((admin: any) => admin.status !== 'active').length || 0
            };
        } catch (error: any) {
            return thunkAPI.rejectWithValue(handleError(error));
        }
    });

    public getMultipleUsers = createAsyncThunk('loans/getAllUsers', async ({
        // page = 1,
        // limit = 10,
    }: {
        page?: number;
        limit?: number;
    }, thunkAPI) => { 
        try {
            const users = ((await this.fetchUsers(thunkAPI)) || []).filter((user: any) => user.role !== 'admin');
            return users?.filter((user: any) => user.role !== 'admin');
        } catch (error: any) {
            return thunkAPI.rejectWithValue(handleError(error));
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
            const users = await this.fetchUsers(thunkAPI);
            return {
                id: users?.filter((user:any)=> user.id),
                email: users?.filter((user: any)=> user.name),
                last_login: users?.filter((user: any)=> user.name),
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(handleError(error));
        }
    });

    public getUsersKPIData = createAsyncThunk('loans/getUsersKPIData', async (_, thunkAPI) => {
        try {
            const users = ((await this.fetchUsers(thunkAPI)) || []).filter((user: any) => user.role !== 'admin')
            return {
                newUsersCount: users?.filter((user: any) => {
                    const createdAt = new Date(user?.createdAt);
                    const sevenDaysAgo = new Date();
                    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                    return createdAt.getTime() > sevenDaysAgo.getTime();
                }).length || 0,
                totalUsersCount: users?.length ?? 0,
                activeUsersCount: users?.filter((user: any) => user.status === "active").length || 0,
                suspendedUsersCount: users?.filter((user: any) => user.status === "inactive").length || 0
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(handleError(error));
        }
    });

    public updateUserStatus = createAsyncThunk('users/updateUserStatus', async ({
        userId,
        status,
    }: {
        userId: string;
        status: "active" | "inactive";
    }, thunkAPI) => {
        try {
            const response = await httpClient({
                method: 'POST',
                url: `/api/users/activate-user`,
                data: { 
                    userId,
                    status,
                 },
                isAuth: true,
            });
            return response.data;
        } catch (error: any) {
            console.log(error);
            return thunkAPI.rejectWithValue(handleError(error));
        }
    });

    public updateAdminStatus = createAsyncThunk('users/updateAdminStatus', async ({
        adminId,
        status,
    }: {
        adminId: string;
        status: "active" | "inactive";
    }, thunkAPI) => {
        try {
            const response = await httpClient({
                method: 'POST',
                url: `/api/users/activate-admin`,
                data: { 
                    adminId,
                    status,
                 },
                isAuth: true,
            });
            return response.data;
        } catch (error: any) {
            console.log(error);
            return thunkAPI.rejectWithValue(handleError(error));
        }
    });
}