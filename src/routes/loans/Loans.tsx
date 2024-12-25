import { Divider, Stack } from "@mui/material";
import { DropDown, MainTable, Reveal } from "../../components";
import UsersKPIDisplay from "../../components/usersKPI";
import {
  AttachMoney,
  FlagCircleRounded,
  HandshakeRounded,
  PersonAdd,
} from "@mui/icons-material";
import SearchField from "../../components/searchField";

export default function Loans() {
  return (
    <>
      <Reveal>
        <Stack direction="column" spacing={3} paddingX={1} paddingY={1}>
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

          <Stack
            spacing={1}
            justifyContent="space-between"
            className="bg-white p-4 rounded-[12px]"
          >
            <Stack direction="row" spacing={1}>
              <div className="w-3/5 text-xl">Bills Overview</div>
              <Stack direction="row" spacing={1} className='w-3/5'>
                {/* Search Field */}
                <SearchField />
                <div className="w-full text-xl">
                  <DropDown />
                </div>
              </Stack>
            </Stack>
            <Stack className="border border-gray-200 rounded-[12px] divide-y">
              <MainTable
                key="airtime-3bdd92d-1e3e-4d7d-8a1e-6d7c0a0a0a0a"
                title="Loan Overview"
                headCells={[
                  {
                    id: "customerName",
                    numeric: false,
                    label: "Name",
                  },
                  {
                    id: "loanId",
                    numeric: true,
                    label: "Loan Id",
                  },
                  {
                    id: "amount",
                    numeric: true,
                    label: "Amount",
                  },
                  {
                    id: "interest",
                    numeric: true,
                    label: "Interest",
                  },
                  {
                    id: "dueDate",
                    numeric: false,
                    label: "Due Date",
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
                    customerName: "Kene Nnakwue",
                    loanId: "LN12345",
                    amount: "₦2,000",
                    interest: "₦200",
                    dueDate: "10/01/2025",
                    status: "active",
                    metadata: {
                      itemPhoto:
                        "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
                    },
                  },
                  {
                    customerName: "Chris Obi",
                    loanId: "LN12346",
                    amount: "₦10,000",
                    interest: "₦100",
                    dueDate: "10/12/2025",
                    status: "overdue",
                    metadata: {
                      itemPhoto:
                        "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
                    },
                  },
                ]}
              />
              {/* <MainTable
                    key="gift-card-3bdd92d-1e3e-4d7d-8a1e-6d7c0a0a0a0a"
                    onClick={(e: React.MouseEvent) => {
                      console.log(`clicked ${e.target}`);
                    }}
                  />
                  <MainTable
                    key="internet-3bdd92d-1e3e-4d7d-8a1e-6d7c0a0a0a0a"
                    onClick={(e: React.MouseEvent) => {
                      console.log(`clicked ${e.target}`);
                    }}
                  /> */}
            </Stack>
          </Stack>
        </Stack>
      </Reveal>
    </>
  );
}
