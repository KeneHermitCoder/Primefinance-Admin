import { Divider, Stack } from "@mui/material";
import { Reveal, } from "../../components";
import BillPaymentKPIDisplay from "../../components/billPaymentKPITop";
import PaymentsIcon from "@mui/icons-material/Payments";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import FlagIcon from "@mui/icons-material/Flag";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import BillsKPIDisplay from "../../components/billsKPI";
import { AttachMoney, CardGiftcard, ElectricalServices,  Subscriptions } from "@mui/icons-material";
import EnhancedTable from "../../components/EnhancedTable";
import TransactionOverview from "../../components/TransactionOverviewHeader";

export default function Bills() {

// dummy data
const billsKPIData = [
  { Name: 'John Doe', TransactionID: '1', Amount: '2000', Type: 'Airtime', Date: '2024-12-01', Status: 'Failed' },
  { Name: 'Jane Smith', TransactionID: '2', Amount: '3000', Type: 'GiftCard', Date: '2024-11-25', Status: 'completed' },
  { Name: 'Sam Green', TransactionID: '3', Amount: '4000', Type: 'Subscription', Date: '2024-12-01', Status: 'pending' },
  { Name: 'Alice Brown', TransactionID: '4', Amount: '5000', Type: 'Electricity', Date: '2024-11-30', Status: 'completed' },
];

const columns = [
  { label: 'Name', field: 'Name', sortable: true },
  { label: 'Transaction ID', field: 'TransactionID', sortable: true },
  { label: 'Amount', field: 'Amount', sortable: false },
  { label: 'Type', field: 'Type', sortable: false },
  { label: 'Date', field: 'Date', sortable: true },

  { 
    label: 'Status', 
    field: 'Status', 
    sortable: false, 
    render: (value: string) => (
      <span style={{ color: value === 'Active' ? 'green' : 'red' }}>
        {value}
      </span>
    ) 
  },
  { label: 'Actions', field: 'Actions', sortable: false },
];

  return (
    <>
      <Reveal>
        <Stack direction="column" spacing={3} paddingX={1} paddingY={1}>
        {/* Top KPI  */}
        <Stack direction="row" spacing={2}>
            {/* Total Payments */}
            <BillPaymentKPIDisplay
              title="Total Payments"
              kpiIcon={<PaymentsIcon style={{ fontSize: 32, color: "#4caf50" }} />}
              total="15,345"
              backgroundColour="lightgreen"
            />

            {/* Total Bill Revenue */}
            <BillPaymentKPIDisplay
              title="Total Bill Revenue"
              kpiIcon={<MonetizationOnIcon style={{ fontSize: 32, color: "#1976d2" }} />}
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
              kpiIcon={<PendingActionsIcon style={{ fontSize: 32, color: "#ff9800" }} />}
              total="230"
              backgroundColour="#fff8e1"
            />
          </Stack>
          <Stack direction="row" sx={{backgroundColor: "#fff", padding: "12px",}} divider={<Divider orientation="vertical" flexItem/>}>

              {/* sub KPI  */}
              <BillsKPIDisplay
                subtitle="Airtime & Internet"
                total="12,345"
                kpiIcon={<AttachMoney sx={{ color: "success.main" }} /> }
              />

              <BillsKPIDisplay
                subtitle="Tv subscription"
                total="9,876"
                kpiIcon={<Subscriptions sx={{ color: "primary.main" }} /> }
              />

              <BillsKPIDisplay
                subtitle="Gift Cards"
                total="150,00"
                kpiIcon={<CardGiftcard sx={{ color: "error.main" }} /> }
              />

               <BillsKPIDisplay
                subtitle="Electricity"
                total="23,000"
                kpiIcon={<ElectricalServices sx={{ color: "warning.main" }} /> }
              />
          </Stack>

           {/* Data Table  */}
            {/* user table */}
          <Stack
            sx={{backgroundColor:'#fff', borderRadius:5}}
            spacing={1}
            justifyContent="space-between"
            className=" p-4 "
          >
            {/* Trasanction Overview for table  */}
          <TransactionOverview header="Bill Table"/>
            {/* Table  */}
          <EnhancedTable data={billsKPIData} columns={columns} />
          </Stack>
        </Stack>
      </Reveal>
    </>
  );
}