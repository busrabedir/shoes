import type { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="text-center bg-white text-dark-grey p-3 rounded-2xl md:rounded-3xl xl:rounded-4xl font-semibold mt-5">
      <p>
        Tüm hakları saklıdır. &copy; {new Date().getFullYear()} * KICK SHOES
      </p>
    </footer>
  );
};

export default Footer;
