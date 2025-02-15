import { Stack } from "@mui/material";
import images from "../../constants/images";
import { ArrowCircleDown, ArrowCircleUp, } from "@mui/icons-material";
import { formatNumberToMultipleCommas, tableFilterAction, } from "../../utils";
import {
  LoanStatus,
  PrimaryTableSkeleton,
  DashboardAmountDisplay,
  // TableErrorComponent,
} from "../../components/";
import {
  Reveal,
  PrimaryPieChart,
  PrimaryLineChart,
  LoanSearchFilterSortPaginateTable,
} from "../../components";
import LoansAPI from "../../features/loans/LoansAPI";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features";
import { UsersAPI } from "../../features/users";
import { TransactionsAPI } from "../../features/transactions";

export function Dashboard() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState<{ [key: string]: any }[]>([]);

  const { loanKPIData, allLoansData } = useSelector(
    (state: RootState) => state.loans
  );
  const { userKPIData, } = useSelector((state: RootState) => state.users);
  const { transactionKPIData, } = useSelector((state: RootState) => state.transactions);

  useEffect(() => {
    // Fetch loans when the component mounts
    // @ts-ignore
    dispatch(new LoansAPI().getMultipleLoans({ page: 0, limit: 10 }));
    // @ts-ignore
    dispatch(new LoansAPI().getLoansKPIData({ page: 0, limit: 10 }));

    // @ts-ignore
    dispatch(new UsersAPI().getUsersKPIData());

    // @ts-ignore
    dispatch(new TransactionsAPI().getTransactionsKPIData());
  }, [dispatch]);

  useEffect(() => {
    if (!allLoansData.isLoading && Array.isArray(allLoansData.data)) {
      const modifiedLoansData = allLoansData.data.map((loan: any) => ({
        customerName: `${loan.first_name} ${loan.last_name}`,
        loanId: loan._id,
        userId: loan.userId,
        amount: `₦ ${formatNumberToMultipleCommas(loan.amount)}`,
        interest: `${loan.percentage?.includes("%") ? loan.percentage : `${loan.percentage}%`}`,
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
  }, [allLoansData.data, allLoansData.isLoading]);

  return (
    <>
      <Reveal>
        <Stack spacing={4} paddingX={1} paddingY={1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <DashboardAmountDisplay
              title="Total revenue"
              amount={`₦${formatNumberToMultipleCommas(transactionKPIData.data.transactionsWithoutLoan)}`}
              trIcon={<ArrowCircleUp style={{ color: "#15792b" }} />}
              backgroundColour="#CCEFDD"
              bottomItem={
                <div className="w-full flex justify-center items-center pr-5">
                  <img alt="" src={images.totalRevenueIndicator} />
                </div>
              }
            />
            <DashboardAmountDisplay
              title="Total users"
              amount={formatNumberToMultipleCommas(userKPIData.data.totalUsersCount ?? 0)}
              trIcon={<ArrowCircleDown style={{ color: "#151e79" }} />}
              backgroundColour="#FFFFFF"
              bottomItem={
                <div className="w-full flex justify-center items-center px-5 pb-1">
                  <img alt="" src={images.totalUsersIndicator} />
                </div>
              }
            />
            <DashboardAmountDisplay
              title="Escrow funds"
              amount="₦0"
              backgroundColour="#d1e9fd"
              bottomItem={
                <div className="w-full flex justify-start items-center px-2 py-3 text-[#2699fb] text-2xl">{`+0 pending`}</div>
              }
            />
            <DashboardAmountDisplay
              title="Total Loans Revenue"
              amount={`₦${formatNumberToMultipleCommas(loanKPIData.data.loansRevenue)}`}
              backgroundColour="#f5eac9"
            />
          </div>
          <div className="flex flex-col xl:flex-row gap-6">
            <Stack
              spacing={2.5}
              className="w-full xl:w-2/5 bg-white p-4 rounded-[12px] self-start"
            >
              <PrimaryPieChart
                title="Loan Transactions"
                data={[
                  {
                    label: "Active Loans",
                    value: loanKPIData.isLoading ? 0 : loanKPIData.data.activeLoansAmount || 0 ,
                  },
                  {
                    label: "Repaid Loans",
                    value: loanKPIData.isLoading ? 0 : loanKPIData.data.repaidLoansAmount || 0,
                  },
                  {
                    label: "Overdue Loans",
                    value: loanKPIData.isLoading ? 0 : loanKPIData.data.overdueLoansAmount || 0,
                  },
                ]}
                metadata={{
                  currency: "₦",
                }}
              />
              <Stack spacing={1.5}>
                {rows.length > 0 &&
                  rows.map((row: any) => (
                    <LoanStatus
                      key={row.loanId}
                      name={row.customerName}
                      status={row.status}
                      timestamp={row.date}
                      details={
                        row.status === "success"
                          ? "Loan successful"
                          : row.date < new Date()
                          ? "Loan due"
                          : "Loan overdue"
                      }
                      photo={row.metadata.itemPhoto}
                    />
                  ))}
              </Stack>
            </Stack>
            <Stack
              spacing={2.5}
              className="w-full xl:w-3/5"
            >
              <Stack
                direction="row"
                spacing={2.5}
                justifyContent="space-between"
                className="bg-white p-4 rounded-[12px]"
              >
                <PrimaryLineChart title="Transaction" />
              </Stack>
              <Stack
                spacing={1}
                justifyContent="space-between"
                className="bg-white p-4 rounded-[12px]"
              >
                {allLoansData.isLoading ? (
                  <PrimaryTableSkeleton />
                ) : (
                  <LoanSearchFilterSortPaginateTable
                    title="Loan Overview"
                    searchParams={["customerName", "loanId", "status"]}
                    filterParams={{
                      data: [
                        {
                          label: "Date",
                          options: [
                            "Today",
                            "This Week",
                            "This Month",
                            "This Year",
                          ],
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
                    isLoading={allLoansData.isLoading}
                  />
                )}
              </Stack>
            </Stack>
          </div>
        </Stack>
      </Reveal>
    </>
  );
}