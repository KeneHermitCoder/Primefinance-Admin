import { createAsyncThunk, } from '@reduxjs/toolkit';
import { handleError,  } from '../../utils';
import { primebase } from '../../lib/primebase';

export default class LoansAPI {

    public getMultipleLoans = createAsyncThunk('loans/getallLoans', async ({
        // page = 1,
        // limit = 10,
    }: {
        page?: number;
        limit?: number;
    }, thunkAPI) => {
        try {
            // Fetch loans data using the fetchAllLoans method
            const { data, success, error } = await primebase.loan.fetchAllLoans();

            if (!success) {
                return thunkAPI.rejectWithValue(error || 'Failed to fetch loans');
            }

            return data; // Return fetched loans data to the Redux store
        } catch (error) {
            return thunkAPI.rejectWithValue(handleError(error));
        }
    });

    public getLoanOverviewData = createAsyncThunk('loans/getLoanOverviewData', async (_, thunkAPI) => {
        try {
            const { data, error } = await primebase.loan.getLoanOverviewData();

            if (error) {
                return thunkAPI.rejectWithValue(handleError(error));
            }

            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(handleError(error));
        }
    });

    public getLoansKPIData = createAsyncThunk('loans/getLoansKPIData', async (_, thunkAPI) => {
        try {
            const response = await primebase.loan.getOverviewKpiData();

            // Ensure 'data' is not null before accessing it
            if (!response || !response.data) {
                return thunkAPI.rejectWithValue('No loan data available');
            }

            const { loan } = response.data as any;

            return {
                totalLoans: loan.length || 0,
                activeLoans: loan.filter((loan: any) => loan.status === 'active').length,
                repaidLoans: loan.filter((loan: any) => loan.status === 'repaid').length,
                overdueLoans: loan.filter((loan: any) => loan.status === 'overdue').length,
                totalLoansRevenue: loan.reduce(
                    (acc: number, loan: any) => acc + (isNaN(Number.parseFloat(loan.amount)) ? 0 : Number(loan.amount)),
                    0
                ),
                dueLoansRevenue: loan.filter((loan: any) => loan.status === 'due').reduce(
                    (acc: number, loan: any) => acc + (isNaN(Number.parseFloat(loan.amount)) ? 0 : Number(loan.amount)),
                    0
                ),
                activeLoansRevenue: loan.filter((loan: any) => loan.status === 'active').reduce(
                    (acc: number, loan: any) => acc + (isNaN(Number.parseFloat(loan.amount)) ? 0 : Number(loan.amount)),
                    0
                ),
                repaidLoansRevenue: loan.filter((loan: any) => loan.status === 'repaid').reduce(
                    (acc: number, loan: any) => acc + (isNaN(Number.parseFloat(loan.amount)) ? 0 : Number(loan.amount)),
                    0
                ),
                overdueLoansRevenue: loan.filter((loan: any) => loan.status === 'overdue').reduce(
                    (acc: number, loan: any) => acc + (isNaN(Number.parseFloat(loan.amount)) ? 0 : Number(loan.amount)),
                    0
                ),
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(handleError(error));
        }
    });

}