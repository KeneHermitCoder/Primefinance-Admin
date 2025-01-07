import { Stack } from "@mui/material";
import { RootState } from "../../features";
import { useEffect, useState } from "react";
import LoansAPI from "../../features/loans/LoansAPI";
import { useDispatch, useSelector } from "react-redux";
import UsersKPIDisplay from "../../components/usersKPI";
import {
  Reveal,
  PrimaryPieChart,
  SearchFilterSortPaginateTable,
  PrimaryBarChart,
  PrimaryTableSkeleton,
  KPILoadingSkeleton,
  TableErrorComponent,
} from "../../components";
import {
  PersonAdd,
  AttachMoney,
  HandshakeRounded,
  FlagCircleRounded,
} from "@mui/icons-material";
import {
  tableFilterAction,
  formatNumberToMultipleCommas,
} from "../../utils";

export default function Loans() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState<{ [key: string]: any }[]>([]);

  const {
    loanKPIData,
    loanOverviewData,
  } = useSelector((state: RootState) => state.loans);

  useEffect(() => {
    // Fetch loans when the component mounts
    // @ts-ignore
    dispatch(new LoansAPI().getLoanOverviewData({ page: 0, limit: 10 }));
    // @ts-ignore
    dispatch(new LoansAPI().getLoansKPIData());
  }, [dispatch]);

  useEffect(() => {
    if (loanOverviewData.data.length > 0) {
      const modifiedLoansData = loanOverviewData.data.map((loan: any) => ({
        customerName: `${loan.first_name} ${loan.last_name}`,
        loanId: loan.id,
        amount: `₦${loan.amount}`,
        interest: `₦${((loan.percentage / 100) * loan.amount).toFixed(2)}`,
        date: loan.repayment_date,
        status: loan.status,
        metadata: {
          itemPhoto:
            "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
        },
      }));
      setRows(modifiedLoansData);
      console.log({ modifiedLoansData });
    }
  }, [loanOverviewData.data, setRows]);

  return (
    <Reveal>
      <Stack direction="column" spacing={3} paddingX={1} paddingY={1}>
        {loanKPIData.isLoading ? (
          <KPILoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 md:divide-x-2 divide-y-2 lg:divide-y-0">
            <UsersKPIDisplay
              subtitle="Total Loans"
              kpiIcon={<AttachMoney sx={{ color: "success.main" }} />}
              total={`${formatNumberToMultipleCommas(loanKPIData.data.totalLoans)}`}
            />

            <UsersKPIDisplay
              subtitle="Active Loans"
              kpiIcon={<HandshakeRounded sx={{ color: "primary.main" }} />}
              total={`${formatNumberToMultipleCommas(loanKPIData.data.activeLoans)}`}
            />

            <UsersKPIDisplay
              subtitle="Repaid Loans"
              kpiIcon={<FlagCircleRounded sx={{ color: "error.main" }} />}
              total={`${formatNumberToMultipleCommas(loanKPIData.data.repaidLoans)}`}
            />

            <UsersKPIDisplay
              subtitle="Due"
              kpiIcon={<PersonAdd sx={{ color: "primary.main" }} />}
              total={`${formatNumberToMultipleCommas(loanKPIData.data.dueLoans)}`}
            />

            <UsersKPIDisplay
              subtitle="Overdue"
              kpiIcon={<PersonAdd sx={{ color: "primary.main" }} />}
              total={`${formatNumberToMultipleCommas(loanKPIData.data.overdueLoans)}`}
            />

            <UsersKPIDisplay
              subtitle="Revenue"
              kpiIcon={<PersonAdd sx={{ color: "primary.main" }} />}
              total={`₦${formatNumberToMultipleCommas(loanKPIData.data.totalLoanRevenue)}`}
            />
          </div>
        )}

        <Stack
          spacing={1}
          justifyContent="space-between"
          className="bg-white p-4 rounded-[12px]"
        >
          {loanOverviewData.isLoading ? (
            <PrimaryTableSkeleton />
          ) : loanOverviewData.error ? (
              <TableErrorComponent
                message={loanOverviewData.error}
                onRetry={() => {
                  // @ts-ignore
                  dispatch(new LoansAPI().getLoanOverviewData({ page: 0, limit: 10 }))
                }}
              />
          ): (
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
                    options: ["pending", "active", "repaid"],
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
          )}
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
