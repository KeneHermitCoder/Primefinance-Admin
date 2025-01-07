import { Stack } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

const data = [2400, 1398, 9800, 3908];
const xLabels = ["Active", "Repaid", "Overdue", "Pending"];

export default function PrimaryBarChart({
  id = "primaryBarChart",
  title = "Transaction",
}: {
  id?: string;
  title?: string;
}) {
  return (
    <Stack width={"100%"}>
      <Stack>
        {title && <h3 className="text-xl">{title}</h3>}
      </Stack>
      <BarChart
        // width={500}
        height={350}
        xAxis={[
          {
            id,
            data: xLabels,
            scaleType: "band",
          },
        ]}
        series={[
          {
            data,
          },
        ]}
      />
    </Stack>
  );
}
