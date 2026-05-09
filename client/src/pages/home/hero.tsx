import type { FC } from "react";

const Hero: FC = () => {
  return (
    <div className="relative">
      <div className="absolute top-1/2 transform -translate-y-1/2 p-4 lg:pl-10 max-md:py-10 max-w-[68%] lg:max-w-[45%]">
        <p className="text-grey text-body-sm">Sadece geçerli süreyle</p>
        <h1 className="mt-0.5 mb-1 text-white font-semibold text-heading-base">
          30% İndirim
        </h1>
        <p className="text-grey text-body-sm">
          Rahatınız düşünülerek tasarlanan spor ayakkabılar, bir sonraki
          seansınıza tüm odağınızı verebilmenizi sağlar.
        </p>
      </div>

      <img
        src="/banner.png"
        alt="banner"
        className="w-full h-full min-h-50 object-cover rounded-2xl sm:rounded-3xl xl:rounded-4xl"
      />
    </div>
  );
};

export default Hero;
