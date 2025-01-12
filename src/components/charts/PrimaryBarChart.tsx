import { Stack } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect } from "react";

const rawData = [2400, 1398, 9800, 3908];
const rawXLabels = ["Active", "Repaid", "Overdue", "Pending"];

export default function PrimaryBarChart({
  data,
  xLabels,
  title = "Transaction",
  id = "primaryBarChart",
}: {
  id?: string;
  title?: string;
  data?: Array<number>;
  xLabels?: Array<string>;
  }) {

  useEffect(() => {
    console.log({ data, xLabels})
  }, [data])
  return (
    <Stack width={"100%"}>
      <Stack>{title && <h3 className="text-xl">{title}</h3>}</Stack>
      <BarChart
        // width={500}
        height={350}
        xAxis={[
          {
            id,
            data: xLabels || rawXLabels,
            scaleType: "band",
          },
        ]}
        series={[
          {
            data: data || rawData,
          },
        ]}
      />
    </Stack>
  );
}
