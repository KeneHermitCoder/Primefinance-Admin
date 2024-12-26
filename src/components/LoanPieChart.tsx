import { PrimaryPieChart, } from "./charts";

export default function LoanPieChart() {
  return (
    <PrimaryPieChart
      data={[
        {
          label: "Deposit",
          value: 72.72,
        },
        {
          label: "Withdrawal",
          value: 16.38,
        },
        {
          label: "Loan Repayment",
          value: 36.38,
        },
      ]}
    />
  );
}
