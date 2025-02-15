import { Stack } from "@mui/material";
import { RootState } from "../../features";
import { useEffect, useState } from "react";
import { UsersAPI } from "../../features/users";
import { useDispatch, useSelector } from "react-redux";
import UsersKPIDisplay from "../../components/usersKPI";
import { tableFilterAction, formatNumberToMultipleCommas } from "../../utils";
import {
  Reveal,
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
import { toast } from "react-toastify";

export default function Users() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState<{ [key: string]: any }[]>([]);

  const { userKPIData, userOverviewData, allUsersData, userUpdateData, } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    // Fetch users when the component mounts
    // @ts-ignore
    dispatch(new UsersAPI().getMultipleUsers({ page: 0, limit: 10 }));
    // @ts-ignore
    dispatch(new UsersAPI().getUserOverviewData({ page: 0, limit: 10 }));
    // @ts-ignore
    dispatch(new UsersAPI().getUsersKPIData());
  }, [dispatch]);

  useEffect(() => {
    console.log({allUsersData});
    if (allUsersData?.data?.length >= 0) {
      const modifiedTransactionData = allUsersData.data.map((user: any) => ({
        name: `${user?.user_metadata?.first_name} ${user?.user_metadata?.surname}`,
        userId: user._id,
        // lastLogin: user.last_login,
        lastLogin: user.updatedAt,
        userEmail: user.email,
        status:
          user?.status && user.status === "active" ? "active" : "suspended",
        date: user.createdAt,
        metadata: {
          itemPhoto:
            "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
        },
      }));
      setRows(modifiedTransactionData);
    }
  }, [userOverviewData.data, setRows]);

  const handleUserUpdate = async (
    userId: string,
    action: "active" | "inactive"
  ) => {
    // @ts-ignore
    dispatch(new UsersAPI().updateUserStatus({ userId, status: action }));
  };

  useEffect(() => {
    // Refresh the users data
    // @ts-ignore
    dispatch(new UsersAPI().getMultipleUsers({ page: 0, limit: 10 }));
    // @ts-ignore
    dispatch(new UsersAPI().getUsersKPIData());

    if (userUpdateData.success)
      toast.success("User updated successfully");
    else if (userUpdateData.error) toast.error("Error updating user");

  }, [userUpdateData.success, userUpdateData.error]);

  return (
    <>
      <Reveal>
        <Stack direction="column" spacing={3} paddingX={1} paddingY={1}>
          {userKPIData.isLoading ? (
            <KPILoadingSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:divide-x-2 divide-y-2 lg:divide-y-0">
              <UsersKPIDisplay
                subtitle="Total Users"
                kpiIcon={<AttachMoney sx={{ color: "success.main" }} />}
                total={`${formatNumberToMultipleCommas(
                  userKPIData.data?.totalUsersCount ?? 0
                )}`}
              />

              <UsersKPIDisplay
                subtitle="Active Users"
                kpiIcon={<HandshakeRounded sx={{ color: "primary.main" }} />}
                total={`${formatNumberToMultipleCommas(
                  userKPIData.data.activeUsersCount || 0
                )}`}
              />

              <UsersKPIDisplay
                subtitle="Suspended Users"
                kpiIcon={<FlagCircleRounded sx={{ color: "error.main" }} />}
                total={`${formatNumberToMultipleCommas(
                  userKPIData.data.suspendedUsersCount
                )}`}
              />

              <UsersKPIDisplay
                subtitle="New Users"
                kpiIcon={<PersonAdd sx={{ color: "primary.main" }} />}
                total={`${formatNumberToMultipleCommas(
                  userKPIData.data.newUsersCount
                )}`}
              />
            </div>
          )}

          <Stack
            spacing={1}
            justifyContent="space-between"
            className="bg-white p-4 rounded-[12px]"
          >
            {allUsersData.isLoading ? (
              <PrimaryTableSkeleton />
            ) : (
              <SearchFilterSortPaginateTable
                title="Users Overview"
                searchParams={["name", "userId", "userEmail", "status"]}
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
                      options: ["active", "suspended"],
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
                    id: "userId",
                    numeric: true,
                    label: "User Id",
                  },
                  {
                    id: "lastLogin",
                    numeric: true,
                    label: "Last Login",
                  },
                  {
                    id: "userEmail",
                    numeric: true,
                    label: "Email",
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
                actions={[
                  {
                    label: "Suspend",
                    disabled: (row) => row.status === "suspended",
                    onClick: (row) => {
                      if (
                        confirm(`Are you sure you want to suspend this user?`)
                      ) {
                        handleUserUpdate(row.userId, "inactive");
                      }
                    },
                  },
                  {
                    label: "Reactivate",
                    disabled: (row) => row.status === "active",
                    onClick: (row) => {
                      if (
                        confirm(
                          `Are you sure you want to reactivate this user?`
                        )
                      ) {
                        handleUserUpdate(row.userId, "active");
                      }
                    },
                  },
                ]}
              />
            )}
          </Stack>
        </Stack>
      </Reveal>
    </>
  );
}
