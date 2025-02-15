import { Stack } from "@mui/material";
import { KPILoadingSkeleton, Reveal, SearchFilterSortPaginateTable } from "../../components";
import {
  Check,
  NotificationsActive,
  NotificationsPaused,
  HourglassBottom,
} from "@mui/icons-material";
import { formatNumberToMultipleCommas, tableFilterAction } from "../../utils";
import UsersKPIDisplay from "../../components/usersKPI";
import NotificationsAPI from '../../features/notifications/NotificationsAPI';
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features";

export default function Notifications() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState<{ [key: string]: any }[]>([]);

  const { notificationKPIData, notificationOverviewData } = useSelector(
    (state: RootState) => state.notifications
  );

  useEffect(() => {
    // Fetch notifications when the component mounts
    // @ts-ignore
    dispatch(new NotificationsAPI().getMultipleNotifications({ page: 0, limit: 10 }));
    // @ts-ignore
    dispatch(new NotificationsAPI().getNotificationsKPIData());
  }, [dispatch]);

  useEffect(() => {
    if (notificationOverviewData.data?.length > 0) {
      const modifiedNotificationData = notificationOverviewData.data.map(
        (notification: any) => ({
          name: notification.name,
          notificationId: notification._id,
          type: notification.type,
          message: notification.message,
          user: notification.user,
          date: notification.created_at,
          status: notification.status,
        })
      );
      setRows(modifiedNotificationData);
    }
  }, [notificationOverviewData.data, setRows]);
  return (
    <>
      <Reveal>
        <Stack direction="column" spacing={3} paddingX={1} paddingY={1}>
          {/* KPI Section */}
          {notificationKPIData.isLoading ?(
            <KPILoadingSkeleton/>
          ):(
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:divide-x-2 divide-y-2 lg:divide-y-0">
            <UsersKPIDisplay
              subtitle="Total Notifications"
              kpiIcon={<NotificationsActive sx={{ color: "success.main" }} />}
              total={`${formatNumberToMultipleCommas(notificationKPIData.data.totalNotification)}`}
            />

            <UsersKPIDisplay
              subtitle="Pending"
              kpiIcon={<NotificationsPaused sx={{ color: "primary.main" }} />}
              total={`${formatNumberToMultipleCommas(notificationKPIData.data.totalPendingNotification)}`}
            />

            <UsersKPIDisplay
              subtitle="Most Frequent"
              kpiIcon={<HourglassBottom sx={{ color: "warning.main" }} />}
              total={`${formatNumberToMultipleCommas(notificationKPIData.data.totalMostFrequent)}`}
            />

            <UsersKPIDisplay
              subtitle="Success rate"
              kpiIcon={<Check sx={{ color: "success.main" }} />}
              total={`${formatNumberToMultipleCommas(notificationKPIData.data.totalSuccessRate)}`}
            />
          </div>

          )}
          <Stack
            spacing={1}
            justifyContent="space-between"
            className="bg-white p-4 rounded-[12px]"
          >
            {notificationKPIData.isLoading ? (
            <KPILoadingSkeleton />
          ) : (
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
                    options: ["unread", "read"],
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
              ]}
              rows={rows}
                
            />
          )}
          </Stack>
        </Stack>
      </Reveal>
    </>
  );
}
