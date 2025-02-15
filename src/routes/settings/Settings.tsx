import { useState } from "react";
import { Stack } from "@mui/material";
import {
  Reveal,
  SettingsNav,
  GeneralSettings,
  NotificationSettings,
  SystemConfigSettings,
  DataManagementSettings,
  SecurityPrivacySettings,
  UserPermissionsSettings,
  PaymentIntegrationSettings,
} from "../../components";

const navigationData = [
  {
    id: "general",
    component: <GeneralSettings />,
  },
  {
    id: "notifications",
    component: <NotificationSettings />,
  },
  {
    id: "security_&_privacy",
    component: <SecurityPrivacySettings />,
  },
  {
    id: 'user_permissions',
    component: <UserPermissionsSettings />
  },
  {
    id: 'payment_integrations',
    component: <PaymentIntegrationSettings />
  },
  {
    id: 'system_config',
    component: <SystemConfigSettings />
  },
  {
    id: 'data_management',
    component: <DataManagementSettings />
  },
]

export default function Settings() {
  const [currentNavItem, setCurrentNavItem] = useState(navigationData[0]);
  const handleClickAction = (target: string) => {
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
