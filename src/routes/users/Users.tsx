import { Stack, } from "@mui/material";
import { tableFilterAction } from "../../utils";
import UsersKPIDisplay from "../../components/usersKPI";
import { Reveal, SearchFilterSortPaginateTable } from "../../components";
import {
  AttachMoney,
  FlagCircleRounded,
  HandshakeRounded,
  PersonAdd,
} from "@mui/icons-material";

export default function Users() {
  return (
    <>
      <Reveal>
        <Stack direction="column" spacing={3} paddingX={1} paddingY={1}>
          {/* KPI Section */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:divide-x-2 divide-y-2 lg:divide-y-0">
            <UsersKPIDisplay
              subtitle="Total Users"
              kpiIcon={<AttachMoney sx={{ color: "success.main" }} />}
              total="12,345"
            />

            <UsersKPIDisplay
              subtitle="Active Users"
              kpiIcon={<HandshakeRounded sx={{ color: "primary.main" }} />}
              total="1,200"
            />

            <UsersKPIDisplay
              subtitle="Flagged Users"
              kpiIcon={<FlagCircleRounded sx={{ color: "error.main" }} />}
              total="1,200"
            />

            <UsersKPIDisplay
              subtitle="New Users"
              kpiIcon={<PersonAdd sx={{ color: "primary.main" }} />}
              total="1,200"
            />
          </div>

          <Stack
            spacing={1}
            justifyContent="space-between"
            className="bg-white p-4 rounded-[12px]"
          >
            <SearchFilterSortPaginateTable
              title="Users Overview"
              searchParams={["name", "userId", "userEmail", "status"]}
              filterParams={{
                data: [
                  {
                    label: "Date",
                    options: ["Today", "This Week", "This Month", "This Year"],
                  },
                  {
                    label: "Status",
                    options: ["active", "flagged", "suspended"],
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
              rows={[
                {
                  name: "Kene Nnakwue",
                  userId: "LN12345",
                  lastLogin: "Just now",
                  userEmail: "kene.hermitcoder@me.com",
                  date: "10/01/2025",
                  status: "active",
                  metadata: {
                    itemPhoto:
                      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
                  },
                },
                {
                  name: "Chris Obi",
                  userId: "LN12346",
                  lastLogin: "yesterday",
                  userEmail: "chris.obi@me.com",
                  date: "10/12/2024",
                  status: "suspended",
                  metadata: {
                    itemPhoto:
                      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
                  },
                },
                {
                  name: "Chinwe Okafor",
                  userId: "LN12347",
                  lastLogin: "4:56pm",
                  userEmail: "chinwe.okafor@me.com",
                  type: "deposit",
                  date: "10/01/2025",
                  status: "flagged",
                  metadata: {
                    itemPhoto:
                      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
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
