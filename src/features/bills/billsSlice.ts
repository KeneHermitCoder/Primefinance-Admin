import BillsAPI from './BillsAPI';
import { IBillSliceState } from '../../contracts';
import { ActionReducerMapBuilder, createSlice, } from '@reduxjs/toolkit';
import { handleFulfilledState, handlePendingState, handleRejectedState } from '../../utils';

const billsAPI = new BillsAPI();
const getBillsKPIData = billsAPI.getBillsKPIData;
const getMutipleBills = billsAPI.getMultipleBills;
const getBillOverviewData = billsAPI.getBillOverviewData;

const billsSlice = createSlice({
    name: 'bills',
    initialState: {
        allBillsData: {
            data: [],
            error: null,
            isLoading: true,
            success: false,
        },
        billOverviewData: {
            data: [],
            error: null,
            isLoading: true,
            success: false,
        },
        billKPIData: {
            data: {
                totalBills: 0,
                totalBillsCount: 0,
                failedBillsCount: 0,
                pendingBillsCount: 0,
                airtimeBillsCount: 0,
                giftCardBillsCount: 0,
                electricityBillsCount: 0,
                tvSubscriptionBillsCount: 0,
            },
            error: null,
            isLoading: true,
            success: false,
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMutipleBills.pending, handlePendingState('allBillsData'))
            .addCase(getMutipleBills.fulfilled, handleFulfilledState('allBillsData'))
            .addCase(getMutipleBills.rejected, handleRejectedState('allBillsData'))
            .addCase(getBillOverviewData.pending, handlePendingState('billOverviewData'))
            .addCase(getBillOverviewData.fulfilled, handleFulfilledState('billOverviewData'))
            .addCase(getBillOverviewData.rejected, handleRejectedState('billOverviewData'))
            .addCase(getBillsKPIData.pending, handlePendingState('billKPIData'))
            .addCase(getBillsKPIData.fulfilled, handleFulfilledState('billKPIData'))
            .addCase(getBillsKPIData.rejected, handleRejectedState('billKPIData'));
    },
} as {
    name: string;
    initialState: IBillSliceState;
    reducers: any;
    extraReducers: (builder: ActionReducerMapBuilder<IBillSliceState>) => void;
});

export const { reducer: bills, } = billsSlice;