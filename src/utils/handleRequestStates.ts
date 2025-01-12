export const handleRejectedState = (target: string) => (state: any, action: any) => {
    state[target].isLoading = false;
    state[target].success = false;
    // state.loanOverviewData.error = action.error.message || null;
    state[target].error = (action.payload as any)?.statusText || null;
}

export const handleFulfilledState = <T>(target: string) => (state: any, action: any) => {
    state[target].isLoading = false;
    state[target].success = true;
    state[target].error = null;
    state[target].data = <T>action.payload;
}

export const handlePendingState = (target: string) => (state: any) => {
    state[target].isLoading = true;
    state[target].success = false;
    state[target].error = null;
}