import { PrimaryPieChart, } from "./charts";

export default function LoanPieChart() {
  return (
    <PrimaryPieChart
      data={[
        {
          label: "Windows",
          value: 72.72,
        },
        {
          label: "OS X",
          value: 16.38,
        },
      ]}
    />
  );
}
