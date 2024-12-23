import { Stack, Box } from "@mui/material";
import { Reveal, } from "../../components";

export default function Transactions() {
  return (
    <>
      <Reveal>
        <Stack direction="column" spacing={3} paddingX={1} paddingY={1} >
          <Stack direction="row" spacing={2} padding={1} justifyContent={'space-between'} className="bg-dark rounded-full">
            <Box>Card 1</Box>
            <Box>Card 2</Box>
            <Box>Card 3</Box>
            <Box>Card 4</Box>
          </Stack>
        </Stack>
      </Reveal>
    </>
  );
}