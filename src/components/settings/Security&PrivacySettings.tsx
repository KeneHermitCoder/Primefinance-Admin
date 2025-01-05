import { ChevronRight } from "@mui/icons-material";
import { Stack, Switch, TextField } from "@mui/material";

export default function SecurityPrivacySettings() {
  return (
    <Stack spacing={4} width="100%">
      <h2 className="text-2xl text-gray-700 font-semibold">
        Security & Privacy
      </h2>
      <Stack
        spacing={3}
        borderBottom="1px solid rgb(201, 206, 217)"
        paddingBottom="2rem"
      >
        <Stack
          direction="column"
          spacing={3}
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack width="100%" spacing={0.5}>
            <h3 className="text-lg text-gray-700 font-semibold">
              Admin Login
            </h3>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <p className="text-md text-gray-500 font-semibold w-full">
                Payment Reminders
              </p>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                className="md:w-3/12"
              >
                <Switch />
                <span className="text-xs text-gray-500">Not Enabled</span>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Stack>
                <h4 className="text-md text-gray-500 font-semibold w-full">
                  Set Password Complexity Rules
                </h4>
                <p className="text-sm text-gray-500 w-full">
                  Character limit warning for concise messages
                </p>
              </Stack>
              <Stack direction="row" className='cursor-pointer'>
                <span className="text-md text-gray-500 font-semibold w-full">
                  Set
                </span>
                <ChevronRight />
              </Stack>
            </Stack>
          </Stack>

          <Stack width="100%" spacing={0.5}>
            <h3 className="text-lg text-gray-700 font-semibold">
              Access Logs
            </h3>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <p className="text-md text-gray-500 font-semibold w-full">
                IP Address
              </p>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                className="md:w-3/12"
              >
                <Switch />
                <span className="text-xs text-gray-500">Not Enabled</span>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Stack>
                <h4 className="text-md text-gray-500 font-semibold w-full">
                  Timestamps
                </h4>
                <p className="text-sm text-gray-500 w-full">
                  Character limit warning for concise messages
                </p>
              </Stack>
              <TextField
                label="180"
                variant="outlined"
                size="small"
                className="md:w-2/12"
              />
            </Stack>
          </Stack>

          <Stack width="100%" spacing={0.5}>
            <h3 className="text-lg text-gray-700 font-semibold">
              Session Management
            </h3>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <p className="text-md text-gray-500 font-semibold w-full">
                Failed Transaction
              </p>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                className="md:w-3/12"
              >
                <Switch />
                <span className="text-xs text-gray-500">Not Enabled</span>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <p className="text-md text-gray-500 font-semibold w-full">
                Suspicious Activities
              </p>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                className="md:w-3/12"
              >
                <Switch defaultChecked />
                <span className="text-xs text-gray-500">Enabled</span>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack alignItems="flex-end">
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Settings
        </button>
      </Stack>
    </Stack>
  );
}