import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
import images from "../../constants/images";
import { ArrowCircleDown, ArrowCircleUp, TrendingDown, TrendingUp } from "@mui/icons-material";
import { formatNumberToMultipleCommas, loanStatusHandler, tableFilterAction, } from "../../utils";
import {
  LoanStatus,
  PrimaryTableSkeleton,
  DashboardAmountDisplay,
} from "../../components/";
import {
  Reveal,
  PrimaryPieChart,
  PrimaryLineChart,
  LoanSearchFilterSortPaginateTable,
} from "../../components";
import { RootState } from "../../features";
import { useEffect, useState } from "react";
import { UsersAPI } from "../../features/users";
import LoansAPI from "../../features/loans/LoansAPI";
import { useDispatch, useSelector } from "react-redux";
import { TransactionsAPI } from "../../features/transactions";

export function Dashboard() {
  const dispatch = useDispatch();
  const [rows, setRows] = useState<{ [key: string]: any }[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const { loanKPIData, allLoansData } = useSelector((state: RootState) => state.loans);
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
    console.log({allLoansData })

    if (!allLoansData.isLoading && Array.isArray(allLoansData.data)) {
      const modifiedLoansData = allLoansData.data.map((loan: any) => {
        console.log({ loanStatus: getLoanStatusDetails(loan) });
        return ({
        customerName: `${loan.first_name} ${loan.last_name}`,
        loanId: loan._id,
        userId: loan.userId,
        amount: `₦ ${formatNumberToMultipleCommas(loan.amount)}`,
        outstanding: `₦ ${formatNumberToMultipleCommas(loan.outstanding)}`,
        interest: `${loan.percentage?.includes("%") ? loan.percentage : `${loan.percentage}%`}`,
        dateTaken: new Date(loan.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
        dueDate: loan.repayment_date,
        status: Object.entries(loanStatusHandler(loan)).find(([_key, handler]) => handler())?.at(0) || 'failed',
        actions: [],
        metadata: {
          itemPhoto: loan.base64Image || "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
        },
        repaymentStatus: loan.loan_payment_status,
        loanDetails: {
          loanType: loan.type,
          activeStatus: loan.status,
          balance: loan.outstanding,
          job: loan.job || "N/A",
          dob: loan.dob || "N/A",
          relativePhone: [loan.guarantor_1_phone, loan.guarantor_2_phone].filter(Boolean).join(", "),
          accountTier: "Tier 1",
          homeAddress: loan.address,
          highestBalance: 60000,
          income: 120000,
          address: !loan.address || loan.address === 'undefined' ? "N/A" : loan.address,
          phoneNumber: loan.phone,
          bvn: loan.bvn,
          nin: loan.nin,
          userId: loan.userId,
          duration: loan.duration,
          repayment_history: loan.repayment_history,
        }
      })});
      setRows(modifiedLoansData);
    }
  }, [allLoansData.data, allLoansData.isLoading]);

  // Add this helper function at the top of the component
  const getLoanStatusDetails = (row: any) => {
    const repaymentDate = row.dueDate ? new Date(row.dueDate) : null;
    const isValidDate = repaymentDate && !isNaN(repaymentDate.getTime());
    const isOverdue = isValidDate && repaymentDate < new Date();

    if (row.repaymentStatus === "complete") return "Loan completed";
    if (row.status === "accepted") {
      if (row.repaymentStatus === "in-progress") {
        return isOverdue ? "Loan overdue" : "Loan in progress";
      }
      return isOverdue ? "Loan overdue" : "Loan in progress";
    }
    if (row.status === "pending") return "Loan pending";
    return "Loan " + row.status;
  };

  // Replace the existing loan status rendering with this simplified version
  const renderLoanStatuses = (startIndex: number, endIndex: number) => {
    return rows.slice(startIndex, endIndex).map((row: any) => (
      <LoanStatus
        key={row.loanId}
        name={row.customerName}
        // status={[row.repaymentStatus, row.status]}
        status={row.status}
        timestamp={row.dueDate}
        details={getLoanStatusDetails(row)}
        photo={row.metadata.itemPhoto}
      />
    ));
  };

  // Replace the pagination controls with this simplified version
  const renderPaginationControls = () => {
    if (rows.length <= 5) return null;

    return (
      <div className="flex justify-center">
        {rows.length <= 10 ? (
          <button 
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? 'See Less' : 'See More'}
          </button>
        ) : (
          <>
            <button 
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'See Less' : 'See More'}
            </button>
            <Link
              to="/loans"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium ml-4"
            >
              View All Loans
            </Link>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <Reveal>
        <Stack spacing={4} paddingX={1} paddingY={1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            <DashboardAmountDisplay
              title="Total transactions"
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
              title="Debit transactions" 
              amount={`₦${formatNumberToMultipleCommas(transactionKPIData.data.debitTransactions || 0)}`}
              backgroundColour="#FFE6E6"
              trIcon={<ArrowCircleDown style={{ color: "#D32F2F" }} />}
              bottomItem={
                <div className="w-full flex justify-start items-center px-3 pt-2 pb-1">
                  <TrendingDown sx={{ color: "#D32F2F", fontSize: 48 }} />
                  <TrendingDown sx={{ color: "#D32F2F", fontSize: 48 }} />
                  <TrendingDown sx={{ color: "#D32F2F", fontSize: 48 }} />
                </div>
              }
            />
            <DashboardAmountDisplay
              title="Credit transactions"
              amount={`₦${formatNumberToMultipleCommas(transactionKPIData.data.creditTransactions || 0)}`}
              backgroundColour="#CCEFDD"
              trIcon={<ArrowCircleUp style={{ color: "#15792b" }} />}
              bottomItem={
                <div className="w-full flex justify-start items-center px-3 pt-2 pb-1">
                  <TrendingUp sx={{ color: "#15792b", fontSize: 48 }} />
                  <TrendingUp sx={{ color: "#15792b", fontSize: 48 }} />
                  <TrendingUp sx={{ color: "#15792b", fontSize: 48 }} />
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
                {rows.length > 0 && (
                  <>
                    {renderLoanStatuses(0, 5)}
                    {showMore && renderLoanStatuses(5, 10)}
                    {renderPaginationControls()}
                  </>
                )}
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
                          options: ["Today", "This Week", "This Month", "This Year"],
                        },
                        {
                          label: "Status",
                          options: [...new Set(rows.map((row) => row.status))],
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
                        id: "outstanding",
                        numeric: true,
                        label: "Outstanding",
                      },
                      {
                        id: "interest",
                        numeric: true,
                        label: "Interest",
                      },
                      {
                        id: "dateTaken",
                        numeric: false,
                        label: "Date Taken",
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