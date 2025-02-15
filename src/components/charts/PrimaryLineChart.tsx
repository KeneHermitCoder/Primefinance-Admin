import { Stack } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features";
import { TransactionsAPI } from "../../features/transactions";
import { useEffect, useState } from "react";

export default function ({
  title = "Transaction",
}: {
  title?: string;
}) {
  const dispatch = useDispatch();
  const [activeTimeRange, setActiveTimeRange] = useState<'24hrs' | '7days' | '1month' | '1year'>('7days');
  const { transactionChartData } = useSelector((state: RootState) => state.transactions);

  useEffect(() => {
    // @ts-ignore
    dispatch(new TransactionsAPI().getTransactionChartData('7days'));
  }, [dispatch]);

  const handleTimeRangeClick = (timeRange: '24hrs' | '7days' | '1month' | '1year') => {
    setActiveTimeRange(timeRange);
    // @ts-ignore
    dispatch(new TransactionsAPI().getTransactionChartData(timeRange));
  };

  return (
    <Stack width={"100%"}>
      <Stack direction="row" justifyContent={"space-between"}>
        {title && <h3 className="text-xl">{title}</h3>}
        <div className="flex gap-2 text-sm">
          <span 
            onClick={() => handleTimeRangeClick('24hrs')}
            className={`cursor-pointer font-semibold ${
              activeTimeRange === '24hrs' ? 'text-gray-700' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            24hrs
          </span>
          <span 
            onClick={() => handleTimeRangeClick('7days')}
            className={`cursor-pointer font-semibold ${
              activeTimeRange === '7days' ? 'text-gray-700' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            7days
          </span>
          <span 
            onClick={() => handleTimeRangeClick('1month')}
            className={`cursor-pointer font-semibold ${
              activeTimeRange === '1month' ? 'text-gray-700' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            1month
          </span>
          <span 
            onClick={() => handleTimeRangeClick('1year')}
            className={`cursor-pointer font-semibold ${
              activeTimeRange === '1year' ? 'text-gray-700' : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            1year
          </span>
        </div>
      </Stack>
      <LineChart
        height={400}
        series={transactionChartData.data.series}
        xAxis={[{ scaleType: "point", data: transactionChartData.data.labels }]}
        yAxis={[{ scaleType: "linear" }]}
      />
    </Stack>
  );
}
