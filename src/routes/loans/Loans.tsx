import { RootState } from "../../features";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from '@mui/icons-material/Info';
import { Stack, TableCell } from "@mui/material";
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
    if (loanOverviewData?.data?.length > 0) {
      const modifiedLoansData = loanOverviewData.data.map((loan: any) => ({
        customerName: `${loan.first_name} ${loan.last_name}`,
        loanId: loan.id,
        amount: `₦${loan.amount}`,
        interest: `₦${((loan.percentage / 100) * loan.amount).toFixed(2)}`,
        date: loan.repayment_date,
        status: loan.status,
        actions: <div>Hello</div>,
        metadata: {
          itemPhoto: "https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80",
        },
      }));
      setRows(modifiedLoansData);
    }
    // } else {
    //   // Fallback to sample data if API response is empty or unavailable
      setRows([
        {
          loanId: 1,
          interest: 2000,
          status: "overdue",
          customerName: "John Doe",
          amount: 50000,
          date: "active",
          actions: ['creditCheck', 'loanDetails'],
          loanDetails: {
            loanType: "request",
            activeStatus: "accepted",
            balance: 50000,
            job: "Software Engineer",
            relativePhone: 2348001234567,
            accountTier: "Tier 1",
            homeAddress: "123 Main St, Lagos, Nigeria",
            highestBalance: 60000,
            income: 120000,
            address: "123 Main St, Lagos, Nigeria",
            phoneNumber: 2348001234567,
            bvn: "123456789012345",
            nin: "9876543210",
          },
          creditChecks: [{
            lastReported: "2025-01-15",
            creditorName: "ABC Bank",
            totalDebt: "₦10,000",
            accountype: "savings",
            outstandingBalance: 2000,
            activeLoan: 1,
            loansTaken: 3,
            income: 120000,
            repaymentHistory: "Good",
            openedDate: "2020-01-01",
            lengthOfCreditHistory: "5 years",
            remarks: "Creditworthy",
          }],
        },
        {
          loanId: 2,
          interest: 2000,
          status: "overdue",
          customerName: "DevWizard",
          amount: 75000,
          actions: ['creditCheck', 'loanDetails'],
          loanDetails: {
            loanType: "request",
            activeStatus: "pending",
            balance: 75000,
            job: "Teacher",
            relativePhone: 2349001234567,
            accountTier: "Tier 2",
            homeAddress: "456 Park Ave, Lagos, Nigeria",
            highestBalance: 80000,
            income: 90000,
            address: "456 Park Ave, Lagos, Nigeria",
            phoneNumber: 2349001234567,
            bvn: "987654321098765",
            nin: "1234567890",
          },
          creditCheck: {
            lastReported: "2025-01-10",
            creditorName: "XYZ Bank",
            totalDebt: "₦15,000",
            accountype: "current",
            outstandingBalance: 5000,
            activeLoan: 1,
            loansTaken: 2,
            income: 90000,
            repaymentHistory: "Fair",
            openedDate: "2019-06-15",
            lengthOfCreditHistory: "6 years",
            remarks: "Needs attention",
          },
        },
      ]);
    // }
  }, [loanOverviewData?.data],);

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
              total={`₦${formatNumberToMultipleCommas(loanKPIData.data.totalLoansRevenue)}`}
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
            <PrimaryBarChart
              title="Loan Transactions"
              data={loanKPIData.isLoading ? ([]) : [
                loanKPIData.data.activeLoansRevenue,
                loanKPIData.data.repaidLoansRevenue || 10,
                loanKPIData.data.dueLoansRevenue,
                loanKPIData.data.overdueLoansRevenue || 10,
              ]}
              xLabels={["Active", "Repaid", "Overdue", "Pending"]}
            />
          </Stack>
          <Stack
            spacing={1}
            className="w-full md:w-2/5 bg-white p-4 rounded-[12px]"
          >
            <PrimaryPieChart
              title="Loan Transactions"
              data={[
                {
                  label: "Active Loans",
                  value: loanKPIData.isLoading ? 0 : loanKPIData.data.activeLoansRevenue || 20,
                },
                {
                  label: "Repaid Loans",
                  value: loanKPIData.isLoading ? 0 : loanKPIData.data.repaidLoansRevenue || 30,
                },
                {
                  label: "Overdue Loans",
                  value: loanKPIData.isLoading ? 0 : loanKPIData.data.overdueLoansRevenue || 40,
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
