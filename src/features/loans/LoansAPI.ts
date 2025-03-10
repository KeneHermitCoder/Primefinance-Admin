import { createAsyncThunk, } from "@reduxjs/toolkit";
import { handleError, httpClient, } from "../../utils";

export default class LoansAPI {

  private async fetchLoans(_thunkAPI: any, page = 1, limit = 10) {
    try {
      const response = await httpClient({
        method: "GET",
        url: "/api/loans/all-loans",
        data: {},
        params: { page, limit },
        isAuth: true,
      });

      // Ensure we're getting an array
      const loans = response.data;
      if (!loans) {
        return [];
      }

      // Sort by latest first
      const sortedLoans = Array.isArray(loans) ? loans : [loans];
      return sortedLoans.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } catch (error) {
      throw error;
    }
  }

  public getMultipleLoans = createAsyncThunk(
    "loans/getallLoans",
    async (
      { page = 1, limit = 10 }: { page?: number; limit?: number },
      thunkAPI
    ) => {
      try {
        const loans = await this.fetchLoans(thunkAPI, page, limit);
        return loans;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  );

  public getLoanOverviewData = createAsyncThunk(
    "loans/getLoanOverviewData",
    async (
      {
        page = 1,
        limit = 10,
      }: {
        page?: number;
        limit?: number;
      },
      thunkAPI
    ) => {
      try {
        const response = await this.fetchLoans(thunkAPI, page, limit);
        return response;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  );

  public getLoansKPIData = createAsyncThunk(
    "loans/getLoansKPIData",
    async (
      {
        page = 1,
        limit = 10,
      }: {
        page?: number;
        limit?: number;
      },
      thunkAPI
    ) => {
      try {
        const response = await this.fetchLoans(thunkAPI, page, limit);

        if(!response) throw new Error("No loan data available")

        const loan = response;

        const totalLoans = loan.filter((l: any) => l.status !== 'rejected');
        const totalLoansAmount = totalLoans.reduce(
          (acc: number, l: any) =>
            acc + (isNaN(Number.parseFloat(l.repayment_amount)) ? 0 : Number(l.repayment_amount)),
          0
        );
        const totalLoansCount = totalLoans.length;

        const pendingLoans = loan.filter((l: any) => l.status === "pending");
        const pendingLoansAmount = pendingLoans.reduce(
          (acc: number, l: any) =>
            acc + (isNaN(Number.parseFloat(l.repayment_amount)) ? 0 : Number(l.repayment_amount)),
          0
        );
        const pendingLoansCount = pendingLoans.length;

        const activeLoans = loan.filter((l: any) => {
          const repaymentDate = new Date(l.repayment_date).setHours(0, 0, 0, 0);
          const today = new Date().setHours(0, 0, 0, 0);
          const oneDayInMs = 1000 * 60 * 60 * 24;
          return repaymentDate >= today &&
                 repaymentDate <= (today + oneDayInMs) &&
                 l.status === "accepted" && 
                 l.loan_payment_status !== 'complete';
        });
        const activeLoansAmount = activeLoans.reduce(
          (acc: number, l: any) =>
            acc + (isNaN(Number.parseFloat(l.outstanding)) ? 0 : Number(l.outstanding)),
          0
        );
        const activeLoansCount = activeLoans.length;

        const repaidLoans = loan.filter((l: any) => l.loan_payment_status === "complete" || l.repayment_history?.length > 0);
        const repaidLoansAmount = repaidLoans.reduce((acc: number, loan: any) => {
          const historyTotal = loan.repayment_history?.reduce((historyAcc: number, payment: any) => 
            historyAcc + (isNaN(Number.parseFloat(payment.amount)) ? 0 : Number(payment.amount)), 0) || 0;
          return acc + historyTotal;
        }, 0);
        const repaidLoansCount = repaidLoans.length;

        const disbursedLoans = loan.filter((l: any) => l.status === "accepted");
        const disbursedLoansAmount = disbursedLoans.reduce(
          (acc: number, l: any) =>
            acc + (isNaN(Number.parseFloat(l.amount)) ? 0 : Number(l.amount)),
          0
        );
        const disbursedLoansCount = disbursedLoans.length;

        function calculateDaysOverdue(repaymentDateStr: string, currentDateStr: string): number | null {
          // Convert the date strings to Date objects
          const repaymentDate = new Date(repaymentDateStr);
          const currentDate = new Date(currentDateStr);
          
          if (repaymentDate < currentDate) {
            const diffInTime = currentDate.getTime() - repaymentDate.getTime();
            const diffInDays = diffInTime / (1000 * 60 * 60 * 24);
            return Math.floor(diffInDays);
          }
          
          return null;
        }

        let loansRevenue = 0

        const ltest = loan.map(l => {
          if(l.loan_payment_status === 'complete'){
            const days = calculateDaysOverdue(l.repayment_date, l.repayment_history[l.repayment_history.length - 1].date)
            const daysOverdue = days? ((days) * l.amount) / 100 : 0;
            const outstanding = l.category == "personal"? ((l.amount * 10) / 100) + 500 + daysOverdue : ((l.amount * 4) / 100) + 500 + daysOverdue;

            console.log({ outstanding });

            loansRevenue = loansRevenue + outstanding;
          }
        })

        console.log({ ltest });
        
        const dueLoans = loan.filter((l: any) => {
          const repaymentDate = new Date(l.repayment_date).setHours(0, 0, 0, 0);
          const now = new Date().setHours(0, 0, 0, 0);
          return repaymentDate === now &&
                 l.status === "accepted" && 
                 Number(l.outstanding) > 0;
        });
        const dueLoansAmount = dueLoans.reduce(
          (acc: number, l: any) =>
            acc + (isNaN(Number.parseFloat(l.outstanding)) ? 0 : Number(l.outstanding)),
          0
        );
        const dueLoansCount = dueLoans.length;

        const overdueLoans = loan.filter((l: any) => {
          const repaymentDate = new Date(l.repayment_date).setHours(0, 0, 0, 0);
          const now = new Date().setHours(0, 0, 0, 0);
          // const oneDayInMs = 1000 * 60 * 60 * 24;
          return repaymentDate < now &&
                 l.status === "accepted" && 
                 Number(l.outstanding) > 0;
        });
        const overdueLoansAmount = overdueLoans.reduce(
          (acc: number, l: any) =>
            acc + (isNaN(Number.parseFloat(l.outstanding)) ? 0 : Number(l.outstanding)),
          0
        );
        const overdueLoansCount = overdueLoans.length;
        console.log({overdueLoans, overdueLoansAmount})

        return {
          loansRevenue,

          totalLoansCount,
          totalLoansAmount,

          pendingLoansCount,
          pendingLoansAmount,

          activeLoansCount,
          activeLoansAmount,

          repaidLoansCount,
          repaidLoansAmount,

          dueLoansCount,
          dueLoansAmount,

          overdueLoansCount,
          overdueLoansAmount,

          disbursedLoansAmount,
          disbursedLoansCount,

        }
      } catch (error) {
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  );

  public getLoansCreditScoreData = createAsyncThunk(
    "loans/getLoansCreditScoreData",
    async (
      {
        loanId,
      }: {
        loanId: string;
      },
      thunkAPI
    ) => {
      try {
        const response = await httpClient({
          method: "POST",
          url: `/api/loans/loan-transaction-status`,
          isAuth: true,
          data: { transactionId: `${loanId}` },
        });

        // Ensure 'data' is not null before accessing it
        if (!response || !response.data) return thunkAPI.rejectWithValue("No loan data available");

        const creditScoredata = response?.data?.credit_score || {};
        return {
          loanId: creditScoredata?.loanId || "",
          lastReported: creditScoredata?.lastReported || "",
          creditorName: creditScoredata?.creditorName || "",
          totalDebt: creditScoredata?.totalDebt || "",
          accountype: creditScoredata?.accountype || "",
          outstandingBalance: creditScoredata?.outstandingBalance || "",
          activeLoan: creditScoredata?.activeLoan || "",
          loansTaken: creditScoredata?.loansTaken || "",
          income: creditScoredata?.income || "",
          repaymentHistory: creditScoredata?.repaymentHistory || "",
          openedDate: creditScoredata?.openedDate || "",
          lengthOfCreditHistory: creditScoredata?.lengthOfCreditHistory || "",
          remarks: creditScoredata?.remarks || "",
          userId: creditScoredata?.userId || "",
        };
      } catch (error) {
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  );

  public approveLoan = createAsyncThunk( 
    "loans/approveLoan",
    async (
      {
        loanId,
        userId,
        amount,
        duration,
      }: {
        amount: number;
        loanId: string;
        userId: string;
        duration: number;
      },
      thunkAPI
    ) => {
      try {
        const response = await httpClient({
          method: "POST",
          url: `/api/loans/create-and-disburse-loan`,
          isAuth: true,
          data: {
            userId,
            duration: duration,
            transactionId: loanId,
            amount: String(amount),
          }
        });

        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  );

  public declineLoan = createAsyncThunk(
    "loans/declineLoan",
    async (
      {
        loanId,
        amount,
      }: {
        loanId: string;
        amount: number;
        duration?: number;
      },
      thunkAPI
    ) => {
      try {
        const response = await httpClient({
          method: "POST",
          url: `/api/loans/reject-loan`,
          isAuth: true,
          data: { 
            transactionId: loanId,
            amount,
            duration: 30 
          },
        });
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  );
}