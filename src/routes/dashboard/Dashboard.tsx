import { Stack, } from "@mui/material";
import images from "../../constants/images";
import { BillsOverviewItem, Reveal, } from "../../components";
import { ArrowCircleDown, ArrowCircleUp, } from "@mui/icons-material";
import { DashboardAmountDisplay, LoanStatus, } from "../../components/";

export function Dashboard() {
  return (
    <>
      <Reveal>
        <Stack spacing={4} paddingX={1} paddingY={1}>
          <Stack direction="row" spacing={2.5} justifyContent="space-between">
            <DashboardAmountDisplay
              title="Total revenue"
              amount="$100,000"
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
              amount="4500"
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
              amount="$50,000"
              backgroundColour="#d1e9fd"
              bottomItem={
                <div className="w-full flex justify-start items-center px-2 py-3 text-[#2699fb] text-2xl">{`+50 pending`}</div>
              }
            />
            <DashboardAmountDisplay
              title="Total Revenue"
              amount="$100,826"
              backgroundColour="#f5eac9"
            />
          </Stack>
          <Stack
            direction="row"
            spacing={2.5}
            justifyContent="space-between"
            alignItems="start"
          >
            <Stack
              spacing={2.5}
              justifyContent="space-between"
              className="w-2/5 bg-white p-4 rounded-[12px]"
            >
              <Stack className="w-full text-xl">Loan Status</Stack>
              <Stack
                justifyContent="space-between"
                paddingX={4}
                spacing={2}
                direction="row"
              >
                <Stack justifyContent="center" alignItems="center">
                  <span className="text-3xl font-semibold">950</span>
                  <span className="text-gray-600 font-hairline text-xs">
                    Active loans
                  </span>
                </Stack>
                <Stack justifyContent="space-between" alignItems="center">
                  <span className="text-3xl font-semibold">250</span>
                  <span className="text-gray-600 font-hairline text-xs">
                    Repaid loans
                  </span>
                </Stack>
                <Stack justifyContent="space-between" alignItems="center">
                  <span className="text-3xl font-semibold">45</span>
                  <span className="text-gray-600 font-hairline text-xs">
                    Overdue loans
                  </span>
                </Stack>
              </Stack>
              <Stack spacing={1.5}>
                <LoanStatus
                  name="John Doe"
                  status="failed"
                  timestamp="12:37"
                  details="Loan failed"
                  photo="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                />
                <LoanStatus
                  name="Kene Nnakwue"
                  status="success"
                  timestamp="17:37"
                  details="Loan successful"
                  photo="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                />
                <LoanStatus
                  name="Code Hermit"
                  status="overdue"
                  timestamp="19:00"
                  details="Loan overdue since 12/12/2024"
                  photo="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                />
                <LoanStatus
                  name="Lord Cypher"
                  status="success"
                  timestamp="04:50"
                  details="Loan successful"
                  photo="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
                />
              </Stack>
            </Stack>
            <Stack
              spacing={2.5}
              justifyContent="space-between"
              className="w-3/5"
            >
              <Stack
                direction="row"
                spacing={2.5}
                justifyContent="space-between"
                className="bg-white p-4 rounded-[12px]"
              >
                <div className="w-full">Stack 2</div>
              </Stack>
              <Stack
                spacing={1}
                justifyContent="space-between"
                className="bg-white p-4 rounded-[12px]"
              >
                <div className="w-full text-xl">Bills Overview</div>
                <Stack className="border border-gray-200 rounded-[12px] divide-y">
                  <BillsOverviewItem
                    key="airtime-3bdd92d-1e3e-4d7d-8a1e-6d7c0a0a0a0a"
                    id="airtime-3bdd92d-1e3e-4d7d-8a1e-6d7c0a0a0a0a"
                    name="Kene Nnakwue"
                    status="completed"
                    amount={`₦2,000`}
                    type="Airtime"
                    onClick={(e: React.MouseEvent) => {
                      console.log(`clicked ${e.target}`);
                    }}
                  />
                  <BillsOverviewItem
                    key="gift-card-3bdd92d-1e3e-4d7d-8a1e-6d7c0a0a0a0a"
                    id="gift-card-3bdd92d-1e3e-4d7d-8a1e-6d7c0a0a0a0a"
                    name="Philemon Adamu"
                    status="pending"
                    amount={`₦34,000`}
                    type="Gift Card"
                    onClick={(e: React.MouseEvent) => {
                      console.log(`clicked ${e.target}`);
                    }}
                  />
                  <BillsOverviewItem
                    key="internet-3bdd92d-1e3e-4d7d-8a1e-6d7c0a0a0a0a"
                    id="internet-3bdd92d-1e3e-4d7d-8a1e-6d7c0a0a0a0a"
                    name="Lord Cypher"
                    status="failed"
                    amount={`₦48,000`}
                    type="Internet"
                    onClick={(e: React.MouseEvent) => {
                      console.log(`clicked ${e.target}`);
                    }}
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Reveal>
    </>
  );
}