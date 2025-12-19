import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { LuEyeOff, LuEye } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Snackbar,
  Alert,
  InputAdornment,
  IconButton,
  Slide,
  Fade,
} from "@mui/material";
import type { TransitionProps } from "@mui/material/transitions";
import React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Profile = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);

  // Form state for signup dialog
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
  });

  // Saved profile data
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    location: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => {
    // Step 1 validation: Name and Password
    if (step === 1) {
      if (!formData.name || !formData.password) {
        setSnackbar({
          open: true,
          message: "Please enter name and password",
          severity: "error",
        });
        return;
      }
      if (formData.password.length < 9) {
        setSnackbar({
          open: true,
          message: "Password Must be 9+ Characters Minimum",
          severity: "error",
        });
        return;
      }
      if (formData.password.length > 20) {
        setSnackbar({
          open: true,
          message: "Password Must be 20 Characters Maximum",
          severity: "error",
        });
        return;
      }
      setStep(2);
    }
    // Step 2 validation: Phone and Email
    else if (step === 2) {
      if (!formData.phone || !formData.email) {
        setSnackbar({
          open: true,
          message: "Please enter phone and email",
          severity: "error",
        });
        return;
      }
      setStep(3);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    // Step 3 validation: Location
    if (!formData.location) {
      setSnackbar({
        open: true,
        message: "Please enter location",
        severity: "error",
      });
      return;
    }

    // Save profile data
    setProfileData({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      location: formData.location,
    });

    // Reset form fields
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      location: "",
    });

    // All validations passed - proceed with signup
    setIsLoggedIn(true);
    setOpenDialog(false);
    setStep(1);
    window.scrollTo(0, 0);
    setSnackbar({
      open: true,
      message: "Account created successfully!",
      severity: "success",
    });
  };

  return (
    <div className=" bg-white">
      {isLoggedIn === false && (
        <div className="min-h-[90vh] bg-[url('https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3JhcGhzfGVufDB8fDB8fHww')] bg-center bg-cover">
          <div className="min-h-[90vh]  bg-black/70 flex flex-col items-center justify-center p-4 md:p-8 ">
            <div className="flex flex-col mb-15 md:flex-row gap-3 md:gap-4 w-full md:w-auto px-4">
              <button
                className="bg-sky-600 text-white px-20 py-4 rounded-lg hover:bg-sky-900 font-medium cursor-pointer"
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                Create Account
              </button>
              <button
                className="bg-sky-700 text-white px-20 py-4 rounded-lg hover:bg-sky-900 font-medium cursor-pointer"
                onClick={() => {
                  navigate("/profile");
                  window.scrollTo(0, 0);
                }}
              >
                Login in
              </button>
            </div>

            <p className="text-sm md:text-sm lg:text-[16px] text-center text-white px-4 max-w-2xl">
              Track your income and expenses, categorize transactions, and gain
              valuable insights into your spending habits with our intuitive
              expense management platform.
            </p>
            {/* ================================================== */}
            {/* ================================================== */}
          </div>
        </div>
      )}

      {/* ================================================== */}
      {/* ================================================== */}
      {/* ================================================== */}

      {/* Signup Dialog */}
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => {
          setOpenDialog(false);
          setFormData({
            name: "",
            email: "",
            password: "",
            phone: "",
            location: "",
          });
        }}
        maxWidth="lg"
        fullWidth
        disableScrollLock
      >
        <div className="flex flex-col sm:flex-row min-h-[70vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] ">
          <button
            onClick={() => {
              setOpenDialog(false);
              setStep(1);
              setFormData({
                name: "",
                email: "",
                password: "",
                phone: "",
                location: "",
              });
            }}
            className="absolute right-4 top-10 -translate-y-1/2 text-gray-500 hover:text-black cursor-pointer hover:bg-gray-200  transition-all  rounded-4xl p-2"
          >
            <FaTimes size={20} />
          </button>
          {/* Left Side - Image */}
          <div className="hidden relative md:block md:w-1/2  bg-gradient-to-br from-cyan-500 to-blue-600">
            <img
              src="https://images.pexels.com/photos/4194850/pexels-photo-4194850.jpeg"
              alt="Sign up"
              className="w-full h-full object-cover"
            />
           <div className=" flex flex-col  justify-center items-center h-full w-full gap-5  lg:text-sm absolute top-0 left-0 bg-black/30 ">
             <p className="text-4xl text-white">
              Get Started Here
            </p>
             <p className="lg:text-lg md:text-[14px] text-white ">
              Start for free and get attractive offers from the community
            </p>
           </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 p-6 flex flex-col ">
            <DialogTitle className="text-center font-bold text-2xl text-gray-800">
              Create Account
              <p className="text-sm text-gray-500 mt-1">Step {step} of 3</p>
            </DialogTitle>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (step < 3) {
                  handleNext();
                } else {
                  handleSubmit();
                }
              }}
            >
              <DialogContent>
                <Fade in={true} key={step} timeout={500}>
                  <div className="flex flex-col gap-12 mt-2">
                    {/* Step 1: Name and Password */}
                    {step === 1 && (
                      <>
                        <TextField
                          fullWidth
                          label="Full Name"
                          name="name"
                          placeholder="Enter Fullname"
                          value={formData.name}
                          onChange={handleChange}
                          variant="outlined"
                          
                        />
                        <TextField
                          fullWidth
                          label="Password"
                          name="password"
                          placeholder="Enter the Password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          variant="outlined"
                          helperText="* password must be of 9-20 characters "
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                  edge="end"
                                >
                                  {showPassword ? <LuEye /> : <LuEyeOff />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </>
                    )}

                    {/* Step 2: Phone and Email */}
                    {step === 2 && (
                      <>
                        <TextField
                          fullWidth
                          label="Phone Number"
                          placeholder="Enter your Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          variant="outlined"
                        />
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={handleChange}
                          variant="outlined"
                        />
                      </>
                    )}

                    {/* Step 3: Location */}
                    {step === 3 && (
                      <>
                        <TextField
                          fullWidth
                          label="Location"
                          name="location"
                          placeholder="eg. Country, State, Street"
                          value={formData.location}
                          onChange={handleChange}
                          variant="outlined"
                        />
                        <div className="mt-40  flex items-center">
                          <input type="checkbox" name="" id="" />
                          <p className="text-[12px] text-sm/3">
                            &nbsp;&nbsp;By clicking SignUp , You are agrreing to
                            our Terms and Policies..
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </Fade>
              </DialogContent>
              <DialogActions className="px-6 pb-6 flex justify-between">
                <div className="flex gap-2">
                  {step > 1 && (
                    <Button
                      onClick={handleBack}
                      variant="outlined"
                      color="inherit"
                      type="button"
                    >
                      <FaArrowLeft />
                    </Button>
                  )}
                  {step < 3 ? (
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        bgcolor: "#06b6d4",
                        py: "15px",
                        px: "30px",
                        "&:hover": { bgcolor: "#0891b2" },
                      }}
                    >
                      <FaArrowRight />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        bgcolor: "#06b6d4",
                        "&:hover": { bgcolor: "#0891b2" },
                      }}
                      startIcon={<FaSave />}
                    >
                      Sign Up
                    </Button>
                  )}
                </div>
              </DialogActions>
            </form>
          </div>
        </div>
      </Dialog>
      {/* ================================================== */}
      {/* ================================================== */}
      {/* ================================================== */}
      {isLoggedIn === true && (
        <Fade in={isLoggedIn} timeout={800}>
          <div className="max-w-4xl my-20 p-10 mx-auto rounded-4xl shadow-2xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Profile
                </h1>
                <p className="text-sm md:text-base text-gray-500 mt-1">
                  Manage your account information
                </p>
              </div>
              <button
                onClick={() => navigate("/")}
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-lg"
              >
                <FaHome />
                Go To HomePage
              </button>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 md:p-8 text-white">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="h-24 w-24 md:h-32 md:w-32 bg-white rounded-full flex items-center justify-center text-cyan-500 text-4xl md:text-5xl font-bold shadow-lg">
                    {profileData.name.charAt(0) || "*"}
                  </div>
                  <div className="text-center md:text-left flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold">
                      {profileData.name || "Not Provided"}
                    </h2>
                    <p className="text-cyan-100 mt-1 text-sm md:text-base">
                      {profileData.email || "Not Provided"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-6 md:p-8 ">
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-6">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Column 1 */}
                  <div className="bg-gray-100 rounded-xl py-4 px-4">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600 ">
                      <FaUser className="text-cyan-500" />
                      Full Name
                    </label>
                    <div className="px-5">{profileData.name || "Not provided"}</div>
                  </div>

                  {/* Column 2 */}
                  <div className="bg-gray-100 rounded-xl py-4 px-4">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600 ">
                      <FaEnvelope className="text-cyan-500" />
                      Email Address
                    </label>
                    <div className="px-5">{profileData.email || "Not provided"}</div>
                  </div>

                  {/* Column 1, Row 2 */}
                  <div className="bg-gray-100 rounded-xl py-4 px-4">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600 ">
                      <FaPhone className="text-cyan-500" />
                      Phone Number
                    </label>
                    <div className="px-5">{profileData.phone || "Not provided"}</div>
                  </div>

                  {/* Column 2, Row 2 */}
                  <div className="bg-gray-100 rounded-xl py-4 px-4">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600 ">
                      <FaMapMarkerAlt className="text-cyan-500" />
                      Location
                    </label>
                    <div className="px-5">{profileData.location || "Not provided"}</div>
                  </div>
                  {/* Column 1, Row 3 */}
                  <div className="bg-gray-100 rounded-xl py-4 px-4">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600 ">
                      <FaPhone className="text-cyan-500" />
                      Phone Number
                    </label>
                    <div className="px-5">Phone Name</div>
                  </div>

                  {/* Column 2, Row 3 */}
                  <div className="bg-gray-100 rounded-xl py-4 px-4">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-600 ">
                      <FaMapMarkerAlt className="text-cyan-500" />
                      Location
                    </label>
                    <div className="px-5 ">Location Name</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ==================== */}
            <div className="flex flex-col items-center gap-2 mb-5">
              <button
                className="w-4/5 bg-cyan-500 py-2 border rounded-xl text-white cursor-pointer hover:bg-red-100 hover:border-red-500 hover:text-red-500 transition-all duration-300"
                onClick={() => setIsLoggedIn(false)}
              >
                Log Out
              </button>
              <button className="w-4/5 bg-cyan-500 py-2 rounded-xl text-white cursor-pointer hover:bg-cyan-800 transition-all duration-300">
                Log In With Different Account
              </button>
            </div>

            {/* ==================== */}
            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-6">
                Account Statistics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 md:p-6 border border-green-200">
                  <p className="text-green-600 text-xs md:text-sm font-medium mb-1">
                    Total Transactions
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-green-800">
                    145
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 md:p-6 border border-blue-200">
                  <p className="text-blue-600 text-xs md:text-sm font-medium mb-1">
                    Categories
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-blue-800">
                    12
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 md:p-6 border border-purple-200">
                  <p className="text-purple-600 text-xs md:text-sm font-medium mb-1">
                    Member Since
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-purple-800">
                    2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      )}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Profile;
