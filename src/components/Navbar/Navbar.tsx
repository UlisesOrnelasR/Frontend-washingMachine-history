import logo from "/images/logo.png";
import { IconLogout } from "@tabler/icons-react";

export const Navbar = () => {
  return (
    <nav className="h-20 bg-black">
      <div className="flex items-center justify-between h-full px-8">
        <div className="flex items-end gap-3">
          <div>
            <img src={logo} alt="lo" className="w-8" />
          </div>
          <h1 className="text-xl text-white font-bold mb-2">
            Ulises<span className="text-secondary">.</span>
          </h1>
        </div>
        <div>
          <button className="flex items-center gap-2 border border-red-600 bg-red-600 text-white py-2 px-4 hover:bg-red-800 hover:border-red-800  rounded-xl transition-colors">
            <IconLogout /> Salir
          </button>
        </div>
      </div>
    </nav>
  );
};
