import * as React from "react";
import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";

export default function PrimaryPieChart({
  data,
  title,
  metadata,
}: {
  data: {
    label: string;
    value: number;
  }[];
  title?: string;
  metadata?: {
    currency?: string;
  };
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
        return Number.parseFloat(((v / v2) * 100).toFixed(2));
      })(v.value, providedChartDataValuesSum),
    })),
  ];

  const valueFormatter = (item: { value: number }) => `${item.value}%`;

  return (
    <Box width="100%">
      {title && <h3 className="text-xl">{title}</h3>}
      <div className="flex justify-around mt-4">
        {data.map((v) => (
          <div className="flex flex-col items-center">
            <span className="text-lg font-semibold">
              {metadata?.currency}
              {v.value}
            </span>
            <span className="text-xs">{v.label}</span>
          </div>
        ))}
      </div>
      <PieChart
        margin={{ bottom: 80, top: 20, left: 0, right: 0 }}
        slotProps={{
          legend: {
            direction: "column",
            position: { vertical: "bottom", horizontal: "left" },
            padding: { top: 250 },
          },
        }}
        height={400}
        series={[
          {
            data: aggregatedChartData,
            innerRadius: 60,
            // arcLabel: (params: any) => params.label ?? "",
            arcLabelMinAngle: 20,
            valueFormatter,
          },
        ]}
        skipAnimation={skipAnimation}
      />
    </Box>
  );
}
