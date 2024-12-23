import { Divider, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { Reveal, } from "../../components";
import UsersKPIDisplay from "../../components/usersKPI";
import {  
  AttachMoney,
  FlagCircleRounded,
  HandshakeRounded,
  PersonAdd 
} from "@mui/icons-material";
import EnhancedTable from "../../components/EnhancedTable";
import SearchField from "../../components/searchField";
import TransactionOverview from "../../components/TransactionOverviewHeader";

export default function Users() {

  const userKPIData = [
    { Name: 'John Doe', UserID: '1', LastLogin: '2024-12-22', Email: 'john.doe@example.com', Date: '2024-12-01', Status: 'Active' },
    { Name: 'Jane Smith', UserID: '2', LastLogin: '2024-12-21', Email: 'jane.smith@example.com', Date: '2024-11-25', Status: 'Inactive' },
    { Name: 'Sam Green', UserID: '3', LastLogin: '2024-12-23', Email: 'sam.green@example.com', Date: '2024-12-01', Status: 'Active' },
    { Name: 'Alice Brown', UserID: '4', LastLogin: '2024-12-20', Email: 'alice.brown@example.com', Date: '2024-11-30', Status: 'Inactive' },
  ];

  const columns = [
    { label: 'Name', field: 'Name', sortable: true },
    { label: 'User ID', field: 'UserID', sortable: true },
    { label: 'Last Login', field: 'LastLogin', sortable: false },
    { label: 'Email', field: 'Email', sortable: false },
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
                subtitle="Total Users"
                kpiIcon={<AttachMoney sx={{ color: "success.main" }} /> }
                total="12,345"
              />

              <UsersKPIDisplay
                subtitle="Active Users"
                kpiIcon={ <HandshakeRounded sx={{ color: "primary.main" }} />}
                total="1,200"
              />

              <UsersKPIDisplay
                subtitle="Flagged Users"
                kpiIcon={<FlagCircleRounded sx={{ color: "error.main" }} />}
                total="1,200"
              />

              <UsersKPIDisplay
                subtitle="New Users"
                kpiIcon={ <PersonAdd sx={{ color: "primary.main" }} />}
                total="1,200"
              />

          
          </Stack>

          {/* user table */}
          <Stack
            spacing={1}
            justifyContent="space-between"
            className="bg-white p-4 rounded-[12px]"
          >
            {/* Trasanction Overview for table  */}
          <TransactionOverview/>
            {/* Table  */}
          <EnhancedTable data={userKPIData} columns={columns} />
          </Stack>
        </Stack>
      </Reveal>
    </>
  );
}