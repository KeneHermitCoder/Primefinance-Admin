import { createAsyncThunk, } from '@reduxjs/toolkit';
import { handleError, supabaseClient, } from '../../utils';

class LoansAPI {
    getMultipleLoans = createAsyncThunk('loans/getallLoans', async ({
        // page = 1,
        // limit = 10,
    }: {
        page?: number;
        limit?: number;
    }, thunkAPI) => {
        // const { data, error, } = await supabaseClient.from('loans').select(
        //     'id, first_name, last_name, amount, status'
        // ).range((page - 1) * limit, page * limit - 1);
        const { data, error, } = await supabaseClient.from('loans').select(
            // 'id, first_name, last_name, amount, status, repayment_date, percentage, base64Image'
            'id, first_name, last_name, amount, status, repayment_date, percentage, base64Image'
        )
        // .range((page - 1) * limit, page * limit - 1);
        if (error) return thunkAPI.rejectWithValue(handleError(error));
        else {
            console.log({data})
            const totalLoans = data.length;
            const activeLoans = data.filter((loan: any) => loan.status === 'active').length;
            const repaidloans = data.filter((loan: any) => loan.status === 'repaid').length;
            const dueLoans = data.filter((loan: any) => loan.repayment_date < new Date()).length;
            const overdueLoans = data.filter((loan: any) => loan.repayment_date < new Date() && loan.status === 'active').length;
            const loanRevenue = data.reduce((acc: number, loan: any) => acc + Number(loan.amount || 0), 0);
            const loanInterest = data.reduce((acc: number, loan: any) => acc + ((loan.percentage / 100) * loan.amount), 0);
            return {
                loans: data,
                totalLoans,
                activeLoans,
                repaidloans,
                dueLoans,
                overdueLoans,
                loanRevenue,
                loanInterest
            };
        }
    });
}

export default LoansAPI;