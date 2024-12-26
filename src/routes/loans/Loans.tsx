import { Stack } from "@mui/material";
import UsersKPIDisplay from "../../components/usersKPI";
import {
  Reveal,
  LoanPieChart,
  SearchFilterSortPaginateTable,
} from "../../components";
import {
  PersonAdd,
  AttachMoney,
  HandshakeRounded,
  FlagCircleRounded,
} from "@mui/icons-material";

export default function Loans() {
  return (
    <>
      <Reveal>
        <Stack direction="column" spacing={3} paddingX={1} paddingY={1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:divide-x-2 divide-y-2 lg:divide-y-0">
            <UsersKPIDisplay
              subtitle="Total Loans"
              kpiIcon={<AttachMoney sx={{ color: "success.main" }} />}
              total="12,345"
            />

            <UsersKPIDisplay
              subtitle="Active Loans"
              kpiIcon={<HandshakeRounded sx={{ color: "primary.main" }} />}
              total="1,200"
            />

            <UsersKPIDisplay
              subtitle="Repaid Loans"
              kpiIcon={<FlagCircleRounded sx={{ color: "error.main" }} />}
              total="1,200"
            />

            <UsersKPIDisplay
              subtitle="Pending Applications"
              kpiIcon={<PersonAdd sx={{ color: "primary.main" }} />}
              total="1,200"
            />

            <UsersKPIDisplay
              subtitle="Revenue"
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
              key="airtime-3bdd92d-1e3e-4d7d-8a1e-6d7c0a0a0a0a"
              title="Loan Overview"
              searchParams={["customerName", "loanId", "status"]}
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
                {
                  customerName: "Chinwe Okafor",
                  loanId: "LN12347",
                  amount: "₦5,000",
                  interest: "₦500",
                  dueDate: "10/01/2025",
                  status: "active",
                  metadata: {
                    itemPhoto:
                      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
                  },
                },
              ]}
            />
          </Stack>

          <div className="flex flex-col md:flex-row gap-6">
            <Stack
              spacing={1}
              justifyContent="space-between"
              className="w-full md:w-3/5 bg-white p-4 rounded-[12px]"
            >
              f
            </Stack>
            <Stack
              spacing={1}
              justifyContent="space-between"
              className="w-full md:w-2/4 bg-white p-4 rounded-[12px]"
            >
              <LoanPieChart />
            </Stack>
          </div>
        </Stack>
      </Reveal>
    </>
  );
}
