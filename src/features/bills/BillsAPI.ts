import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleError, httpClient } from '../../utils';
import { Transaction } from '../../primebase/interfaces';


export default class BillsAPI {
    public getMultipleBills = createAsyncThunk(
        'bills/getallBills',
        async ({ page = 1, limit = 10 }: { page?: number; limit?: number }, thunkAPI) => {
            try {
                const response = await httpClient({
                    method: 'GET',
                    url: '/api/data/all-transactions',
                });

                const { data }: { data: Transaction[] } = response;
                return { data: data.slice((page - 1) * limit, page * limit), total: data.length };
            } catch (error: any) {
                return thunkAPI.rejectWithValue(handleError(error));
            }
        }
    );

    public getBillOverviewData = createAsyncThunk(
        'bills/getBillOverviewData',
        async (_, thunkAPI) => {
            try {
                const response = await httpClient({
                    method: 'GET',
                    url: '/api/data/all-transactions',
                    isAuth: true,
                });

                const { data }: { data: Transaction[] } = response;
                return {
                    totalTransactions: data.length,
                    totalAmount: data.reduce((acc: number, curr: Transaction) => acc + curr.amount, 0),
                    failedTransactions: data.filter((tx) => tx.status === 'failed').length,
                    successfulTransactions: data.filter((tx) => tx.status === 'success').length,
                    loanTransactions: data.filter((tx) => tx.type === 'loan').length,
                    paybillsTransactions: data.filter((tx) => tx.type === 'paybills').length,
                };
            } catch (error: any) {
                return thunkAPI.rejectWithValue(handleError(error));
            }
        }
    );

    public getBillsKPIData = createAsyncThunk(
        'bills/getBillsKPIData',
        async (_, thunkAPI) => {
            try {
                const response = await httpClient({
                    method: 'GET',
                    url: '/api/data/all-transactions',
                    isAuth: true
                });

                const { data }: { data: Transaction[] } = response;
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
        }
    );
}
