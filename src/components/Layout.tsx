import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <nav className="sticky top-0 h-16 w-full bg-white shadow-lg flex items-center px-6 text-[#3574DC]">
        <h1 className="text-3xl font-bold">Post It</h1>
      </nav>
      <main className="w-full max-w-3xl p-4 mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
