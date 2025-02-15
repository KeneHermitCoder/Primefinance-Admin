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
    allAdminsData: IResponseState<any[]>;
    adminKPIData: IResponseState<{
        newAdminsCount: number;
        totalAdminsCount: number;
        activeAdminsCount: number;
        inactiveAdminsCount: number;
    }>;
    adminOverviewData: IResponseState<any[]> & IUserOverview;
    allUsersData: IResponseState<any[]>;
    userKPIData: IResponseState<{
        newUsersCount: number;
        totalUsersCount: number;
        activeUsersCount: number;
        suspendedUsersCount: number;
    }>;
    userOverviewData: IResponseState<any[]> & IUserOverview;
    userUpdateData: IResponseState<{
        updatingId: string | null;
    }>
}