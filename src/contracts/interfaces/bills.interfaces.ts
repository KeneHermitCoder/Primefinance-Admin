import { IResponseState } from "./common.interfaces";

interface IBillOverview {
    data: {
        id: string;
        name: string;
        type: string;
        amount: string;
        status: string;
        category?: string;
        created_at: string;
    }[];
    page?: number;
    limit?: number;
}

export interface IBillSliceState {
    allBillsData: IResponseState<any[]>;
    billKPIData: IResponseState<{
        totalBills: number;
        totalBillsCount: number;
        otherBillsCount: number;
        failedBillsCount: number;
        pendingBillsCount: number;
        airtimeBillsCount: number;
        giftCardBillsCount: number;
        electricityBillsCount: number;
        tvSubscriptionBillsCount: number;
    }>;
    billOverviewData: IResponseState<any[]> & IBillOverview;
}