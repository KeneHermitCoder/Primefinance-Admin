import UsersAPI from './UsersAPI';
import { IUserSliceState } from '../../contracts';
import { ActionReducerMapBuilder, createSlice, } from '@reduxjs/toolkit';
import { handleFulfilledState, handlePendingState, handleRejectedState } from '../../utils';

const usersAPI = new UsersAPI();
const getUsersKPIData = usersAPI.getUsersKPIData;
const getMultipleUsers = usersAPI.getMultipleUsers;
const getUserOverviewData = usersAPI.getUserOverviewData;

const usersSlice = createSlice({
    name: 'users',
    initialState: {
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
                flaggedUsersCount: 0,
            },
            error: null,
            isLoading: true,
            success: false,
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMultipleUsers.pending, handlePendingState('allUsersData'))
            .addCase(getMultipleUsers.fulfilled, handleFulfilledState('allUsersData'))
            .addCase(getMultipleUsers.rejected, handleRejectedState('allUsersData'))
            .addCase(getUserOverviewData.pending, handlePendingState('userOverviewData'))
            .addCase(getUserOverviewData.fulfilled, handleFulfilledState('userOverviewData'))
            .addCase(getUserOverviewData.rejected, handleRejectedState('userOverviewData'))
            .addCase(getUsersKPIData.pending, handlePendingState('userKPIData'))
            .addCase(getUsersKPIData.fulfilled, handleFulfilledState('userKPIData'))
            .addCase(getUsersKPIData.rejected, handleRejectedState('userKPIData'));
    },
} as {
    name: string;
    initialState: IUserSliceState;
    reducers: any;
    extraReducers: (builder: ActionReducerMapBuilder<IUserSliceState>) => void;
});

export const { reducer: users, } = usersSlice;