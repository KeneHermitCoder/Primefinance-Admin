import { Stack } from "@mui/material";
import { Reveal } from "../../components";
import images from "../../constants/images";
import { DashboardAmountDisplay } from "../../components/cards";
import { ArrowCircleDown, ArrowCircleUp } from "@mui/icons-material";

export function Dashboard() {
  return (
    <>
      <Reveal>
        <Stack spacing={3} paddingX={1} paddingY={1}>
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
          <Stack direction="row" spacing={2.5} justifyContent="space-between">
            <Stack
              direction="row"
              spacing={2.5}
              justifyContent="space-between"
              className="w-2/5 bg-white p-4 rounded-[12px]"
            >
              <div className="w-full">Stack 1 </div>
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
                <div className="w-full">Stack 2 </div>
              </Stack>
              <Stack
                direction="row"
                spacing={2.5}
                justifyContent="space-between"
                className="bg-white p-4 rounded-[12px]"
              >
                <div className="w-full">Stack 3 </div>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Reveal>
    </>
  );
}
