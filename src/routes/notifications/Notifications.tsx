import { Stack } from "@mui/material";
import { Reveal, SearchFilterSortPaginateTable } from "../../components";
import {
  Check,
  NotificationsActive,
  NotificationsPaused,
  HourglassBottom,
} from "@mui/icons-material";
import { tableFilterAction } from "../../utils";
import UsersKPIDisplay from "../../components/usersKPI";

export default function Notifications() {
  return (
    <>
      <Reveal>
        <Stack direction="column" spacing={3} paddingX={1} paddingY={1}>
          {/* KPI Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:divide-x-2 divide-y-2 lg:divide-y-0">
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
          </div>

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
