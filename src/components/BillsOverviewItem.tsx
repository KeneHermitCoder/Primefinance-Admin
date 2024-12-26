import { Stack, } from "@mui/material";

export default function BillsOverviewItem({
  id,
  name,
  type,
  amount,
  status,
  onClick,
}: {
  id?: string;
  name: string;
  type: string;
  amount: string;
  status: "failed" | "completed" | "pending";
  onClick: (e: React.MouseEvent) => void;
}) {
  return (
    <div className="grid grid-cols-10 justify-between items-center p-3 text-[14px] text-gray-600">
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        className="col-span-3"
      >
        <span className="flex w-7 h-7 bg-gray-400 rounded-full overflow-hidden">
          <img
            alt=""
            className="w-7 h-7 rounded-full"
            src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=76&q=80"
          />
        </span>
        <span className="font-medium">{name}</span>
      </Stack>
      <span className="col-span-2">{amount}</span>
      <span className="col-span-2">{type}</span>
      <span
        className="text-red-600 col-span-2"
        style={{
          color:
            status === "failed"
              ? "#D43033"
              : status === "pending"
              ? "#DEA438"
              : '"#4CAF50',
        }}
      >
        {status}
      </span>
      <button
        id={id}
        type="button"
        onClick={onClick}
        className="flex col-span-1 bg-[#e9e9e9] text-[#4d4d4d] text-sm font-normal items-center h-5 px-2 rounded-md"
      >
        view
      </button>
    </div>
  );
}