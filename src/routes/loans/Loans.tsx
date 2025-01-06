import { Stack } from "@mui/material";
import UsersKPIDisplay from "../../components/usersKPI";
import {
  Reveal,
  PrimaryPieChart,
  SearchFilterSortPaginateTable,
  PrimaryBarChart,
} from "../../components";
import {
  PersonAdd,
  AttachMoney,
  HandshakeRounded,
  FlagCircleRounded,
} from "@mui/icons-material";
import { formatNumberToMultipleCommas, tableFilterAction } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features";
import LoansAPI from "../../features/loans/LoansAPI";
import { useEffect, useState } from "react";

export default function Loans() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState<{ [key: string]: any }[]>([]);
  const {
    loans, 
    totalLoans,
    activeLoans,
    repaidloans,
    dueLoans,
    overdueLoans,
    success,
    loanRevenue,
    // loanInterest,
    // isLoading,
    // error,
  } = useSelector(
    (state: RootState) => state.loans
  );

  useEffect(() => {
    // Fetch loans when the component mounts
    // @ts-ignore
    dispatch(new LoansAPI().getMultipleLoans({ page: 0, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    console.log({ loans });
    const modifiedLoansData = loans.map((loan: any) => {
      return {
        customerName: `${loan.first_name} ${loan.last_name}`,
        loanId: loan.id,
        amount: loan.amount,
        interest: ((loan.percentage / 100) * loan.amount).toFixed(2),
        date: loan.repayment_date,
        status: loan.status,
        metadata: {
          itemPhoto: loan.base64Image ||
            "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
        }
      };
    })
    setRows(() => modifiedLoansData);
  }, [loans, success]);

  return (
    <Reveal>
      <Stack direction="column" spacing={3} paddingX={1} paddingY={1}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 md:divide-x-2 divide-y-2 lg:divide-y-0">
          <UsersKPIDisplay
            subtitle="Total Loans"
            kpiIcon={<AttachMoney sx={{ color: "success.main" }} />}
            total={`${formatNumberToMultipleCommas(totalLoans)}`}
          />

          <UsersKPIDisplay
            subtitle="Active Loans"
            kpiIcon={<HandshakeRounded sx={{ color: "primary.main" }} />}
            total={`${formatNumberToMultipleCommas(activeLoans)}`}
          />

          <UsersKPIDisplay
            subtitle="Repaid Loans"
            kpiIcon={<FlagCircleRounded sx={{ color: "error.main" }} />}
            total={`${formatNumberToMultipleCommas(repaidloans)}`}
          />

          <UsersKPIDisplay
            subtitle="Due"
            kpiIcon={<PersonAdd sx={{ color: "primary.main" }} />}
            total={`${formatNumberToMultipleCommas(dueLoans)}`}
          />

          <UsersKPIDisplay
            subtitle="Overdue"
            kpiIcon={<PersonAdd sx={{ color: "primary.main" }} />}
            total={`${formatNumberToMultipleCommas(overdueLoans)}`}
          />

          <UsersKPIDisplay
            subtitle="Revenue"
            kpiIcon={<PersonAdd sx={{ color: "primary.main" }} />}
            total={`₦${formatNumberToMultipleCommas(loanRevenue)}`}
          />
        </div>

        <Stack
          spacing={1}
          justifyContent="space-between"
          className="bg-white p-4 rounded-[12px]"
        >
          <SearchFilterSortPaginateTable
            title="Loan Overview"
            searchParams={["customerName", "loanId", "status"]}
            filterParams={{
              data: [
                {
                  label: "Date",
                  options: ["Today", "This Week", "This Month", "This Year"],
                },
                {
                  label: "Status",
                  options: ["", "active", "pending", "repaid"],
                },
              ],
              action: tableFilterAction,
            }}
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
                id: "date",
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
            rows={rows}
          />
        </Stack>

        <div className="flex flex-col md:flex-row gap-6">
          <Stack
            spacing={1}
            justifyContent="space-between"
            className="w-full md:w-3/5 bg-white p-4 rounded-[12px] self-start"
          >
            <PrimaryBarChart title="Loan Transactions" />
          </Stack>
          <Stack
            spacing={1}
            className="w-full md:w-2/5 bg-white p-4 rounded-[12px]"
          >
            <PrimaryPieChart
              title="Loan Transactions"
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
  );
}
