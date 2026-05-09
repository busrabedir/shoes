import { Search, User } from "lucide-react";
import { useState, type FC } from "react";
import { Link } from "react-router-dom";
import { useLogout, useProfile } from "../../service/auth";

const UserInfo: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isPending, mutate } = useLogout();
  const { user } = useProfile();

  return (
    <div className="flex items-center gap-6 xl:gap-10">
      <button className="cursor-pointer max-md:hidden">
        <Search />
      </button>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative cursor-pointer"
      >
        <User />

        {isOpen && user && (
          <div className="absolute top-13 -left-27 xl:-left-25 bg-white shadow-lg rounded-md z-50 overflow-hidden border border-zinc-200">
            <div className="font-semibold header-item">
              <span>{user.firstName}</span>
              <span className="ms-1">{user.lastName}</span>
            </div>

            {user.role === "admin" && (
              <div className="header-item">
                <Link to="/admin/dashboard">Admin Paneli</Link>
              </div>
            )}

            <button
              className="header-item"
              disabled={isPending}
              onClick={() => mutate()}
            >
              Çıkış Yap
            </button>
          </div>
        )}
      </button>
    </div>
  );
};

export default UserInfo;
