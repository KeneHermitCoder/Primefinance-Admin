import { Stack, } from "@mui/material";
import { RootState } from "../../features";
import { useEffect, useState } from "react";
import LoansAPI from "../../features/loans/LoansAPI";
import { useDispatch, useSelector } from "react-redux";
import UsersKPIDisplay from "../../components/usersKPI";
import {
  Reveal,
  PrimaryPieChart,
  PrimaryBarChart,
  PrimaryTableSkeleton,
  KPILoadingSkeleton,
  LoanSearchFilterSortPaginateTable,
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
    allLoansData,
    loanOverviewData,
  } = useSelector((state: RootState) => state.loans);

  useEffect(() => {
    // @ts-ignore
    dispatch(new LoansAPI().getLoanOverviewData({ page: 0, limit: 10 }));
    // @ts-ignore
    dispatch(new LoansAPI().getLoansKPIData({ page: 0, limit: 10 }));
    // @ts-ignore
    dispatch(new LoansAPI().getMultipleLoans({ page: 0, limit: 10 }));
  }, [dispatch]);

  useEffect(() => {
    console.log({ allLoansData });
    if (allLoansData?.data?.length > 0) {
      const modifiedLoansData = allLoansData.data.map((loan: any) => ({
        customerName: `${loan.first_name} ${loan.last_name}`,
        loanId: loan._id,
        userId: loan.userId,
        amount: `₦ ${formatNumberToMultipleCommas(loan.amount)}`,
        // interest: `₦${(((loan.percentage || 0) / 100) * loan.amount).toFixed(2)}`,
        interest: `${`${loan.percentage}`?.includes("%") ? loan.percentage : `${loan.percentage}%`}`,
        date: loan.repayment_date,
        status: loan.status,
        actions: [],
        metadata: {
          itemPhoto: loan.base64Image || "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
        },
        loanDetails: {
          loanType: loan.type,
          activeStatus: loan.status,
          balance: loan.outstanding,
          job: "Software Engineer",
          relativePhone: loan.guarantor_1_phone,
          accountTier: "Tier 1",
          homeAddress: loan.address,
          highestBalance: 60000,
          income: 120000,
          address: loan.address,
          phoneNumber: loan.phone,
          bvn: loan.bvn,
          nin: loan.nin,
          userId: loan.userId,
          repayment_history: loan.repayment_history,
        }
      }));
      setRows(modifiedLoansData);
    }
  }, [loanOverviewData?.data],);

  return (
    <Reveal>
      <Stack direction="column" spacing={3} paddingX={1} paddingY={1}>
        {loanKPIData.isLoading ? (
          <KPILoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 md:divide-x-2 divide-y-2 lg:divide-0">
            <UsersKPIDisplay
              subtitle={`Total Loans (${formatNumberToMultipleCommas(
                loanKPIData.data.totalLoansCount
              )})`}
              kpiIcon={<AttachMoney sx={{ color: "success.main" }} />}
              total={`₦${formatNumberToMultipleCommas(loanKPIData.data.totalLoansAmount)}`}
            />

            <UsersKPIDisplay
              subtitle={`Active Loans (${formatNumberToMultipleCommas(
                loanKPIData.data.activeLoansCount
              )})`}
              kpiIcon={<HandshakeRounded sx={{ color: "primary.main" }} />}
              total={`₦${formatNumberToMultipleCommas(loanKPIData.data.activeLoansAmount)}`}
            />
            <UsersKPIDisplay
              subtitle={`Due loans (${formatNumberToMultipleCommas(
                loanKPIData.data.dueLoansCount
              )})`}
              kpiIcon={<PersonAdd sx={{ color: "primary.main" }} />}
              total={`₦${formatNumberToMultipleCommas(loanKPIData.data.dueLoansAmount)}`}
            />

            <UsersKPIDisplay
              subtitle={`Overdue Loans (${formatNumberToMultipleCommas(
                loanKPIData.data.overdueLoansAmount
              )})`}
              kpiIcon={<PersonAdd sx={{ color: "primary.main" }} />}
              total={`₦${formatNumberToMultipleCommas(loanKPIData.data.overdueLoansCount)}`}
            />

            <UsersKPIDisplay
              subtitle={`Disbursed Loans (${formatNumberToMultipleCommas(
                loanKPIData.data.disbursedLoansCount
              )})`}
              kpiIcon={<FlagCircleRounded sx={{ color: "error.main" }} />}
              total={`₦${formatNumberToMultipleCommas(loanKPIData.data.disbursedLoansAmount)}`}
            />

            <UsersKPIDisplay
              subtitle={`Repaid Loans (${formatNumberToMultipleCommas(
                loanKPIData.data.repaidLoansCount
              )})`}
              kpiIcon={<FlagCircleRounded sx={{ color: "error.main" }} />}
              total={`₦${formatNumberToMultipleCommas(loanKPIData.data.repaidLoansAmount)}`}
            />
          </div>
        )}

        <Stack
          spacing={1}
          justifyContent="space-between"
          className="bg-white p-4 rounded-[12px]"
        >
          {allLoansData.isLoading ? (
            <PrimaryTableSkeleton />
          ) : (
            <LoanSearchFilterSortPaginateTable
              title="Loans"
              searchParams={["customerName", "loanId", "status"]}
              filterParams={{
                data: [
                  {
                    label: "Date",
                    options: ["Today", "This Week", "This Month", "This Year"],
                  },
                  {
                    label: "Status",
                    options: ["pending", "accepted", "rejected"],
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

        {/* <Stack
          spacing={1}
          justifyContent="space-between"
          className="bg-white p-4 rounded-[12px]"
        >
          {allLoansData.isLoading ? (
            <PrimaryTableSkeleton />
          ) : (
            <LoanSearchFilterSortPaginateTable
              title="Working Loans"
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
        </Stack> */}

        <div className="flex flex-col xl:flex-row gap-6">
          <Stack
            spacing={1}
            justifyContent="space-between"
            className="w-full xl:w-3/5 bg-white p-4 rounded-[12px] self-start"
          >
            <PrimaryBarChart
              title="Loan Transactions"
              data={
                loanKPIData.isLoading
                  ? []
                  : [
                      loanKPIData.data.activeLoansAmount,
                      loanKPIData.data.repaidLoansAmount || 10,
                      loanKPIData.data.dueLoansAmount,
                      loanKPIData.data.overdueLoansAmount || 10,
                    ]
              }
              xLabels={["Active", "Repaid", "Overdue", "Pending"]}
            />
          </Stack>
          <Stack
            spacing={1}
            className="w-full xl:w-2/5 bg-white p-4 rounded-[12px]"
          >
            <PrimaryPieChart
              title="Loan Transactions"
              data={[
                {
                  label: "Active Loans",
                  value: loanKPIData.isLoading
                    ? 0
                    : loanKPIData.data.activeLoansAmount || 0,
                },
                {
                  label: "Repaid Loans",
                  value: loanKPIData.isLoading
                    ? 0
                    : loanKPIData.data.repaidLoansAmount || 0,
                },
                {
                  label: "Overdue Loans",
                  value: loanKPIData.isLoading
                    ? 0
                    : loanKPIData.data.overdueLoansAmount || 0,
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
