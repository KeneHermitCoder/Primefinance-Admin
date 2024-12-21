import cardFooterImage from "../../assets/images/savings-desktop.png";

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
}) {
  return (
    <div>
      <div className="w-full flex flex-col justify-center items-center gap-10 md:gap-12 pt-8">
        <p className="w-full max-w-lg sm:max-w-2xl md:max-w-2xl font-normal md:font-[400] text-sm sm:text-[16px] px-5 md:px-16 lg:px-24 text-start">
          {title}
        </p>
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-4">
          {" "}
        </div>
      </div>
    </div>
  );
}
