export interface IResponseState<T> {
    data: T;
    success: boolean;
    isLoading: boolean;
    error: string | null;
}