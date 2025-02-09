import { Stack } from "@mui/material";
import { formatNumberToMultipleCommas, tableFilterAction } from "../../utils";
import UsersKPIDisplay from "../../components/usersKPI";
import {
  Reveal,
  PrimaryPieChart,
  PrimaryLineChart,
  KPILoadingSkeleton,
  PrimaryTableSkeleton,
  SearchFilterSortPaginateTable,
} from "../../components";
import {
  PersonAdd,
  AttachMoney,
  HandshakeRounded,
  FlagCircleRounded,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features";
import { TransactionsAPI } from "../../features/transactions";

export default function Transactions() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState<{ [key: string]: any }[]>([]);

  const { transactionKPIData, transactionOverviewData } = useSelector(
    (state: RootState) => state.transactions
  );

  useEffect(() => {
    // Fetch transactions when the component mounts
    // @ts-ignore
    dispatch(new TransactionsAPI().getTransactionOverviewData());
    // @ts-ignore
    dispatch(new TransactionsAPI().getTransactionsKPIData());
  }, [dispatch]);

  useEffect(() => {
    if (transactionOverviewData.data.length > 0) {
      const modifiedTransactionData = transactionOverviewData.data.map(
        (transaction: any) => ({
          name: `${transaction.name}`,
          transactionId: transaction._id,
          // type: transaction.type,
          type: transaction.category,
          amount: `₦${transaction.amount}`,
          date: transaction.createdAt,
          status: transaction.status,
          metadata: {
            itemPhoto:
              "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
          },
        })
      );
      setRows(modifiedTransactionData);
      console.log(modifiedTransactionData);
    }
  }, [transactionOverviewData.data, setRows]);

  return (
    <Reveal>
      <Stack direction="column" spacing={3} paddingX={1} paddingY={1}>
        {transactionKPIData.isLoading ? (
          <KPILoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:divide-x-2 divide-y-2 lg:divide-y-0">
            <UsersKPIDisplay
              subtitle="Total Transactions"
              kpiIcon={<AttachMoney sx={{ color: "success.main" }} />}
              total={`${formatNumberToMultipleCommas(transactionKPIData.data.totalTranxCount)}`}
            />

            <UsersKPIDisplay
              subtitle="Successful Transactions"
              kpiIcon={<HandshakeRounded sx={{ color: "primary.main" }} />}
              total={`${formatNumberToMultipleCommas(transactionKPIData.data.successfulTranxCount)}`}
            />

            <UsersKPIDisplay
              subtitle="Failed Transactions"
              kpiIcon={<FlagCircleRounded sx={{ color: "error.main" }} />}
              total={`${formatNumberToMultipleCommas(transactionKPIData.data.failedTranxCount)}`}
            />

            <UsersKPIDisplay
              subtitle="Total Amount Processed"
              kpiIcon={<PersonAdd sx={{ color: "primary.main" }} />}
              total={`₦${formatNumberToMultipleCommas(transactionKPIData.data.totalTransactions)}`}
            />
          </div>
        )}

        <Stack
          spacing={1}
          justifyContent="space-between"
          className="bg-white p-4 rounded-[12px]"
        >
          {transactionOverviewData.isLoading || transactionOverviewData.data?.length < 1 ? (
            <PrimaryTableSkeleton />
          ) : (
            <SearchFilterSortPaginateTable
              title="Transaction Overview"
              searchParams={["name", "transactionId", "status"]}
              filterParams={{
                data: [
                  {
                    label: "Date",
                    options: ["Today", "This Week", "This Month", "This Year"],
                  },
                  {
                    label: "Type",
                    options: ["loan", "paybills", "transfer"],
                  },
                  {
                    label: "Status",
                    options: ["active", "success", "failed"],
                  },
                ],
                action: tableFilterAction,
              }}
              headCells={[
                {
                  id: "name",
                  numeric: false,
                  label: "Name",
                },
                {
                  id: "transactionId",
                  numeric: true,
                  label: "Transaction Id",
                },
                {
                  id: "amount",
                  numeric: true,
                  label: "Amount",
                },
                {
                  id: "type",
                  numeric: true,
                  label: "Type",
                },
                {
                  id: "date",
                  numeric: false,
                  label: "Date",
                },
                {
                  id: "status",
                  numeric: false,
                  label: "Status",
                },
                {
                  id: "actions",
                  numeric: false,
                  label: "Actions",
                },
              ]}
              rows={rows}
            />
          )}
        </Stack>

        <div className="flex flex-col md:flex-row gap-6">
          <Stack
            spacing={1}
            justifyContent="space-between"
            className="w-full md:w-3/5 bg-white p-4 rounded-[12px] self-start"
          >
            <PrimaryLineChart
              title="Transactions"
            />
          </Stack>
          <Stack
            spacing={1}
            className="w-full md:w-2/5 bg-white p-4 rounded-[12px]"
          >
            <PrimaryPieChart
              title="Transaction"
              data={[
                {
                  label: "Failed",
                  value: transactionKPIData.isLoading ? 0 : transactionKPIData.data.failedTransactions,
                },
                {
                  label: "Pending",
                  value: transactionKPIData.isLoading ? 0 : transactionKPIData.data.pendingTransactions,
                },
                {
                  label: "Successfull",
                  value: transactionKPIData.isLoading ? 0 : transactionKPIData.data.successfullTransactions,
                },
              ]}
              metadata={{
                currency: "₦",
              }}
            />
          </Stack>
        </div>
      </Stack>
    </Reveal>
  );
}