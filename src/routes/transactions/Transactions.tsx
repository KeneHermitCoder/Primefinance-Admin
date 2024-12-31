import { Stack } from "@mui/material";
import { tableFilterAction } from "../../utils";
import UsersKPIDisplay from "../../components/usersKPI";
import {
  Reveal,
  PrimaryPieChart,
  SearchFilterSortPaginateTable,
} from "../../components";
import {
  PersonAdd,
  AttachMoney,
  HandshakeRounded,
  FlagCircleRounded,
} from "@mui/icons-material";

export default function Transactions() {
  return (
    <>
      <Reveal>
        <Stack direction="column" spacing={3} paddingX={1} paddingY={1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:divide-x-2 divide-y-2 lg:divide-y-0">
            <UsersKPIDisplay
              subtitle="Total Transactions"
              kpiIcon={<AttachMoney sx={{ color: "success.main" }} />}
              total="₦12,345"
            />

            <UsersKPIDisplay
              subtitle="Successful Transactions"
              kpiIcon={<HandshakeRounded sx={{ color: "primary.main" }} />}
              total="920"
            />

            <UsersKPIDisplay
              subtitle="Failed Transactions"
              kpiIcon={<FlagCircleRounded sx={{ color: "error.main" }} />}
              total="44"
            />

            <UsersKPIDisplay
              subtitle="Total Amount Processed"
              kpiIcon={<PersonAdd sx={{ color: "primary.main" }} />}
              total="66"
            />
          </div>

          <Stack
            spacing={1}
            justifyContent="space-between"
            className="bg-white p-4 rounded-[12px]"
          >
            <SearchFilterSortPaginateTable
              title="Transaction Overview"
              searchParams={["customerName", "loanId", "status"]}
              filterParams={{
                data: [
                  {
                    label: "Date",
                    options: ["Today", "This Week", "This Month", "This Year"],
                  },
                  {
                    label: "Type",
                    options: ["deposit", "withdrawal", "transfer"],
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
                  id: "transactionId",
                  numeric: true,
                  label: "Transaction Id",
                },
                {
                  id: "amount",
                  numeric: true,
                  label: "Amount",
                },
                {
                  id: "type",
                  numeric: true,
                  label: "Type",
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
                  transactionId: "LN12345",
                  amount: "₦2,000",
                  type: "withdrawal",
                  date: "10/01/2025",
                  status: "active",
                  metadata: {
                    itemPhoto:
                      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
                  },
                },
                {
                  name: "Chris Obi",
                  transactionId: "LN12346",
                  amount: "₦10,000",
                  type: "deposit",
                  date: "10/12/2024",
                  status: "suspended",
                  metadata: {
                    itemPhoto:
                      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
                  },
                },
                {
                  name: "Chinwe Okafor",
                  transactionId: "LN12347",
                  amount: "₦5,000",
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

          <div className="flex flex-col md:flex-row gap-6">
            <Stack
              spacing={1}
              justifyContent="space-between"
              className="w-full md:w-3/5 bg-white p-4 rounded-[12px] self-start"
            >
              Bar Chart here...
            </Stack>
            <Stack
              spacing={1}
              className="w-full md:w-2/5 bg-white p-4 rounded-[12px]"
            >
              <PrimaryPieChart
                title="Transaction"
                data={[
                  {
                    label: "Deposit",
                    value: 7272,
                  },
                  {
                    label: "Withdrawal",
                    value: 1638,
                  },
                  {
                    label: "Loan Repayment",
                    value: 3638,
                  },
                ]}
                metadata={{
                  currency: "₦",
                }}
              />
            </Stack>
          </div>
        </Stack>
      </Reveal>
    </>
  );
}
