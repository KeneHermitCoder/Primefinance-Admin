import { Stack } from "@mui/material";
import { Reveal, } from "../../components";
import { DashboardAmountDisplay } from "../../components/cards";

export function Dashboard() {
  return (
    <>
      <Reveal>
        <Stack direction="column" spacing={3} paddingX={1} paddingY={1}>
          <div className='flex'>
            <DashboardAmountDisplay />
            <DashboardAmountDisplay />
            <DashboardAmountDisplay />
            <DashboardAmountDisplay />
          </div>
        </Stack>
      </Reveal>
    </>
  );
}
