import { Stack, TextField } from "@mui/material";

export default function GeneralSettings() {
  return (
    <Stack spacing={4} width="100%">
      <h2 className="text-2xl text-gray-700 font-semibold">General Settings</h2>
      <Stack
        spacing={3}
        borderBottom="1px solid rgb(201, 206, 217)"
        paddingBottom="2rem"
      >
        <Stack
          direction="row"
          spacing={3}
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack spacing={0.5}>
            <h3 className="text-md text-gray-700 font-semibold">
              Platform Name
            </h3>
            <p className="text-sm text-gray-500">Edit the platform name</p>
          </Stack>
          <TextField label="Platform Name" variant="outlined" size="small" />
        </Stack>

        <Stack
          direction="row"
          spacing={3}
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack spacing={0.5}>
            <h3 className="text-md text-gray-700 font-semibold">
              Default Currency
            </h3>
            <p className="text-sm text-gray-500">
              Select a default currency for transactions
            </p>
          </Stack>
          <TextField label="N" variant="outlined" size="small" />
        </Stack>

        <Stack
          direction="row"
          spacing={3}
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack spacing={0.5}>
            <h3 className="text-md text-gray-700 font-semibold">Time zone</h3>
            <p className="text-sm text-gray-500">
              Set the default time zone for all operations
            </p>
          </Stack>
          <TextField label="GTM" variant="outlined" size="small" />
        </Stack>

        <Stack
          direction="row"
          spacing={3}
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack spacing={0.5}>
            <h3 className="text-md text-gray-700 font-semibold">Logo</h3>
            <p className="text-sm text-gray-500">
              Upload or change the platform logo
            </p>
          </Stack>
          <TextField label="N" variant="outlined" size="small" />
        </Stack>
      </Stack>
      <Stack alignItems="flex-end">
        <button type='button' className='bg-blue-500 text-white px-4 py-2 rounded'>Update Settings</button>
      </Stack>
    </Stack>
  );
}
