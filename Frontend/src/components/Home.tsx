import React from "react";
import { FaArrowTrendUp, FaArrowRight, FaMobileScreen } from "react-icons/fa6";
import { VscGraph } from "react-icons/vsc";
import { MdOutlineSecurity } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="min-h-[100vh] flex flex-col items-center justify-evenly p-4 md:p-8 page-enter"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 1) 10%, rgba(136, 202, 207, 1) 100%)",
        }}
      >
        <p className="text-md md:text-md flex justify-center items-center gap-2 text-white px-3 md:px-4 py-2 rounded-2xl bg-cyan-500">
          {<FaArrowTrendUp />}Take Control of your Finances
        </p>
        <h1 className="text-3xl md:text-5xl lg:text-[56px] text-center font-bold leading-tight md:leading-[80px] px-4">
          Manage Your Expenses <br className="hidden md:block" /> Effortlessly
        </h1>
        <p className="text-sm md:text-base lg:text-[18px] text-center text-black px-4 max-w-2xl">
          Track your income and expenses, categorize transactions, and gain
          valuable insights into your spending habits with our intuitive expense
          management platform.
        </p>
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-auto px-4">
          <button
            className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 font-medium cursor-pointer"
            onClick={() => {
              navigate("/profile");
              window.scrollTo(0, 0);
            }}
          >
            Get Started
          </button>
          <button
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 font-medium cursor-pointer"
            onClick={() => {
              navigate("/dashboard");
              window.scrollTo(0, 0);
            }}
          >
            View Demo
          </button>
        </div>
        {/* ====================================== */}
        {/* ====================================== */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6 bg-white px-4 md:px-[36px] py-4 md:py-[30px] rounded-2xl w-full md:w-auto max-w-6xl">
          <div
            className="bg-green-100 text-green-800 px-4 md:pr-10 md:pl-5 py-4 rounded-lg flex-1"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(136, 207, 167, 1) 100%)",
            }}
          >
            <p className="text-sm">Total Income</p>
            <p className="font-bold text-xl">$15,999</p>
            <p className="text-[12px]">+ 12% from last month</p>
          </div>
          <div
            className="bg-green-100 text-red-800 px-4 md:pr-10 md:pl-5 py-4 rounded-lg flex-1"
            style={{
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(199, 24, 24, 0.5) 100%)",
            }}
          >
            <p className="text-sm">Total Expenses</p>
            <p className="font-bold text-xl">$15,999</p>
            <p className="text-[12px]">+ 12% from last month</p>
          </div>
          <div
            className="bg-green-100 text-[#1447e6] px-4 md:pr-10 md:pl-5 py-4 rounded-lg flex-1"
            style={{
              background:
                " linear-gradient(180deg,rgba(255, 255, 255, 1) 0%, rgba(131, 192, 252, 1) 100%)",
            }}
          >
            <p className="text-sm">Total Income</p>
            <p className="font-bold text-xl">$15,999</p>
            <p className="text-[12px]">+ 12% from last month</p>
          </div>
        </div>
        {/* ======================================== */}
        {/* ======================================== */}
      </div>

      {/* ================================================================== */}
      {/* ================================================================== */}
      {/* ================================================================== */}
      {/* ================================================================== */}

      <div
        className="min-h-screen flex flex-col items-center justify-evenly py-10 md:pt-10 px-4"
        style={{
          background:
            "linear-gradient(180deg,  rgba(136, 202, 207, 1) 0%, rgba(255, 255, 255, 1)100%)",
        }}
      >
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center px-4">
          Everything you need to manage your finances
        </h1>
        <p className="text-center text-sm md:text-base text-black px-4">
          Our comprehensive suite of tools helps you understand, track, and
          optimize your <br /> financial health.
        </p>

        {/* ========================================== */}
        {/* ========================================== */}
        {/* ========================================== */}

        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl px-4 mb-5">
          <div className="w-full md:w-auto bg-white p-4 flex flex-col justify-around rounded-2xl min-h-[180px]">
            <div className="h-[48px] w-[48px] bg-[#039fab] text-white rounded-2xl text-[24px] flex justify-center items-center">
              <VscGraph />
            </div>
            <div>
              <p className="font-lg text-gray-800">Smart Analytics</p>
              <p className="text-xl md:text-[12px] mt-2 text-gray-600">
                Get detailed insights into your spending patterns with
                interactive charts and reports.
              </p>
            </div>
          </div>
          {/* ==================== */}
          {/* ==================== */}
          <div className="w-full md:w-auto bg-white p-4 flex flex-col justify-around rounded-2xl min-h-[180px]">
            <div className="h-[48px] w-[48px] bg-[#039fab] text-white rounded-2xl text-[24px] flex justify-center items-center">
              <MdOutlineSecurity />
            </div>
            <div>
              <p className="font-medium text-gray-800">Secure & Private</p>
              <p className="text-xs md:text-[12px] mt-2 text-gray-600">
                Your financial data is encrypted and stored securely. We never
                share your information.
              </p>
            </div>
          </div>
          {/* ==================== */}
          {/* ==================== */}
          <div className="w-full md:w-auto bg-white p-4 flex flex-col justify-around rounded-2xl min-h-[180px]">
            <div className="h-[48px] w-[48px] bg-[#039fab] text-white rounded-2xl text-[24px] flex justify-center items-center">
              <FaMobileScreen />
            </div>
            <div>
              <p className="font-medium text-gray-800">Mobile Friendly</p>
              <p className="text-xs md:text-[12px] mt-2 text-gray-600">
                Access your expenses anywhere with our responsive design that
                works on all devices.
              </p>
            </div>
          </div>
          {/* ==================== */}
          {/* ==================== */}
          <div className="w-full md:w-auto bg-white p-4 flex flex-col justify-around rounded-2xl min-h-[180px]">
            <div className="h-[48px] w-[48px] bg-[#039fab] text-white rounded-2xl text-[24px] flex justify-center items-center">
              <FaArrowTrendUp />
            </div>
            <div>
              <p className="font-medium text-gray-800">Budget Tracking</p>
              <p className="text-xs md:text-[12px] mt-2 text-gray-600">
                Set budgets for different categories and track your progress
                towards financial goals
              </p>
            </div>
          </div>
          {/* ==================== */}
          {/* ==================== */}
        </div>
        <div
          className="w-full md:w-[90%] lg:w-[70%] min-h-[220px] px-6 md:px-10 py-6 md:py-5 flex flex-col items-center justify-evenly border-2 border-white rounded-2xl"
          style={{
            background: " rgba(136, 202, 207, 1) ",
          }}
        >
          <h1 className="text-xl md:text-2xl lg:text-3xl text-white text-center">
            Ready to take control of your finances?
          </h1>
          <p className="text-center text-white text-xs md:text-sm lg:text-[14px] px-4">
            Join thousands of users who have already transformed their financial
            habits with <br /> ExpenseFlow.
          </p>
          <button
            className="flex  items-center justify-center gap-2 bg-white text-[#00a6f4] text-[12px] px-5 py-2 rounded-xl cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            Start Your Journey Today <FaArrowRight />
          </button>
        </div>
      </div>

      {/* ======================================== */}
      {/* ======================================== */}
      {/* ======================================== */}
    </>
  );
};

export default Home;
