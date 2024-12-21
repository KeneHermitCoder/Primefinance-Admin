import { Stack } from "@mui/material";
import { Reveal, } from "../../components";

export function Dashboard() {
  return (
    <>
      <Reveal>
        <Stack direction="column" spacing={3} paddingX={1} paddingY={1}>
          <div>Dashboard goes in here...</div>
        </Stack>
      </Reveal>
    </>
  );
}
