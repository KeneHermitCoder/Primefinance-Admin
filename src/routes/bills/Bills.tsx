// import { Divider, Stack } from "@mui/material";
import { Stack } from "@mui/material";
import {
  KPILoadingSkeleton,
  PrimaryTableSkeleton,
  Reveal,
  SearchFilterSortPaginateTable,
} from "../../components";
import BillPaymentKPIDisplay from "../../components/billPaymentKPITop";
import PaymentsIcon from "@mui/icons-material/Payments";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FlagIcon from "@mui/icons-material/Flag";
import BillsKPIDisplay from "../../components/billsKPI";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import {
  AttachMoney,
  CardGiftcard,
  ElectricalServices,
  Subscriptions,
} from "@mui/icons-material";
import { formatNumberToMultipleCommas, tableFilterAction } from "../../utils";
import { RootState } from "../../features";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BillsAPI } from "../../features/bills";

export default function Bills() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState<{ [key: string]: any }[]>([]);

  const { billKPIData, billOverviewData } = useSelector(
    (state: RootState) => state.bills
  );

  useEffect(() => {
    // Fetch transactions when the component mounts
    // @ts-ignore
    dispatch(new BillsAPI().getBillOverviewData({ page: 0, limit: 10 }));
    // @ts-ignore
    dispatch(new BillsAPI().getBillsKPIData());
  }, [dispatch]);

  useEffect(() => {
    if (billOverviewData.data.length > 0) {
      const modifiedBillData = billOverviewData.data.map(
        (bill: any) => ({
          name: `${bill.name}`,
          transactionId: bill.id,
          // type: bill.type,
          type: bill.category,
          amount: `₦${bill.amount}`,
          date: bill.created_at,
          status: bill.status,
          metadata: {
            itemPhoto:
              "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
          },
        })
      );
      setRows(modifiedBillData);
    }
  }, [billOverviewData.data, setRows]);

  return (
    <>
      <Reveal>
        <Stack direction="column" spacing={3} paddingX={1} paddingY={1}>
          {billKPIData.isLoading ? (
            <KPILoadingSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <BillPaymentKPIDisplay
                title="Total Payments"
                kpiIcon={
                  <PaymentsIcon style={{ fontSize: 32, color: "#4caf50" }} />
                }
                total={`${formatNumberToMultipleCommas(billKPIData.data.totalBillsCount)}`}
                backgroundColour="lightgreen"
              />

              <BillPaymentKPIDisplay
                title="Total Bill Revenue"
                kpiIcon={
                  <MonetizationOnIcon
                    style={{ fontSize: 32, color: "#1976d2" }}
                  />
                }
                total={`₦${formatNumberToMultipleCommas(billKPIData.data.totalBills)}`}
                backgroundColour="#fff"
              />

              <BillPaymentKPIDisplay
                title="Flagged Accounts"
                kpiIcon={
                  <FlagIcon style={{ fontSize: 32, color: "#f44336" }} />
                }
                total="150"
                backgroundColour="lightblue"
              />

              <BillPaymentKPIDisplay
                title="Pending Transactions"
                kpiIcon={
                  <PendingActionsIcon
                    style={{ fontSize: 32, color: "#ff9800" }}
                  />
                }
                total={`${formatNumberToMultipleCommas(billKPIData.data.pendingBillsCount)}`}
                backgroundColour="#fff8e1"
              />
            </div>
          )}

          {billKPIData.isLoading ? (
            <KPILoadingSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:divide-x-2 divide-y-2 lg:divide-y-0">
              <BillsKPIDisplay
                subtitle="Airtime & Internet"
                total={`${formatNumberToMultipleCommas(billKPIData.data.airtimeBillsCount)}`}
                kpiIcon={<AttachMoney sx={{ color: "success.main" }} />}
              />

              <BillsKPIDisplay
                subtitle="Tv subscription"
                total={`${formatNumberToMultipleCommas(billKPIData.data.tvSubscriptionBillsCount)}`}
                kpiIcon={<Subscriptions sx={{ color: "primary.main" }} />}
              />

              <BillsKPIDisplay
                subtitle="Gift Cards"
                total={`${formatNumberToMultipleCommas(billKPIData.data.giftCardBillsCount)}`}
                kpiIcon={<CardGiftcard sx={{ color: "error.main" }} />}
              />

              <BillsKPIDisplay
                subtitle="Electricity"
                total={`${formatNumberToMultipleCommas(billKPIData.data.electricityBillsCount)}`}
                kpiIcon={<ElectricalServices sx={{ color: "warning.main" }} />}
              />
            </div>
          )}

          <Stack
            spacing={1}
            justifyContent="space-between"
            className="bg-white p-4 rounded-[12px]"
          >
            {billOverviewData.isLoading ? (
              <PrimaryTableSkeleton />
            ) : (
              <SearchFilterSortPaginateTable
                title="Bills Table"
                searchParams={["name", "transactionId", "status"]}
                filterParams={{
                  data: [
                    {
                      label: "Date",
                      options: [
                        "Today",
                        "This Week",
                        "This Month",
                        "This Year",
                      ],
                    },
                    {
                      label: "Status",
                      options: ["failed", "pending", "completed"],
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
                    numeric: false,
                    label: "Transaction Id",
                  },
                  {
                    id: "amount",
                    numeric: true,
                    label: "Amount",
                  },
                  {
                    id: "type",
                    numeric: false,
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
          <Stack
            sx={{ backgroundColor: "#fff", borderRadius: 5 }}
            spacing={1}
            justifyContent="space-between"
            className=" p-4 "
          >
            {/* <TransactionOverview header="Bill Table" />
            <EnhancedTable data={billsKPIData} columns={columns} /> */}
          </Stack>
        </Stack>
      </Reveal>
    </>
  );
}
