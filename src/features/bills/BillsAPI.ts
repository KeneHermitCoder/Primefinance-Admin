import { createAsyncThunk, } from '@reduxjs/toolkit';
import { handleError,  } from '../../utils';
import { primebase } from '../../lib/primebase';

export default class BillsAPI {

    public getMultipleBills = createAsyncThunk('bills/getallBills', async ({
        page = 1,
        limit = 10,
    }: {
        page?: number;
        limit?: number;
    }, thunkAPI) => {
        const response = await primebase.paybill.billerCategories();
        const { data, error, } =  response.data.slice((page - 1) * limit, page * limit);;
        if (error) return thunkAPI.rejectWithValue(handleError(error));
        else return {data, total: response.data.length};
    });

    public getBillOverviewData = createAsyncThunk('bills/getBillOverviewData', async ({
        page = 1,
        limit = 10,
    }: {
        page?: number;
        limit?: number;
    }, thunkAPI) => {
            const response = await primebase.paybill.billerList("paybills");
            const {data, error} = response.data.slice((page - 1) * limit, page * limit);
        if (error) return thunkAPI.rejectWithValue(handleError(error));
        else return {data, total: response.data.length};
    });

    public getBillsKPIData = createAsyncThunk('bills/getBillsKPIData', async (_, thunkAPI) => {
        try {
            const response = await primebase.paybill.billerList("paybills");
            const { data, error } = response;
            if (error) return thunkAPI.rejectWithValue(handleError(error));
            return {
                totalBillsCount: data.length,
                totalBills: data.reduce((acc: number, curr: { amount: number }) => acc + curr.amount, 0),
                failedBillsCount: data.filter((bill: { status: string }) => bill.status === 'failed').length,
                pendingBillsCount: data.filter((bill: { status: string }) => bill.status === 'pending').length,
                airtimeBillsCount: data.filter((bill: { category?: string }) => bill.category?.includes('airtime')).length,
                giftCardBillsCount: data.filter((bill: { category?: string }) => bill.category?.includes('giftcard')).length,
                tvSubscriptionBillsCount: data.filter((bill: { category?: string }) => bill.category?.includes('tv')).length,
                electricityBillsCount: data.filter((bill: { category?: string }) => bill.category?.includes('electricity')).length,
            };
        } catch (error: any) {
            return thunkAPI.rejectWithValue(handleError(error));
        }
    });

}