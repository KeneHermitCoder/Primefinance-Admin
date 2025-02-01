import NotificationsAPI from './NotificationsAPI';
import { ActionReducerMapBuilder, createSlice } from '@reduxjs/toolkit';
import { handleFulfilledState, handlePendingState, handleRejectedState } from '../../utils';

const notificationsAPI = new NotificationsAPI();
const getNotificationsKPIData = notificationsAPI.getNotificationsKPIData;
const getMultipleNotifications = notificationsAPI.getMultipleNotifications;
const getNotificationOverviewData = notificationsAPI.getNotificationOverviewData;

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        allNotificationsData: {
            data: [],
            error: null,
            isLoading: true,
            success: false,
        },
        notificationOverviewData: {
            data: [],
            error: null,
            isLoading: true,
            success: false,
        },
        notificationKPIData: {
            data: {
                totalNotification: 0,
                totalPendingNotification: 0,
                totalMostFrequent: 0,
                totalSuccessRate: 0,
            },
            error: null,
            isLoading: true,
            success: false,
        }
    },
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<any>) => {
        builder
            .addCase(getMultipleNotifications.pending, handlePendingState('allNotificationsData'))
            .addCase(getMultipleNotifications.fulfilled, handleFulfilledState('allNotificationsData'))
            .addCase(getMultipleNotifications.rejected, handleRejectedState('allNotificationsData'))
            .addCase(getNotificationOverviewData.pending, handlePendingState('notificationOverviewData'))
            .addCase(getNotificationOverviewData.fulfilled, handleFulfilledState('notificationOverviewData'))
            .addCase(getNotificationOverviewData.rejected, handleRejectedState('notificationOverviewData'))
            .addCase(getNotificationsKPIData.pending, handlePendingState('notificationKPIData'))
            .addCase(getNotificationsKPIData.fulfilled, handleFulfilledState('notificationKPIData'))
            .addCase(getNotificationsKPIData.rejected, handleRejectedState('notificationKPIData'));
    },
});

export const { reducer: notifications } = notificationsSlice;
