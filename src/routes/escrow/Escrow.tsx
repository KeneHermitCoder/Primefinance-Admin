import { Stack } from "@mui/material";
import UsersKPIDisplay from "../../components/usersKPI";
import {
  Reveal,
  SearchFilterSortPaginateTable,
} from "../../components";
import {
  PersonAdd,
  AttachMoney,
  HandshakeRounded,
  FlagCircleRounded,
} from "@mui/icons-material";

export default function Escrow() {
  return (
    <>
      <Reveal>
        <Stack direction="column" spacing={3} paddingX={1} paddingY={1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:divide-x-2 divide-y-2 lg:divide-y-0">
            <UsersKPIDisplay
              subtitle="Total Funds"
              kpiIcon={<AttachMoney sx={{ color: "success.main" }} />}
              total="₦123,450"
            />

            <UsersKPIDisplay
              subtitle="Funds Released"
              kpiIcon={<HandshakeRounded sx={{ color: "primary.main" }} />}
              total="₦52,345"
            />

            <UsersKPIDisplay
              subtitle="Pending Escrow"
              kpiIcon={<FlagCircleRounded sx={{ color: "error.main" }} />}
              total="44"
            />

            <UsersKPIDisplay
              subtitle="Escrow Profit"
              kpiIcon={<PersonAdd sx={{ color: "primary.main" }} />}
              total="₦12,045"
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
              headCells={[
                {
                  id: "payer",
                  numeric: false,
                  label: "Payer",
                },
                {
                  id: "transactionId",
                  numeric: false,
                  label: "Transaction Id",
                },
                {
                  id: "amount",
                  numeric: true,
                  label: "Amount",
                },
                {
                  id: "payee",
                  numeric: false,
                  label: "Payee",
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
                  payer: "Kene Nnakwue",
                  transactionId: "LN12345",
                  amount: "₦2,000",
                  payee: "Chinwe Okafor",
                  date: "10/01/2025",
                  status: "released",
                  metadata: {
                    itemPhoto:
                      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
                  },
                },
                {
                  payer: "Chris Obi",
                  transactionId: "LN12346",
                  amount: "₦10,000",
                  payee: "Obiora Nwankwo",
                  date: "10/12/2025",
                  status: "held",
                  metadata: {
                    itemPhoto:
                      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
                  },
                },
                {
                  payer: "Chinwe Okafor",
                  transactionId: "LN12347",
                  amount: "₦5,000",
                  payee: "Philemon Adamu",
                  date: "10/01/2025",
                  status: "cancelled",
                  metadata: {
                    itemPhoto:
                      "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
                  },
                },
              ]}
            />
          </Stack>

          <Stack
            spacing={1}
            justifyContent="space-between"
            className="w-full md:w-3/5 bg-white p-4 rounded-[12px] self-start"
          >
            Alert info here...
          </Stack>
        </Stack>
      </Reveal>
    </>
  );
}