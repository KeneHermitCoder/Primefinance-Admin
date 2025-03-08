export default function loanStatusHandler(loan: any) {
    return {
      // due: (loan: any) => {
      //   const repaymentDate = new Date(loan.repayment_date).getTime();
      //   const now = new Date().getTime();
      //   const oneDayInMs = 1000 * 60 * 60 * 24;

      //   return repaymentDate < now + oneDayInMs && 
      //          repaymentDate > now && 
      //          loan.status === "accepted" && 
      //          loan.loan_payment_status !== 'complete';
      // },
      // active: (loan: any) => new Date(loan.repayment_date).getTime() > new Date().getTime() && loan.status === "accepted" && loan.loan_payment_status !== 'in-progress',
      active: () => {
        const repaymentDate = new Date(loan.repayment_date).setHours(23, 59, 59, 999);
        const today = new Date().setHours(23, 59, 59, 999);
        const oneDayInMs = 1000 * 60 * 60 * 24 * 2;
        return repaymentDate >= today &&
               repaymentDate < (today + oneDayInMs) &&
               loan.status === "accepted" && 
               loan.loan_payment_status !== 'complete';
      },
      overdue: () => {
        const repaymentDate = new Date(loan.repayment_date).setHours(23, 59, 59, 999);
        const now = new Date().setHours(23, 59, 59, 999);
        const twoDaysInMs = 1000 * 60 * 60 * 24 * 2;
        return repaymentDate > (now + twoDaysInMs) &&
               loan.status === "accepted" && 
               loan.loan_payment_status !== 'complete';
      },
      complete: () => loan.status === "accepted" && loan.loan_payment_status === 'complete',
      accepted: () => loan.status === "accepted",
      rejected: () => loan.status === "rejected",
      pending: () => loan.status === 'pending',
    }
}