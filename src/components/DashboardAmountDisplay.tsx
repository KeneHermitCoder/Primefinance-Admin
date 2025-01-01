export default function DashboardAmountDisplay({
  title,
  trIcon,
  amount,
  bottomItem,
  backgroundColour,
}: {
  title?: string;
  trIcon?: React.ReactNode;
  amount?: string;
  bottomItem?: React.ReactNode;
  backgroundColour?: string;
}) {
  return (
    <div
      style={{ backgroundColor: backgroundColour }}
      // className="w-full max-w-[280px] flex flex-col justify-center items-center gap-1 rounded-[12px] overflow-hidden hover:cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out"
      className="w-full flex flex-col justify-center items-center gap-1 rounded-[12px] overflow-hidden hover:cursor-pointer hover:shadow-lg transition-all duration-300 ease-in-out"
    >
      <div className='flex justify-between items-center w-full pl-3 pr-2 pt-2'>
        <span>{title}</span>
        <span>{trIcon}</span>
      </div>
      <span className='w-full pl-3 pr-2 flex items-center text-4xl font-semibold text-gray-600 mb-auto'>{amount}</span>
      <span className='w-full h-[65px]'>{bottomItem}</span>
    </div>
  );
}
