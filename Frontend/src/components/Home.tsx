import React from "react";
import { FaArrowTrendUp, FaArrowRight, FaMobileScreen } from "react-icons/fa6";
import { VscGraph } from "react-icons/vsc";
import { MdOutlineSecurity } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const naviagte = useNavigate();
  return (
    <>
      <div
        className="h-[100vh] flex flex-col items-center justify-evenly p-8 page-enter"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 1) 10%, rgba(136, 202, 207, 1) 100%)",
        }}
      >
        <p className="text-md flex justify-center items-center gap-2 text-white px-4 py-2 rounded-2xl bg-green-400">
          {<FaArrowTrendUp />}Take Control of your Finances
        </p>
        <h1 className="text-[56px] text-center font-bold  leading-[80px]">
          Manage Your Expenses <br /> Effortlessly
        </h1>
        <p className="text-base text-center text-[18px] text-gray-500 relative -top-8  max-w-2xl">
          Track your income and expenses, categorize transactions, and gain
          valuable insights into your spending habits with our intuitive expense
          management <br /> platform.
        </p>
        <div className="flex gap-4 relative -top-8 ">
          <button
            className="bg-sky-500 text-white px-6 py-2 rounded-lg hover:bg-sky-700 font-medium"
            onClick={() => naviagte("/transactions")}
          >
            Get Started
          </button>
          <button
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 font-medium"
            onClick={() => naviagte("/dashboard")}
          >
            View Demo
          </button>
        </div>
        {/* ====================================== */}
        {/* ====================================== */}
        <div className="flex gap-15 bg-white px-[36px] py-[30px]   relative -top-[20px] rounded-2xl">
          <div
            className="bg-green-100 text-green-800 pr-10 pl-5 py-4 rounded-lg"
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
            className="bg-green-100 text-red-800 pr-10 pl-5 py-4 rounded-lg"
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
            className="bg-green-100 text-[#1447e6] pr-10 pl-5 py-4 rounded-lg"
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
        className="h-screen flex flex-col items-center justify-evenly pt-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 1) 10%, rgba(136, 202, 207, 1) 100%)",
        }}
      >
        <h1 className="text-4xl font-bold">
          Everything you need to manage your finances
        </h1>
        <p className="text-center text-gray-500 relative -top-8">
          Our comprehensive suite of tools helps you understand, track, and
          optimize your <br /> financial health.
        </p>

        {/* ========================================== */}
        {/* ========================================== */}
        {/* ========================================== */}

        <div className="w-full flex justify-evenly ">
          <div className="w-[240px] h-[190px] bg-white p-4 flex flex-col justify-around  rounded-2xl">
            <div className="h-[48px] w-[48px] bg-[#039fab]  text-white rounded-2xl text-[24px] flex justify-center items-center ">
              <VscGraph />{" "}
            </div>
            <div>
              <p>Smart Analytics</p>
              <p className="text-[12px] mt-2 pr-2">
                Get detailed insights into your spending patterns with
                interactive charts and reports.
              </p>
            </div>
          </div>
          {/* ==================== */}
          {/* ==================== */}
          <div className="w-[240px] h-[190px] bg-white p-4 flex flex-col justify-around  rounded-2xl">
            <div className="h-[48px] w-[48px] bg-[#039fab]  text-white rounded-2xl text-[24px] flex justify-center items-center ">
              <MdOutlineSecurity />
            </div>
            <div>
              <p>Secure & Private</p>
              <p className="text-[12px] mt-2 pr-2">
                Your financial data is encrypted and stored securely. We never
                share your information.
              </p>
            </div>
          </div>
          {/* ==================== */}
          {/* ==================== */}
          <div className="w-[240px] h-[190px] bg-white p-4 flex flex-col justify-around  rounded-2xl">
            <div className="h-[48px] w-[48px] bg-[#039fab]  text-white rounded-2xl text-[24px] flex justify-center items-center ">
              <FaMobileScreen />{" "}
            </div>
            <div>
              <p>Mobile Friendly</p>
              <p className="text-[12px] mt-2 pr-2">
                Access your expenses anywhere with our responsive design that
                works on all devices.
              </p>
            </div>
          </div>
          {/* ==================== */}
          {/* ==================== */}
          <div className="w-[240px] h-[190px] bg-white p-4 flex flex-col justify-around  rounded-2xl">
            <div className="h-[48px] w-[48px] bg-[#039fab]  text-white rounded-2xl text-[24px] flex justify-center items-center ">
              <FaArrowTrendUp />{" "}
            </div>
            <div>
              <p>Budget Tracking</p>
              <p className="text-[12px] mt-2 pr-2">
                Set budgets for different categories and track your progress
                towards financial goals
              </p>
            </div>
          </div>
          {/* ==================== */}
          {/* ==================== */}
        </div>
        <div
          className="w-[70%] h-[220px] px-10 py-5 flex flex-col items-center justify-evenly border-2 border-white  rounded-2xl"
          style={{
            background: " rgba(136, 202, 207, 1) ",
          }}
        >
          <h1 className="text-3xl text-white">
            Ready to take control of your finances?
          </h1>
          <p className="text-center text-white text-[14px]">
            Join thousands of users who have already transformed their financial
            habits with <br /> ExpenseFlow.
          </p>
          <button className="flex  items-center justify-center gap-2 bg-white text-[#00a6f4] text-[12px] px-5 py-2 rounded-xl ">
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
