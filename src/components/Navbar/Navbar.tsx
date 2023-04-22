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
          <button className="flex items-center gap-2 border border-red-600 text-red-600 py-2 px-4 hover:bg-red-600 hover:text-white rounded-xl transition-colors">
            <IconLogout /> Salir
          </button>
        </div>
      </div>
    </nav>
  );
};
