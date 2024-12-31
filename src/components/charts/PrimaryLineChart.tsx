import { Stack } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

export default function ({ title = "Transaction" }: { title?: string }) {
  return (
    <Stack width={"100%"}>
      <Stack direction="row" justifyContent={"space-between"}>
        {title && <h3 className="text-xl">{title}</h3>}
        <div className="flex gap-2 text-sm">
          <span className="text-gray-400 cursor-pointer hover:text-gray-700 font-semibold">24hrs</span>
          <span className="text-gray-400 cursor-pointer hover:text-gray-700 font-semibold">7days</span>
          <span className="text-gray-400 cursor-pointer hover:text-gray-700 font-semibold">1month</span>
          <span className="text-gray-400 cursor-pointer hover:text-gray-700 font-semibold">1year</span>
        </div>
      </Stack>
      <LineChart
        width={650}
        height={400}
        series={[
          { data: pData, label: "Deposit" },
          { data: uData, label: "Withdrawal" },
        ]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
      />
    </Stack>
  );
}
