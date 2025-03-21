const loanStatusHandler = (loan: any) => ({
  due: () => {
    const repaymentDate = new Date(loan.repayment_date).setHours(0, 0, 0, 0);
    return (
      repaymentDate === new Date().setHours(0, 0, 0, 0) &&
      loan.status === "accepted" &&
      loan.loan_payment_status !== "complete"
    );
  },
  overdue: () => {
    // const repaymentDate = new Date(loan.repayment_date).setHours(23, 59, 59, 999);
    // const now = new Date().setHours(23, 59, 59, 999);
    const repaymentDate = new Date(loan.repayment_date).setHours(0, 0, 0, 0);
    const now = new Date().setHours(0, 0, 0, 0);
    const twoDaysInMs = 1000 * 60 * 60 * 24 * 1;
    return (
      repaymentDate < now + twoDaysInMs &&
      loan.status === "accepted" &&
      loan.loan_payment_status !== "complete" &&
      Number(loan.outstanding) > 0
    );
  },
  // active: (loan: any) => new Date(loan.repayment_date).getTime() > new Date().getTime() && loan.status === "accepted" && loan.loan_payment_status !== 'in-progress',
  // active: () => {
  //   // const repaymentDate = new Date(loan.repayment_date).setHours(23, 59, 59, 999);
  //   const repaymentDate = new Date(loan.repayment_date).setHours(0, 0, 0, 0);
  //   // const today = new Date().setHours(23, 59, 59, 999);
  //   const today = new Date().setHours(0, 0, 0, 0);
  //   // const oneDayInMs = 1000 * 60 * 60 * 24 * 2;
  //   const oneDayInMs = 1000 * 60 * 60 * 24 * 1;
  //   return repaymentDate >= today &&
  //          repaymentDate < (today + oneDayInMs) &&
  //          loan.status === "accepted" &&
  //          loan.loan_payment_status !== 'complete';
  // },
  active: () => {
    const repaymentDate = new Date(loan.repayment_date).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);
    return (
      repaymentDate > (today - 1000) &&
      loan.status === "accepted" &&
      loan.loan_payment_status !== "complete"
    );
  },
  // due: (loan: any) => {
  //   const repaymentDate = new Date(loan.repayment_date).getTime();
  //   const now = new Date().getTime();
  //   const oneDayInMs = 1000 * 60 * 60 * 24;

  //   return repaymentDate < now + oneDayInMs &&
  //          repaymentDate > now &&
  //          loan.status === "accepted" &&
  //          loan.loan_payment_status !== 'complete';
  // },
  complete: () =>
    loan.status === "accepted" && loan.loan_payment_status === "complete",
  accepted: () => {
    const repaymentDate = new Date(loan.repayment_date).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);
    return (
      loan.status === "accepted" &&
      loan.loan_payment_status === "not-started" &&
      repaymentDate >= today
    );
  },
  rejected: () => loan.status === "rejected",
  pending: () => loan.status === "pending",
});


export default loanStatusHandler;