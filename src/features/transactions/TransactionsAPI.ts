import { createAsyncThunk } from "@reduxjs/toolkit";
import { handleError, httpClient } from "../../utils";

interface Transaction {
  _id: string;
  amount: number;
  status: 'failed' | 'active' | 'success';
  type: string;
  createdAt: string;
}

interface ChartData {
  labels: string[];
  series: Array<{
    data: number[];
    label: string;
  }>;
}

interface KPIData {
  totalTranxCount: number;
  failedTranxCount: number;
  pendingTranxCount: number;
  totalTransactions: number;
  failedTransactions: number;
  pendingTransactions: number;
  successfulTranxCount: number;
  transactionsWithoutLoan: number;
  successfulTransactions: number;
}

type TimeRange = '24hrs' | '7days' | '1month' | '1year';

export default class TransactionsAPI {
  private async fetchTransactions(): Promise<Transaction[]> {
    const response = await httpClient({
      method: "GET",
      url: "/api/data/all-transactions",
      data: {},
      isAuth: true,
    });

    const transactions = response.data;

    if (!transactions) {
      throw new Error("No transaction data available");
    }

    return Array.isArray(transactions) ? transactions : [transactions];
  }

  private getFilteredTransactionsByDate(transactions: Transaction[], timeRange: TimeRange): Transaction[] {
    const now = new Date();
    const startDate = new Date(now.getTime());

    switch(timeRange) {
      case '24hrs':
        startDate.setHours(now.getHours() - 12); // Changed to 12 hours
        break;
      case '7days':
        startDate.setDate(now.getDate() - 7);
        break;
      case '1month':
        startDate.setDate(now.getDate() - 30);
        break;
      case '1year':
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate.setDate(now.getDate() - 7);
    }

    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.createdAt);
      return transactionDate >= startDate && transactionDate <= now;
    });
  }

  private prepareChartData(transactions: Transaction[]): ChartData {
    const now = new Date();
    const timeSpan = transactions.length > 0 
      ? now.getTime() - new Date(transactions[0].createdAt).getTime()
      : 0;
    const daysSpan = timeSpan / (1000 * 60 * 60 * 24);

    const groupedByDate = transactions.reduce((acc: Record<string, { deposits: number; withdrawals: number }>, transaction) => {
      if (!transaction.createdAt) return acc;
      
      const transactionDate = new Date(transaction.createdAt);
      let dateStr;

      if (daysSpan <= 1) {
        // For 12hrs - 6 two-hour ranges
        const hour = transactionDate.getHours();
        const rangeIndex = Math.floor(hour / 2);
        const startHour = rangeIndex * 2;
        const endHour = startHour + 2;
        dateStr = `${startHour.toString().padStart(2, '0')}:00-${endHour.toString().padStart(2, '0')}:00`;
      } else if (daysSpan <= 7) {
        // For 7 days - daily ranges
        dateStr = transactionDate.toISOString().split('T')[0];
      } else if (daysSpan <= 30) {
        // For 1 month - 15 two-day ranges
        const day = transactionDate.getDate();
        const rangeIndex = Math.floor((day - 1) / 2);
        const startDay = (rangeIndex * 2) + 1;
        const endDay = Math.min(startDay + 1, 30);
        dateStr = `${startDay}-${endDay}`;
      } else {
        // For 1 year - 12 monthly ranges
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[transactionDate.getMonth()];
        const year = transactionDate.getFullYear();
        dateStr = `${month} ${year}`;
      }

      if (!acc[dateStr]) {
        acc[dateStr] = {
          deposits: 0,
          withdrawals: 0
        };
      }
      
      const amount = Number(transaction.amount) || 0;
      
      if (transaction.type !== 'transfer' && transaction.status === 'success') {
        acc[dateStr].deposits += amount;
      }
      if (transaction.type === 'transfer' && transaction.status === 'success') {
        acc[dateStr].withdrawals += amount;
      }
      return acc;
    }, {});

    const dates = Object.keys(groupedByDate).sort((a, b) => {
      if (daysSpan <= 1) {
        // Sort 2-hour ranges
        return parseInt(a.split(':')[0]) - parseInt(b.split(':')[0]);
      } else if (daysSpan <= 7) {
        // Sort daily dates
        return new Date(a).getTime() - new Date(b).getTime();
      } else if (daysSpan <= 30) {
        // Sort 2-day ranges
        return parseInt(a.split('-')[0]) - parseInt(b.split('-')[0]);
      } else {
        // Sort monthly dates
        const [monthA, yearA] = a.split(' ');
        const [monthB, yearB] = b.split(' ');
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthIndexA = monthNames.indexOf(monthA);
        const monthIndexB = monthNames.indexOf(monthB);
        const yearDiff = parseInt(yearA) - parseInt(yearB);
        return yearDiff === 0 ? monthIndexA - monthIndexB : yearDiff;
      }
    });
    
    return {
      labels: dates,
      series: [
        { data: dates.map(date => groupedByDate[date].deposits), label: "Deposits" },
        { data: dates.map(date => groupedByDate[date].withdrawals), label: "Withdrawals" }
      ]
    };
  }

  public getMultipleTransactions = createAsyncThunk(
    "transactions/getallTransactions",
    async (_, thunkAPI) => {
      try {
        return await this.fetchTransactions();
      } catch (error) {
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  );

  public getTransactionOverviewData = createAsyncThunk(
    "transactions/getTransactionOverviewData",
    async (_, thunkAPI) => {
      try {
        return await this.fetchTransactions();
      } catch (error) {
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  );

  public getTransactionsKPIData = createAsyncThunk(
    "transactions/getTransactionsKPIData",
    async (_, thunkAPI) => {
      try {
        const transactions = await this.fetchTransactions();
        
        const successfulTransactions = transactions.filter(t => t.status === "success");
        
        const calculateTotal = (trans: Transaction[], predicate: (t: Transaction) => boolean) => 
          trans.reduce((acc, t) => acc + (predicate(t) ? Number(t.amount) || 0 : 0), 0);

        const kpiData: KPIData = {
          totalTranxCount: transactions.length,
          failedTranxCount: transactions.filter(t => t.status === "failed").length,
          pendingTranxCount: transactions.filter(t => t.status === "active").length,
          totalTransactions: calculateTotal(transactions, () => true),
          failedTransactions: calculateTotal(transactions, t => t.status === "failed"),
          pendingTransactions: calculateTotal(transactions, t => t.status === "active"),
          successfulTranxCount: calculateTotal(successfulTransactions, () => true),
          transactionsWithoutLoan: calculateTotal(successfulTransactions, t => t.type !== 'loan'),
          successfulTransactions: successfulTransactions.length,
        };

        return kpiData;
      } catch (error) {
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  );

  public getTransactionChartData = createAsyncThunk(
    "transactions/getTransactionChartData",
    async (timeRange: TimeRange = '7days', thunkAPI) => {
      try {
        const transactions = await this.fetchTransactions();
        const filteredTransactions = this.getFilteredTransactionsByDate(transactions, timeRange);
        return this.prepareChartData(filteredTransactions);
      } catch (error) {
        return thunkAPI.rejectWithValue(handleError(error));
      }
    }
  );
}