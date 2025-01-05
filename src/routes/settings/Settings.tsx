import { Stack } from "@mui/material";
import {
  GeneralSettings,
  NotificationSettings,
  Reveal,
  SettingsNav,
} from "../../components";
import { useState } from "react";

const navigationData = [
  {
    id: "general",
    component: <GeneralSettings />,
  },
  {
    id: "notifications",
    component: <NotificationSettings />,
  },
];

export default function Settings() {
  const [currentNavItem, setCurrentNavItem] = useState(navigationData[0]);
  const handleClickAction = (target: string) => {
    console.log(target);
    const item = navigationData.find((item) => item.id === target);
    if (item) setCurrentNavItem(item);
  };
  return (
    <Reveal>
      <Stack
        direction="row"
        spacing={3}
        paddingX={1}
        paddingY={1}
        height="100%"
      >
        <SettingsNav clickAction={handleClickAction} />
        {currentNavItem.component}
      </Stack>
    </Reveal>
  );
}
