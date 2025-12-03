import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PiDropboxLogoFill } from "react-icons/pi";
import {
  FaHome,
  FaRegCreditCard,
  FaChartPie,
  FaUser,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
const Navbar = () => {
  const tabs = ["Home", "Dashboard", "Transactions", "Reports"];
  const routes = ["/", "/dashboard", "/transactions", "/Reports"];

  const icons = [
    <FaHome />,
    <MdDashboard />,
    <FaRegCreditCard />,
    <FaChartPie />,
  ];
  const location = useLocation();

  return (
    <div className="h-[10vh]   flex  justify-between items-center bg-[#039fab] text-white">
      <div className="flex h-full items-center">
        <Link to={"/"}>
          <p className="ml-50 text-3xl flex items-center"><PiDropboxLogoFill/><span className="text-xl ml-2">ETS</span></p>
        </Link>

        <ul className="flex items-center gap-2 ml-25 h-full">
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

      <div className="mr-30 rounded-2xl bg-gray-100 ">
        <Link to={"/profile"}>
          <p
            className={`p-3 flex justify-center items-center gap-2 text-[16px] text-black rounded-2xl hover:bg-gray-200 hover:text-gray-500 ${
              location.pathname === "/profile" ? "bg-green-500 text-white" : ""
            }`}
          >
            {<FaUser />}Profile
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
