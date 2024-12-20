import cardFooterImage from "../../assets/images/savings-desktop.png";

export function Card({
  headText,
  footerText,
  background,
  headSubText,
  footerImage,
  footerTextColour,
}: {
  headText?: string;
  footerText?: string;
  background?: string;
  headSubText?: string;
  footerImage?: string;
  footerTextColour?: string;
}) {
  return (
    <div className={`w-full rounded-tl-[2rem] rounded-tr-[1rem] rounded-bl-[.5rem] rounded-br-[2rem]`} style={{ backgroundColor: background, }}>
      <div className="p-5 md:p-6 bg-[#f4f4f4] rounded-tl-[1.5rem] rounded-tr-[.5rem]">
        <h5 className="mb-2 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#181818]">
          {headText}
        </h5>
        <p className="mb-3 font-normal text-md md:text-lg text-[#868686]">
          {headSubText}
        </p>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-10 md:gap-12 pt-8">
        <p
          className={`w-full max-w-lg sm:max-w-2xl md:max-w-2xl font-normal md:font-[400] text-sm sm:text-[16px] px-5 md:px-16 lg:px-24 text-start`}
          style={{ color: footerTextColour?? "#f1f1f1" }}
        >
          {footerText}
        </p>
        <span className="w-full flex justify-center items-center">
          <img src={footerImage?? cardFooterImage} alt="" className="w-48 sm:w-52 md:w-64 lg:w-70 h-auto" />
        </span>
      </div>
    </div>
  );
}
