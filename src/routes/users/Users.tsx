import { Divider, Stack } from "@mui/material";
import { Reveal, SearchFilterSortPaginateTable } from "../../components";
import UsersKPIDisplay from "../../components/usersKPI";
import {
  AttachMoney,
  FlagCircleRounded,
  HandshakeRounded,
  PersonAdd,
} from "@mui/icons-material";
import { tableFilterAction } from "../../utils";
// import EnhancedTable from "../../components/EnhancedTable";
// import TransactionOverview from "../../components/TransactionOverviewHeader";

export default function Users() {
  // const userKPIData = [
  //   { Name: 'John Doe', UserID: '1', LastLogin: '2024-12-22', Email: 'john.doe@example.com', Date: '2024-12-01', Status: 'Active' },
  //   { Name: 'Jane Smith', UserID: '2', LastLogin: '2024-12-21', Email: 'jane.smith@example.com', Date: '2024-11-25', Status: 'Inactive' },
  //   { Name: 'Sam Green', UserID: '3', LastLogin: '2024-12-23', Email: 'sam.green@example.com', Date: '2024-12-01', Status: 'Active' },
  //   { Name: 'Alice Brown', UserID: '4', LastLogin: '2024-12-20', Email: 'alice.brown@example.com', Date: '2024-11-30', Status: 'Inactive' },
  // ];

  // const columns = [
  //   { label: 'Name', field: 'Name', sortable: true },
  //   { label: 'User ID', field: 'UserID', sortable: true },
  //   { label: 'Last Login', field: 'LastLogin', sortable: false },
  //   { label: 'Email', field: 'Email', sortable: false },
  //   { label: 'Date', field: 'Date', sortable: true },
  //   {
  //     label: 'Status',
  //     field: 'Status',
  //     sortable: false,
  //     render: (value: string) => (
  //       <span style={{ color: value === 'Active' ? 'green' : 'red' }}>
  //         {value}
  //       </span>
  //     )
  //   },
  //   { label: 'Actions', field: 'Actions', sortable: false },
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
          </Stack>

          {/* <Stack
            sx={{backgroundColor:'#fff', borderRadius:5}}
            spacing={1}
            justifyContent="space-between"
            className=" p-4 "
          >
          <TransactionOverview header="Transaction Overview"/>
          <EnhancedTable data={userKPIData} columns={columns} />
          </Stack> */}

          <Stack
            spacing={1}
            justifyContent="space-between"
            className="bg-white p-4 rounded-[12px]"
          >
            <SearchFilterSortPaginateTable
              title="Transaction Overview"
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
                  id: "email",
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
                  email: "kene.hermitcoder@me.com",
                  date: "10/01/2025",
                  status: "active",
                  metadata: {
                    itemPhoto: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
                  },
                },
                {
                  name: "Chris Obi",
                  userId: "LN12346",
                  lastLogin: "yesterday",
                  email: "chris.obi@me.com",
                  date: "10/12/2024",
                  status: "suspended",
                  metadata: {
                    itemPhoto: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
                  },
                },
                {
                  name: "Chinwe Okafor",
                  userId: "LN12347",
                  lastLogin: "4:56pm",
                  type: "deposit",
                  date: "10/01/2025",
                  status: "flagged",
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
