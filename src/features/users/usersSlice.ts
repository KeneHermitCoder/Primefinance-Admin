import UsersAPI from './UsersAPI';
import { createSlice, } from '@reduxjs/toolkit';
import { IUserSliceState } from '../../contracts';
import { handleFulfilledState, handlePendingState, handleRejectedState } from '../../utils';

const usersAPI = new UsersAPI();

const getAdminsKPIData = usersAPI.getAdminsKPIData;
const getMultipleAdmins = usersAPI.getMultipleAdmins;
const getAdminOverviewData = usersAPI.getAdminOverviewData;
const updateAdminStatus = usersAPI.updateAdminStatus;

const getUsersKPIData = usersAPI.getUsersKPIData;
const getMultipleUsers = usersAPI.getMultipleUsers;
const getUserOverviewData = usersAPI.getUserOverviewData;
const updateUserStatus = usersAPI.updateUserStatus;

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        allAdminsData: {
            data: [],
            error: null,
            isLoading: true,
            success: false,
        },
        adminOverviewData: {
            data: [],
            error: null,
            isLoading: true,
            success: false,
        },
        adminKPIData: {
            data: {
                newAdminsCount: 0,
                totalAdminsCount: 0,
                activeAdminsCount: 0,
                suspendedAdminsCount: 0,
            },
            error: null,
            isLoading: true,
            success: false,
        },
        adminUpdateData: {
            data: {
                updatingId: null
            },
            error: null,
            isLoading: false,
            success: false,
        },
        allUsersData: {
            data: [],
            error: null,
            isLoading: true,
            success: false,
        },
        userOverviewData: {
            data: [],
            error: null,
            isLoading: true,
            success: false,
        },
        userKPIData: {
            data: {
                newUsersCount: 0,
                totalUsersCount: 0,
                activeUsersCount: 0,
                suspendedUsersCount: 0,
            },
            error: null,
            isLoading: true,
            success: false,
        },
        userUpdateData: {
            data: {
                updatingId: null
            },
            error: null,
            isLoading: false,
            success: false,
        }
    } as IUserSliceState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMultipleAdmins.pending, handlePendingState('allAdminsData'))
            .addCase(getMultipleAdmins.fulfilled, handleFulfilledState('allAdminsData'))
            .addCase(getMultipleAdmins.rejected, handleRejectedState('allAdminsData'))

            .addCase(getAdminOverviewData.pending, handlePendingState('adminOverviewData'))
            .addCase(getAdminOverviewData.fulfilled, handleFulfilledState('adminOverviewData'))
            .addCase(getAdminOverviewData.rejected, handleRejectedState('adminOverviewData'))

            .addCase(getAdminsKPIData.pending, handlePendingState('adminKPIData'))
            .addCase(getAdminsKPIData.fulfilled, handleFulfilledState('adminKPIData'))
            .addCase(getAdminsKPIData.rejected, handleRejectedState('adminKPIData'))

            .addCase(updateAdminStatus.pending, handlePendingState('adminUpdateData'))
            .addCase(updateAdminStatus.fulfilled, handleFulfilledState('adminUpdateData'))
            .addCase(updateAdminStatus.rejected, handleRejectedState('adminUpdateData'))

            .addCase(getMultipleUsers.pending, handlePendingState('allUsersData'))
            .addCase(getMultipleUsers.fulfilled, handleFulfilledState('allUsersData'))
            .addCase(getMultipleUsers.rejected, handleRejectedState('allUsersData'))

            .addCase(getUserOverviewData.pending, handlePendingState('userOverviewData'))
            .addCase(getUserOverviewData.fulfilled, handleFulfilledState('userOverviewData'))
            .addCase(getUserOverviewData.rejected, handleRejectedState('userOverviewData'))

            .addCase(getUsersKPIData.pending, handlePendingState('userKPIData'))
            .addCase(getUsersKPIData.fulfilled, handleFulfilledState('userKPIData'))
            .addCase(getUsersKPIData.rejected, handleRejectedState('userKPIData'))

            .addCase(updateUserStatus.pending, handlePendingState('userUpdateData'))
            .addCase(updateUserStatus.fulfilled, handleFulfilledState('userUpdateData'))
            .addCase(updateUserStatus.rejected, handleRejectedState('userUpdateData'));
    },
});

export const { reducer: users, } = usersSlice;