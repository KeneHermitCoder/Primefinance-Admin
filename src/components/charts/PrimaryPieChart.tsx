import * as React from "react";
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";

export default function PrimaryPieChart({
  data,
}: {
  data: {
    label: string;
    value: number;
  }[];
}) {
  const [skipAnimation] = React.useState(false);

  const providedChartDataValuesSum = data.reduce(
    (acc: number, v: { value: number }) => acc + v.value,
    0
  );

  const aggregatedChartData = [
    ...data.map((v: { value: number; label: string }) => ({
      ...v,
      value: ((v: number, v2: number) => {
        return Number.parseFloat(((v * v2) / 100).toFixed(2));
      })(v.value, providedChartDataValuesSum),
    })),
  ];

  const valueFormatter = (item: { value: number }) => `${item.value}%`;

  return (
    <Box sx={{ width: "100%" }}>
      <PieChart
        margin={{ bottom: 90, right: 90, left: 90 }}
        slotProps={{
          legend: {
            direction: "column",
            position: { vertical: "bottom", horizontal: "left" },
            padding: { top: 20 },
          },
        }}
        height={400}
        series={[
          {
            data: aggregatedChartData,
            innerRadius: 50,
            arcLabel: (params: any) => params.label ?? "",
            arcLabelMinAngle: 20,
            valueFormatter,
          },
        ]}
        skipAnimation={skipAnimation}
      />
    </Box>
  );
}
