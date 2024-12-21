import { Stack } from "@mui/material";
import { Reveal, } from "../../components";

export default function Bills() {
  return (
    <>
      <Reveal>
        <Stack direction="column" spacing={3} paddingX={1} paddingY={1}>
          <div>Bills goes in here...</div>
        </Stack>
      </Reveal>
    </>
  );
}