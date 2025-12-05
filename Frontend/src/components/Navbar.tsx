import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PiDropboxLogoFill } from "react-icons/pi";
import {
  FaHome,
  FaRegCreditCard,
  FaChartPie,
  FaBars,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { BsTagsFill } from "react-icons/bs";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const tabs = ["Home", "Dashboard", "Transactions", "Categories", "Reports"];
  const routes = [
    "/",
    "/dashboard",
    "/transactions",
    "/categories"
    "/reports",
  ];

  const icons = [
    <FaHome />,
    <MdDashboard />,
    <FaRegCreditCard />,
    <BsTagsFill />,
    <FaChartPie />,
  ];
  const location = useLocation();

  return (
    <div className="h-[10vh] flex justify-between items-center bg-[#039fab] text-white px-4 md:px-8 relative">
      <div className=" ml-20 flex  h-full items-center">
        <Link to={"/"}>
          <p className="text-2xl md:text-3xl flex items-center">
            <PiDropboxLogoFill />
            <span className="text-lg md:text-xl ml-2">ETS</span>
          </p>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden  lg:flex items-center gap-2 ml-20 h-full">
          {tabs.map((tab, idx) => {
            const isActive = location.pathname === routes[idx];

            return (
              <Link key={idx} to={routes[idx]}>
                <li
                  className={`p-2 text-[14px] rounded-2xl flex items-center gap-2 hover:bg-white hover:text-black transition-all duration-500 ${
                    isActive ? "bg-white text-black" : "text-white"
                  }`}
                >
                  {icons[idx]}
                  <span className="font-light">{tab}</span>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>

      {/* Desktop Profile Button */}
      <div className="hidden md:block">
        <Link to={"/profile"}>
          <p
            className={`p-3 flex justify-center items-center gap-2 text-[16px] rounded-2xl hover:bg-white hover:text-black transition-colors ${
              location.pathname === "/profile"
                ? "bg-white text-[#000]"
                : "text-white"
            }`}
          >
            <FaUser />
            Profile
          </p>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden text-2xl z-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed top-[10vh] left-0 w-full bg-[#039fab] transition-all duration-300 ease-in-out z-40 lg:hidden ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <ul className="flex flex-col p-4 space-y-2">
          {tabs.map((tab, idx) => {
            const isActive = location.pathname === routes[idx];
            return (
              <Link
                key={idx}
                to={routes[idx]}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <li
                  className={`p-3 text-base rounded-lg flex items-center gap-3 transition-all ${
                    isActive
                      ? "bg-white text-[#039fab]"
                      : "text-white hover:bg-white/20"
                  }`}
                >
                  {icons[idx]}
                  <span>{tab}</span>
                </li>
              </Link>
            );
          })}
          <Link to={"/profile"} onClick={() => setIsMobileMenuOpen(false)}>
            <li
              className={`p-3 text-base rounded-lg flex items-center gap-3 transition-all ${
                location.pathname === "/profile"
                  ? "bg-white text-[#039fab]"
                  : "text-white hover:bg-white/20"
              }`}
            >
              <FaUser />
              <span>Profile</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
