import { Stack, } from "@mui/material";

export default function LoanStatus({
  name,
  details,
  timestamp,
  status = "complete",
  photo = 'https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80',
}: {
  name?: string;
  photo?: string;
  details?: string;
  timestamp?: string;
  status?: "complete" | "in-progress" | "not-started";
}) {
  return (
    <Stack
      direction="row"
      spacing={3}
      padding={1}
      alignItems="center"
      border="1px solid rgb(201, 206, 217)"
      borderRadius={3}
      justifyContent="space-between"
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <div className="w-10 h-10 bg-white rounded-full overflow-hidden">
          <img
            alt="Loan Status Icon"
            className="w-10 h-10"
            src={photo}
          />
        </div>
        <Stack justifyContent="space-between" spacing={0.3}>
          <div className="flex items-center gap-1 text-gray-700">
            <p>{name}</p>
            <p className="text-[10px] font-light text-gray-500">{timestamp}</p>
          </div>
          <div className="text-sm font-light text-gray-700 truncate">
            {details}
          </div>
        </Stack>
      </Stack>
      <div
        className={`w-4 h-4 rounded-full`}
        style={{
          background:
            status === "complete"
              ? "#4CAF50"
              : status === "in-progress"
              ? "#DEA438"
              : "#D43033",
        }}
      ></div>
    </Stack>
  );
}
