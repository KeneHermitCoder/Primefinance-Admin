// import { Divider, Stack } from "@mui/material";
import { Stack } from "@mui/material";
import { Reveal, SearchFilterSortPaginateTable } from "../../components";
import BillPaymentKPIDisplay from "../../components/billPaymentKPITop";
import PaymentsIcon from "@mui/icons-material/Payments";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FlagIcon from "@mui/icons-material/Flag";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import BillsKPIDisplay from "../../components/billsKPI";
import {
  AttachMoney,
  CardGiftcard,
  ElectricalServices,
  Subscriptions,
} from "@mui/icons-material";
// import EnhancedTable from "../../components/EnhancedTable";
// import TransactionOverview from "../../components/TransactionOverviewHeader";
import { tableFilterAction } from "../../utils";

export default function Bills() {
  // dummy data
  // const billsKPIData = [
  //   {
  //     Name: "John Doe",
  //     TransactionID: "1",
  //     Amount: "2000",
  //     Type: "Airtime",
  //     Date: "2024-12-01",
  //     Status: "Failed",
  //   },
  //   {
  //     Name: "Jane Smith",
  //     TransactionID: "2",
  //     Amount: "3000",
  //     Type: "GiftCard",
  //     Date: "2024-11-25",
  //     Status: "completed",
  //   },
  //   {
  //     Name: "Sam Green",
  //     TransactionID: "3",
  //     Amount: "4000",
  //     Type: "Subscription",
  //     Date: "2024-12-01",
  //     Status: "pending",
  //   },
  //   {
  //     Name: "Alice Brown",
  //     TransactionID: "4",
  //     Amount: "5000",
  //     Type: "Electricity",
  //     Date: "2024-11-30",
  //     Status: "completed",
  //   },
  // ];

  // const columns = [
  //   { label: "Name", field: "Name", sortable: true },
  //   { label: "Transaction ID", field: "TransactionID", sortable: true },
  //   { label: "Amount", field: "Amount", sortable: false },
  //   { label: "Type", field: "Type", sortable: false },
  //   { label: "Date", field: "Date", sortable: true },

  //   {
  //     label: "Status",
  //     field: "Status",
  //     sortable: false,
  //     render: (value: string) => (
  //       <span style={{ color: value === "Active" ? "green" : "red" }}>
  //         {value}
  //       </span>
  //     ),
  //   },
  //   { label: "Actions", field: "Actions", sortable: false },
  // ];

  return (
    <>
      <Reveal>
        <Stack direction="column" spacing={3} paddingX={1} paddingY={1}>
          {/* Top KPI  */}
          {/* <Stack direction="row" spacing={2}> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Total Payments */}
            <BillPaymentKPIDisplay
              title="Total Payments"
              kpiIcon={
                <PaymentsIcon style={{ fontSize: 32, color: "#4caf50" }} />
              }
              total="15,345"
              backgroundColour="lightgreen"
            />

            {/* Total Bill Revenue */}
            <BillPaymentKPIDisplay
              title="Total Bill Revenue"
              kpiIcon={
                <MonetizationOnIcon
                  style={{ fontSize: 32, color: "#1976d2" }}
                />
              }
              total="$100,876"
              backgroundColour="#fff"
            />

            {/* Flagged Accounts */}
            <BillPaymentKPIDisplay
              title="Flagged Accounts"
              kpiIcon={<FlagIcon style={{ fontSize: 32, color: "#f44336" }} />}
              total="150"
              backgroundColour="lightblue"
            />

            {/* Pending Transactions */}
            <BillPaymentKPIDisplay
              title="Pending Transactions"
              kpiIcon={
                <PendingActionsIcon
                  style={{ fontSize: 32, color: "#ff9800" }}
                />
              }
              total="230"
              backgroundColour="#fff8e1"
            />
          </div>
          {/* </Stack> */}

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:divide-x-2 divide-y-2 lg:divide-y-0"> */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:divide-x-2 divide-y-2 lg:divide-y-0">
            {/* sub KPI  */}
            <BillsKPIDisplay
              subtitle="Airtime & Internet"
              total="12,345"
              kpiIcon={<AttachMoney sx={{ color: "success.main" }} />}
            />

            <BillsKPIDisplay
              subtitle="Tv subscription"
              total="9,876"
              kpiIcon={<Subscriptions sx={{ color: "primary.main" }} />}
            />

            <BillsKPIDisplay
              subtitle="Gift Cards"
              total="150,00"
              kpiIcon={<CardGiftcard sx={{ color: "error.main" }} />}
            />

            <BillsKPIDisplay
              subtitle="Electricity"
              total="23,000"
              kpiIcon={<ElectricalServices sx={{ color: "warning.main" }} />}
            />
          </div>

          {/* Data Table  */}
          {/* user table */}
          <Stack
            spacing={1}
            justifyContent="space-between"
            className="bg-white p-4 rounded-[12px]"
          >
            <SearchFilterSortPaginateTable
              title="Bills Table"
              searchParams={["name", "transactionId", "status"]}
              filterParams={{
                data: [
                  {
                    label: "Date",
                    options: ["Today", "This Week", "This Month", "This Year"],
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
              rows={[
                {
                  name: "Kene Nnakwue",
                  transactionId: "LN12345",
                  amount: "₦2,000",
                  type: "airtime",
                  date: "10/01/2025",
                  status: "completed",
                  metadata: {
                    itemPhoto:
                      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
                  },
                },
                {
                  name: "Chris Obi",
                  transactionId: "LN12346",
                  amount: "₦10,000",
                  type: "tv",
                  date: "10/12/2025",
                  status: "failed",
                  metadata: {
                    itemPhoto:
                      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
                  },
                },
                {
                  name: "Chinwe Okafor",
                  transactionId: "LN12347",
                  amount: "₦5,000",
                  type: "electricity",
                  date: "10/01/2024",
                  status: "pending",
                  metadata: {
                    itemPhoto:
                      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
                  },
                },
              ]}
            />
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
