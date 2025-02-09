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
  SearchFilterSortPaginateTable,
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

  const { loanKPIData, loanOverviewData } = useSelector(
    (state: RootState) => state.loans
  );
  const { userKPIData, } = useSelector((state: RootState) => state.users);
  const { transactionKPIData, } = useSelector((state: RootState) => state.transactions);

  useEffect(() => {
    // Fetch loans when the component mounts
    // @ts-ignore
    dispatch(new LoansAPI().getLoanOverviewData({ page: 0, limit: 10 }));
    // @ts-ignore
    dispatch(new LoansAPI().getLoansKPIData({ page: 0, limit: 10 }));

    // @ts-ignore
    dispatch(new UsersAPI().getUsersKPIData());

    // @ts-ignore
    dispatch(new TransactionsAPI().getTransactionsKPIData());
  }, [dispatch]);
  useEffect(() => {
    if (loanOverviewData?.data?.length > 0) {
      const modifiedLoansData = loanOverviewData.data.map((loan: any) => ({
        customerName: `${loan.first_name} ${loan.last_name}`,
        loanId: loan.id,
        amount: `₦${loan.amount}`,
        interest: `₦${((loan.percentage / 100) * loan.amount).toFixed(2)}`,
        date: loan.repayment_date,
        status: loan.status,
        metadata: {
          itemPhoto: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
        },
      }));
      setRows(modifiedLoansData);
    }
  }, [loanOverviewData.data, setRows]);
  return (
    <>
      <Reveal>
        <Stack spacing={4} paddingX={1} paddingY={1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            <DashboardAmountDisplay
              title="Total revenue"
              amount={`₦${formatNumberToMultipleCommas(transactionKPIData.data.totalTransactions)}`}
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
              amount={formatNumberToMultipleCommas(userKPIData.data.totalUsersCount)}
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
              amount={`₦${formatNumberToMultipleCommas(loanKPIData.data.totalLoansRevenue)}`}
              backgroundColour="#f5eac9"
            />
          </div>
          <div className="flex flex-col xl:flex-row gap-6">
            <Stack
              spacing={2.5}
              // justifyContent="space-between"
              className="w-full xl:w-2/5 bg-white p-4 rounded-[12px] self-start"
            >
              <PrimaryPieChart
                title="Loan Transactions"
                data={[
                  {
                    label: "Active Loans",
                    value: loanKPIData.isLoading ? 0 : loanKPIData.data.activeLoansRevenue || 0 ,
                  },
                  {
                    label: "Repaid Loans",
                    value: loanKPIData.isLoading ? 0 : loanKPIData.data.repaidLoansRevenue || 0,
                  },
                  {
                    label: "Overdue Loans",
                    value: loanKPIData.isLoading ? 0 : loanKPIData.data.overdueLoansRevenue || 0,
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
                      photo={
                        row.metadata.itemPhoto ||
                        "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                      }
                    />
                  ))}
                {/* <LoanStatus
                  name="John Doe"
                  status="failed"
                  timestamp="12:37"
                  details="Loan failed"
                  photo="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                /> */}
              </Stack>
            </Stack>
            <Stack
              spacing={2.5}
              // justifyContent="space-between"
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
                {loanOverviewData.isLoading ? (
                  <PrimaryTableSkeleton />
                  // THIS SHOULD UODATUPDATED WHEN 404 IN NO LONGER BEING TRHOWN FROM THE BACKEND
                // ) : loanOverviewData.error ? (
                //   <TableErrorComponent
                //     message={loanOverviewData.error}
                //     onRetry={() => {
                //       // @ts-ignore
                //       dispatch(new LoansAPI().getLoanOverviewData({ page: 0, limit: 10, }));
                //     }}
                //   />
                // ) : (
                ) : (
                  <SearchFilterSortPaginateTable
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
            </Stack>
          </div>
          {/* </Stack> */}
        </Stack>
      </Reveal>
    </>
  );
}