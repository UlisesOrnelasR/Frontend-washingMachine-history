import { useAuthStore } from "../../hooks/useAuthStore";
import logo from "/images/logo.png";
import { IconLogout } from "@tabler/icons-react";
import { User } from "../../models/auth";

export const Navbar = () => {
  const { startLogout, user } = useAuthStore();
  return (
    <nav className="h-20 bg-black">
      <div className="flex items-center justify-between h-full px-8">
        <div className="flex items-end gap-3">
          <div className="relative">
            <img src={logo} alt="lo" className="w-8" />
            <span className="absolute bg-green-600 w-2 h-2 top-0 right-0.5 rounded-full ring-2 ring-white"></span>
            <span className="animate-ping opacity-75 absolute bg-green-600 w-2 h-2 top-0 right-0.5 rounded-full ring-2 ring-white"></span>
          </div>
          <h1 className="text-xl text-white font-bold mb-2">
            {(user as User).name}
            <span className="text-secondary">.</span>
          </h1>
        </div>
        <div>
          <button
            onClick={startLogout}
            className="flex items-center gap-2 border border-red-600 bg-red-600 text-white py-2 px-4 hover:bg-red-800 hover:border-red-800  rounded-xl transition-colors"
          >
            <IconLogout /> Salir
          </button>
        </div>
      </div>
    </nav>
  );
};
