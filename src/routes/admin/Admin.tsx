import { Stack } from "@mui/material";
import { RootState } from "../../features";
import { useEffect, useState } from "react";
import { UsersAPI } from "../../features/users";
import { useDispatch, useSelector } from "react-redux";
import UsersKPIDisplay from "../../components/usersKPI";
import {
  tableFilterAction,
  formatNumberToMultipleCommas,
} from "../../utils";
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

export default function Admins() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState<{ [key: string]: any }[]>([]);

  const { adminKPIData, adminOverviewData, allAdminsData, adminUpdateData } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    // Fetch admins when the component mounts
    // @ts-ignore
    dispatch(new UsersAPI().getMultipleAdmins({ page: 0, limit: 10 }));
    // @ts-ignore
    dispatch(new UsersAPI().getAdminOverviewData({ page: 0, limit: 10 }));
    // @ts-ignore
    dispatch(new UsersAPI().getAdminsKPIData());
  }, [dispatch]);

  useEffect(() => {
    if (allAdminsData?.data?.length >= 0) {
      const modifiedTransactionData = allAdminsData.data.map(
        (admin: any) => ({
          name: `${admin?.user_metadata?.first_name} ${admin?.user_metadata?.surname}`,
          adminId: admin._id,
          lastLogin: admin.updatedAt,
          adminEmail: admin.email,
          status: admin?.status && admin.status === "active" ? "active" : "suspended",
          date: admin.createdAt,
          metadata: {
            itemPhoto:
              "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
          },
        })
      );
      setRows(modifiedTransactionData);
    }
  }, [allAdminsData.data, setRows]);

  const handleAdminUpdate = async (
    adminId: string,
    action: "active" | "inactive"
  ) => {
    // @ts-ignore
    dispatch(new UsersAPI().updateAdminStatus({ userId: adminId, status: action }));
  };

  useEffect(() => {
    // Refresh the admins data
    // @ts-ignore
    dispatch(new UsersAPI().getMultipleAdmins({ page: 0, limit: 10 }));
    // @ts-ignore
    dispatch(new UsersAPI().getAdminsKPIData());

    if (adminUpdateData.success)
      toast.success("Admin updated successfully");
    else if (adminUpdateData.error) toast.error("Error updating admin");

  }, [adminUpdateData.success, adminUpdateData.error]);

  return (
    <>
      <Reveal>
        <Stack direction="column" spacing={3} paddingX={1} paddingY={1}>
          {adminKPIData.isLoading ? (
            <KPILoadingSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:divide-x-2 divide-y-2 lg:divide-y-0">
              <UsersKPIDisplay
                subtitle="Total Admins"
                kpiIcon={<AttachMoney sx={{ color: "success.main" }} />}
                total={`${formatNumberToMultipleCommas(
                  adminKPIData.data?.totalAdminsCount ?? 0
                )}`}
              />

              <UsersKPIDisplay
                subtitle="Active Admins"
                kpiIcon={<HandshakeRounded sx={{ color: "primary.main" }} />}
                total={`${formatNumberToMultipleCommas(
                  adminKPIData.data.activeAdminsCount || 0
                )}`}
              />

              <UsersKPIDisplay
                subtitle="Suspended Admins"
                kpiIcon={<FlagCircleRounded sx={{ color: "error.main" }} />}
                total={`${formatNumberToMultipleCommas(
                  adminKPIData.data.suspendedAdminsCount
                )}`}
              />

              <UsersKPIDisplay
                subtitle="New Admins"
                kpiIcon={<PersonAdd sx={{ color: "primary.main" }} />}
                total={`${formatNumberToMultipleCommas(
                  adminKPIData.data.newAdminsCount
                )}`}
              />
            </div>
          )}

          <Stack
            spacing={1}
            justifyContent="space-between"
            className="bg-white p-4 rounded-[12px]"
          >
            {allAdminsData.isLoading ? (
              <PrimaryTableSkeleton />
            ) : (
              <SearchFilterSortPaginateTable
                title="Admins Overview"
                searchParams={["name", "adminId", "adminEmail", "status"]}
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
                      options: ["active", "inactive"],
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
                    id: "adminId",
                    numeric: true,
                    label: "Admin Id",
                  },
                  {
                    id: "lastLogin",
                    numeric: true,
                    label: "Last Login",
                  },
                  {
                    id: "adminEmail",
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
                        confirm(`Are you sure you want to suspend this admin?`)
                      ) {
                        handleAdminUpdate(row.adminId, "inactive");
                      }
                    },
                  },
                  {
                    label: "Reactivate",
                    disabled: (row) => row.status === "active",
                    onClick: (row) => {
                      if (
                        confirm(
                          `Are you sure you want to reactivate this admin?`
                        )
                      ) {
                        handleAdminUpdate(row.adminId, "active");
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