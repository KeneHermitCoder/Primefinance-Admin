import { Stack, Tooltip } from "@mui/material";
import { Backup, Notifications, Payment, Person4, Security, Settings, SystemSecurityUpdateGood } from "@mui/icons-material";

export default function SettingsNav({
  clickAction,
}: {
  clickAction?: (target: string) => void;
}) {
  return (
    <nav className="flex flex-col bg-white w-auto lg:w-5/12 h-full overflow-y-scroll">
      <Tooltip
        arrow
        title="General Settings: Platform Name, Default Currency"
      >
        <Stack
          direction="row"
          padding={1}
          alignItems="center"
          className="border-b hover:bg-gray-50 cursor-pointer"
          onClick={() => clickAction && clickAction("general")}
        >
          <Stack className="p-2 md:p-3 lg:p-4">
            <Settings />
          </Stack>
          <div className="hidden lg:block">
            <h3 className="text-md text-gray-700 font-semibold">
              General Settings
            </h3>
            <p className="text-xs text-gray-500">
              Platform Name, Default Currency
            </p>
          </div>
        </Stack>
      </Tooltip>

      <Tooltip title="Notification Settings: Email Notification, SMS Notification" arrow>
        <Stack
          direction="row"
          padding={1}
          alignItems="center"
          className="border-b hover:bg-gray-50 cursor-pointer"
          onClick={() => clickAction && clickAction("notifications")}
        >
          <Stack className="p-2 md:p-3 lg:p-4">
            <Notifications />
          </Stack>
          <div className="hidden lg:block">
            <h3 className="text-md text-gray-700 font-semibold">
              Notification Settings
            </h3>
            <p className="text-xs text-gray-500 w-full">
              Email Notification, SMS Notification
            </p>
          </div>
        </Stack>
      </Tooltip>

      <Tooltip title="Security & Privacy: Admin Login Settings, Access Logs" arrow>
        <Stack
          direction="row"
          padding={1}
          alignItems="center"
          className="border-b hover:bg-gray-50 cursor-pointer"
          onClick={() => clickAction && clickAction("security_&_privacy")}
        >
          <Stack className="p-2 md:p-3 lg:p-4">
            <Security />
          </Stack>
          <div className="hidden lg:block">
            <h3 className="text-md text-gray-700 font-semibold">
              Security & Privacy
            </h3>
            <p className="text-xs text-gray-500">
              Admin Login Settings, Access Logs...
            </p>
          </div>
        </Stack>
      </Tooltip>

      <Tooltip title="User Permissions: Session Management, Role-Based" arrow>
        <Stack
          direction="row"
          padding={1}
          alignItems="center"
          className="border-b hover:bg-gray-50 cursor-pointer"
          onClick={() => clickAction && clickAction("user_permissions")}
        >
          <Stack className="p-2 md:p-3 lg:p-4">
            <Person4 />
          </Stack>
          <div className="hidden lg:block">
            <h3 className="text-md text-gray-700 font-semibold">
              User Permissions
            </h3>
            <p className="text-xs text-gray-500">
              Session Management, Role-Based...
            </p>
          </div>
        </Stack>
      </Tooltip>

      <Tooltip title="Payment Integrations: Manage Payment Gateways" arrow>
        <Stack
          direction="row"
          padding={1}
          alignItems="center"
          className="border-b hover:bg-gray-50 cursor-pointer"
          onClick={() => clickAction && clickAction("payment_integrations")}
        >
          <Stack className="p-2 md:p-3 lg:p-4">
            <Payment />
          </Stack>
          <div className="hidden lg:block">
            <h3 className="text-md text-gray-700 font-semibold">
              Payment Integrations
            </h3>
            <p className="text-xs text-gray-500">Manage Payment Gateways</p>
          </div>
        </Stack>
      </Tooltip>

      <Tooltip title="System Configurations: API Keys, Platform Uptime" arrow>
        <Stack
          direction="row"
          padding={1}
          alignItems="center"
          className="border-b hover:bg-gray-50 cursor-pointer"
          onClick={() => clickAction && clickAction("system_config")}
        >
          <Stack className="p-2 md:p-3 lg:p-4">
            <SystemSecurityUpdateGood />
          </Stack>
          <div className="hidden lg:block">
            <h3 className="text-md text-gray-700 font-semibold">
              System Configurations
            </h3>
            <p className="text-xs text-gray-500">API Keys, Platform Uptime</p>
          </div>
        </Stack>
      </Tooltip>

      <Tooltip title="Data Management: Backup Settings, Data Retention" arrow>
        <Stack
          direction="row"
          padding={1}
          alignItems="center"
          className="border-b hover:bg-gray-50 cursor-pointer"
          onClick={() => clickAction && clickAction("data_management")}
        >
          <Stack className="p-2 md:p-3 lg:p-4">
            <Backup />
          </Stack>
          <div className="hidden lg:block">
            <h3 className="text-md text-gray-700 font-semibold">
              Data Management
            </h3>
            <p className="text-xs text-gray-500">Backup Settings, Data Retention</p>
          </div>
        </Stack>
      </Tooltip>
    </nav>
  );
}
