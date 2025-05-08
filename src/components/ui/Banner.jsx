import { useNavigate } from "react-router-dom";

const Banner = ({
  bannerImg,
  bannerTitle,
  titleSide,
  bannerMobile,
  bannerText,
}) => {
  const navigate = useNavigate();
  return (
    <>
      {/* desktop view */}
      <div className="relative hidden md:block">
        <img
          src={bannerImg}
          alt="banner img"
          className="w-full"
          loading="lazy"
        />

        {/* banner content */}
        <div
          className="absolute top-[50%] text-black/90 flex flex-col items-center gap-3 max-w-[35%]"
          style={{ transform: "translateY(-50%)", [titleSide]: "10%" }}
        >
          <h2 className="text-5xl whitespace-nowrap font-bold">
            {bannerTitle}
          </h2>
          <div className="border-2 w-14 border-black/90" />
          <p className="text-sm text-center">{bannerText}</p>
          <button
            className="uppercase bg-black/90 hover:bg-black/80 cursor-pointer text-white/90 text-sm font-bold px-14 py-[12px] mt-6"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* mobile view */}
      <div className="relative block md:hidden">
        <img
          src={bannerMobile}
          alt="banner img"
          className="object-cover w-full overflow-hidden"
          loading="lazy"
        />
        <div className="absolute top-0 left-0 size-full bg-black/30 text-white flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold whitespace-nowrap">
            {bannerTitle}
          </h2>
          <div className="border-2 w-14 md:border-black/90 border-white/80" />
          <p className="text-sm text-center w-[85%]">{bannerText}</p>
          <button
            className="uppercase bg-black/90 text-white/90 text-sm font-bold px-14 py-[12px] mt-6"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Banner;
