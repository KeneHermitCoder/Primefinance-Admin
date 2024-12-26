import { Divider, Stack } from "@mui/material";
import { Reveal, } from "../../components";
import {  Check,  NotificationsActive, NotificationsPaused, HourglassBottom } from "@mui/icons-material";
import EnhancedTable from "../../components/EnhancedTable";
import TransactionOverview from "../../components/TransactionOverviewHeader";
import UsersKPIDisplay from "../../components/usersKPI";

export default function Notifications() {

  const userKPIData = [
    { Name: 'John Doe', NotificationID: 'LN12345', Category: 'Payment reminder', Message: 'your payment is due since...', Date: '2024-12-01', Status: 'Sent' },
    { Name: 'Jane Smith', NotificationID: 'LN12345', Category: 'Payment reminder', Message: 'repay your loan as soon as ...', Date: '2024-11-25', Status: 'Scheduled' },
    { Name: 'Sam Green', NotificationID: 'LN12345', Category: 'Payment', Message: 'payment successful', Date: '2024-12-01', Status: 'Failed' },
    { Name: 'Alice Brown', NotificationID: 'LN22345', Category: 'Loan update', Message: 'loan granted', Date: '2024-11-30', Status: 'Suspended' },
  ];

  const columns = [
    { label: 'Name', field: 'Name', sortable: true },
    { label: 'Notification ID', field: 'NotificationID', sortable: true },
    { label: 'Category', field: 'Category', sortable: false },
    { label: 'Message', field: 'Message', sortable: false },
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
          {/* KPI Section */}
          <Stack direction="row" sx={{backgroundColor: "#fff", padding: "12px",}} divider={<Divider orientation="vertical" flexItem/>}>
              <UsersKPIDisplay
                subtitle="Total Notifications"
                kpiIcon={<NotificationsActive   sx={{ color: "success.main" }} /> }
                total="12,345"
              />

              <UsersKPIDisplay
                subtitle="Pending"
                kpiIcon={ <NotificationsPaused sx={{ color: "primary.main" }} />}
                total="1,200"
              />

              <UsersKPIDisplay
                subtitle="Most Frequent"
                kpiIcon={<HourglassBottom sx={{ color: "warning.main" }} />}
                total="1,200"
              />

              <UsersKPIDisplay
                subtitle="Success rate"
                kpiIcon={ <Check sx={{ color: "success.main" }} />}
                total="1,200"
              />

          
          </Stack>

          {/* user table */}
          <Stack
            sx={{backgroundColor:'#fff', borderRadius:5}}
            spacing={1}
            justifyContent="space-between"
            className=" p-4 "
          >
            {/* Trasanction Overview for table  */}
          <TransactionOverview header="Notification Overview"/>
            {/* Table  */}
          <EnhancedTable data={userKPIData} columns={columns} />
          </Stack>
        </Stack>
      </Reveal>
    </>
  );
}