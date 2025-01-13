import { createAsyncThunk, } from '@reduxjs/toolkit';
import { handleError, supabaseClient, } from '../../utils';

export default class BillsAPI {

    public getMultipleBills = createAsyncThunk('bills/getallBills', async ({
        // page = 1,
        // limit = 10,
    }: {
        page?: number;
        limit?: number;
    }, thunkAPI) => {
        const { data, error, } = await supabaseClient.from('transactions').select('*')//.range((page - 1) * limit, page * limit - 1);
        if (error) return thunkAPI.rejectWithValue(handleError(error));
        else return data;
    });

    public getBillOverviewData = createAsyncThunk('bills/getBillOverviewData', async ({
        // page = 1,
        // limit = 10,
    }: {
        page?: number;
        limit?: number;
    }, thunkAPI) => {
        const { data, error, } = await supabaseClient.from('transactions').select(
            'id, name, amount, type, category, status, created_at'
        ).eq('type', 'paybills');
        if (error) return thunkAPI.rejectWithValue(handleError(error));
        else return data;
    });

    public getBillsKPIData = createAsyncThunk('bills/getBillsKPIData', async (_, thunkAPI) => {
        const { data, error, } = await supabaseClient.from('transactions').select('*').eq('type', 'paybills');
        if (error) return thunkAPI.rejectWithValue(handleError(error));
        else return {
            totalBillsCount: data.length,
            totalBills: data.reduce((acc, curr) => acc + curr.amount, 0),
            failedBillsCount: data.filter((bill) => bill.status === 'failed').length,
            pendingBillsCount: data.filter((bill) => bill.status === 'pending').length,
            airtimeBillsCount: data.filter((bill) => bill.category?.includes('airtime')).length,
            giftCardBillsCount: data.filter((bill) => bill.category?.includes('giftcard')).length,
            tvSubscriptionBillsCount: data.filter((bill) => bill.category?.includes('tv')).length,
            electricityBillsCount: data.filter((bill) => bill.category?.includes('electricity')).length,
        }
    });

}