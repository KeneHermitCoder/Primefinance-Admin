import { Divider, Stack } from "@mui/material";
import { Reveal, SearchFilterSortPaginateTable } from "../../components";
import {
  Check,
  NotificationsActive,
  NotificationsPaused,
  HourglassBottom,
} from "@mui/icons-material";
// import EnhancedTable from "../../components/EnhancedTable";
// import TransactionOverview from "../../components/TransactionOverviewHeader";
import UsersKPIDisplay from "../../components/usersKPI";
import { tableFilterAction } from "../../utils";

export default function Notifications() {
  // const userKPIData = [
  //   {
  //     Name: "John Doe",
  //     NotificationID: "LN12345",
  //     Category: "Payment reminder",
  //     Message: "your payment is due since...",
  //     Date: "2024-12-01",
  //     Status: "Sent",
  //   },
  //   {
  //     Name: "Jane Smith",
  //     NotificationID: "LN12345",
  //     Category: "Payment reminder",
  //     Message: "repay your loan as soon as ...",
  //     Date: "2024-11-25",
  //     Status: "Scheduled",
  //   },
  //   {
  //     Name: "Sam Green",
  //     NotificationID: "LN12345",
  //     Category: "Payment",
  //     Message: "payment successful",
  //     Date: "2024-12-01",
  //     Status: "Failed",
  //   },
  //   {
  //     Name: "Alice Brown",
  //     NotificationID: "LN22345",
  //     Category: "Loan update",
  //     Message: "loan granted",
  //     Date: "2024-11-30",
  //     Status: "Suspended",
  //   },
  // ];

  // const columns = [
  //   { label: "Name", field: "Name", sortable: true },
  //   { label: "Notification ID", field: "NotificationID", sortable: true },
  //   { label: "Category", field: "Category", sortable: false },
  //   { label: "Message", field: "Message", sortable: false },
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
          {/* KPI Section */}
          <Stack
            direction="row"
            sx={{ backgroundColor: "#fff", padding: "12px" }}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <UsersKPIDisplay
              subtitle="Total Notifications"
              kpiIcon={<NotificationsActive sx={{ color: "success.main" }} />}
              total="12,345"
            />

            <UsersKPIDisplay
              subtitle="Pending"
              kpiIcon={<NotificationsPaused sx={{ color: "primary.main" }} />}
              total="1,200"
            />

            <UsersKPIDisplay
              subtitle="Most Frequent"
              kpiIcon={<HourglassBottom sx={{ color: "warning.main" }} />}
              total="1,200"
            />

            <UsersKPIDisplay
              subtitle="Success rate"
              kpiIcon={<Check sx={{ color: "success.main" }} />}
              total="1,200"
            />
          </Stack>

          {/* <Stack
            sx={{backgroundColor:'#fff', borderRadius:5}}
            spacing={1}
            justifyContent="space-between"
            className=" p-4 "
          >
          <TransactionOverview header="Notification Overview"/>
          <EnhancedTable data={userKPIData} columns={columns} />
          </Stack> */}

          <Stack
            spacing={1}
            justifyContent="space-between"
            className="bg-white p-4 rounded-[12px]"
          >
            <SearchFilterSortPaginateTable
              title="Notification Overview"
              searchParams={["name", "notificationId", "message", "status"]}
              filterParams={{
                data: [
                  {
                    label: "Date",
                    options: ["Today", "This Week", "This Month", "This Year"],
                  },
                  {
                    label: "Category",
                    options: ["Payment reminder", "Loan update", "Payment", "Warning", "Other"],
                  },
                  {
                    label: "Status",
                    options: ["sent", "scheduled", "failed"],
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
                  id: "notificationId",
                  numeric: true,
                  label: "Notification Id",
                },
                {
                  id: "category",
                  numeric: true,
                  label: "Category",
                },
                {
                  id: "message",
                  numeric: true,
                  label: "Message",
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
                  notificationId: "LN12345",
                  category: "Payment reminder",
                  message: "Your loan has been approved",
                  date: "10/01/2025",
                  status: "sent",
                  metadata: {
                    itemPhoto: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
                  },
                },
                {
                  name: "Chris Obi",
                  notificationId: "LN12346",
                  category: "Loan update",
                  message: "your payment is due since...",
                  date: "10/12/2024",
                  status: "scheduled",
                  metadata: {
                    itemPhoto: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
                  },
                },
                {
                  name: "Chinwe Okafor",
                  notificationId: "LN12347",
                  category: "Payment",
                  message: "Your loan has been approved",
                  date: "10/01/2025",
                  status: "failed",
                  metadata: {
                    itemPhoto: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
                  },
                },
              ]}
            />
          </Stack>
        </Stack>
      </Reveal>
    </>
  );
}
