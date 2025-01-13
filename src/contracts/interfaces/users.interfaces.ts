import { IResponseState } from "./common.interfaces";

interface IUserOverview {
    data: {
        id: string;
        first_name: string;
        last_name: string;
        last_login: string;
        email: string;
        status: string;
        created_at: string;
    }[];
    page?: number;
    limit?: number;
}

export interface IUserSliceState {
    allUsersData: IResponseState<any[]>;
    userKPIData: IResponseState<{
        newUsersCount: number;
        totalUsersCount: number;
        activeUsersCount: number;
        flaggedUsersCount: number;
    }>;
    userOverviewData: IResponseState<any[]> & IUserOverview;
}