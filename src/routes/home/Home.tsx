import { Stack } from "@mui/material";
import heroDesktop from "../../assets/images/hero-desktop.png";
import {
  SEO,
  Reveal,
} from "../../components";

export function Home() {
  return (
    <>
      <SEO
        addUrl={true}
        image={heroDesktop}
        title="PrimeFinance | Do More with One App"
        description="PrimeFinance | Do More with One App"
      />
      <Stack direction="column" spacing={10} paddingY={12} paddingX={2}>
        <Reveal>
          <div>Something goes in here...</div>
        </Reveal>
      </Stack>
    </>
  );
};