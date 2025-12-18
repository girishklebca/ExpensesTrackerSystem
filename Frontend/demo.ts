// <div className="max-w-4xl mx-auto border-2">
//           {/* Header */}
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 gap-4">
//             <div>
//               <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
//                 Profile
//               </h1>
//               <p className="text-sm md:text-base text-gray-500 mt-1">
//                 Manage your account information
//               </p>
//             </div>
//             <button
//               onClick={() => navigate("/")}
//               className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-lg"
//             >
//               <FaHome />
//               Go To HomePage
//             </button>
//           </div>

//           {/* Profile Card */}
//           <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-6">
//             {/* Profile Header */}
//             <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 md:p-8 text-white">
//               <div className="flex flex-col md:flex-row items-center gap-6">
//                 <div className="h-24 w-24 md:h-32 md:w-32 bg-white rounded-full flex items-center justify-center text-cyan-500 text-4xl md:text-5xl font-bold shadow-lg">
//                   {profileData.name.charAt(0)}
//                 </div>
//                 <div className="text-center md:text-left flex-1">
//                   <h2 className="text-2xl md:text-3xl font-bold">
//                     {profileData.name}
//                   </h2>
//                   <p className="text-cyan-100 mt-1 text-sm md:text-base">
//                     {profileData.email}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Profile Details */}
//             <div className="p-6 md:p-8 border-2">
//               <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-6">
//                 Personal Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Column 1 */}
//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
//                     <FaUser className="text-cyan-500" />
//                     Full Name
//                   </label>
//                   <div>Profile Name</div>
//                 </div>

//                 {/* Column 2 */}
//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
//                     <FaEnvelope className="text-cyan-500" />
//                     Email Address
//                   </label>
//                   <div>Email Name</div>
//                 </div>

//                 {/* Column 1, Row 2 */}
//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
//                     <FaPhone className="text-cyan-500" />
//                     Phone Number
//                   </label>
//                   <div>Phone Name</div>
//                 </div>

//                 {/* Column 2, Row 2 */}
//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
//                     <FaMapMarkerAlt className="text-cyan-500" />
//                     Location
//                   </label>
//                   <div>Location Name</div>
//                 </div>
//                 {/* Column 1, Row 3 */}
//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
//                     <FaPhone className="text-cyan-500" />
//                     Phone Number
//                   </label>
//                   <div>Phone Name</div>
//                 </div>

//                 {/* Column 2, Row 3 */}
//                 <div>
//                   <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
//                     <FaMapMarkerAlt className="text-cyan-500" />
//                     Location
//                   </label>
//                   <div>Location Name</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* ==================== */}
//           {/* ==================== */}
//           {/* ==================== */}
//           <div className="flex flex-col gap-2 mb-5">
//             <div>
//               <button
//                 className="w-full bg-cyan-500 py-2 rounded-xl text-white cursor-pointer hover:bg-red-800"
//                 onClick={() => setIsLoggedIn(false)}
//               >
//                 Log Out
//               </button>
//             </div>
//             <div>
//               <button className="w-full bg-cyan-500 py-2 rounded-xl text-white cursor-pointer hover:bg-cyan-800">
//                 Log In With Different Account
//               </button>
//             </div>
//           </div>
//           {/* Stats Card */}
//           <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
//             <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-6">
//               Account Statistics
//             </h3>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
//               <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 md:p-6 border border-green-200">
//                 <p className="text-green-600 text-xs md:text-sm font-medium mb-1">
//                   Total Transactions
//                 </p>
//                 <p className="text-2xl md:text-3xl font-bold text-green-800">
//                   145
//                 </p>
//               </div>
//               <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 md:p-6 border border-blue-200">
//                 <p className="text-blue-600 text-xs md:text-sm font-medium mb-1">
//                   Categories
//                 </p>
//                 <p className="text-2xl md:text-3xl font-bold text-blue-800">
//                   12
//                 </p>
//               </div>
//               <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 md:p-6 border border-purple-200">
//                 <p className="text-purple-600 text-xs md:text-sm font-medium mb-1">
//                   Member Since
//                 </p>
//                 <p className="text-2xl md:text-3xl font-bold text-purple-800">
//                   2024
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>















// <form onSubmit={handleSubmit}>
//           {/* Dialog Header */}
//           <DialogTitle className="text-center text-2xl font-bold text-gray-800 relative pb-2">
//             Create Your Account
//             <button
//               type="button"
//               onClick={() => setOpenDialog(false)}
//               className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
//             >
//               <FaTimes size={20} />
//             </button>
//           </DialogTitle>

//           {/* Dialog Content */}
//           <DialogContent>
//             <div className="flex flex-col gap-10 mt-2">
//               {/* Name Field */}
//               <TextField
//                 fullWidth
//                 size="small"
//                 name="name"
//                 label="Full Name"
//                 placeholder="Enter your full name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     fontSize: "0.875rem",
//                     "& input": { padding: "10px 14px" },
//                     "& fieldset": { borderWidth: "2px" },
//                     "&:hover fieldset": {
//                       borderColor: "#0891b2",
//                       borderWidth: "2px",
//                     },
//                     "&.Mui-focused fieldset": {
//                       borderColor: "#0891b2",
//                       borderWidth: "2px",
//                     },
//                   },
//                   "& .MuiInputLabel-root": {
//                     color: "#374151",
//                     fontSize: "0.875rem",
//                   },
//                   "& .MuiInputLabel-root.Mui-focused": { color: "#0891b2" },
//                 }}
//               />

//               {/* Email Field */}
//               <TextField
//                 fullWidth
//                 size="small"
//                 name="email"
//                 label="Email Address"
//                 type="email"
//                 placeholder="your.email@example.com"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     fontSize: "0.875rem",
                    
//                     "& fieldset": { borderWidth: "2px" },
//                     "&:hover fieldset": {
//                       borderColor: "#0891b2",
//                       borderWidth: "2px",
//                     },
//                     "&.Mui-focused fieldset": {
//                       borderColor: "#0891b2",
//                       borderWidth: "2px",
//                     },
//                   },
//                   "& .MuiInputLabel-root": {
//                     color: "#374151",
//                     fontSize: "0.875rem",
//                   },
//                   "& .MuiInputLabel-root.Mui-focused": { color: "#0891b2" },
//                 }}
//               />

//               {/* Password Field */}
//               <TextField
//                 fullWidth
//                 size="small"
//                 name="password"
//                 label="Password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Create a strong password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={() => setShowPassword(!showPassword)}
//                         edge="end"
//                         sx={{ color: "#0891b2" }}
//                       >
//                         {showPassword ? <LuEye /> : <LuEyeOff />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     fontSize: "0.875rem",
//                     "& input": { padding: "10px 14px" },
//                     "& fieldset": { borderWidth: "2px" },
//                     "&:hover fieldset": {
//                       borderColor: "#0891b2",
//                       borderWidth: "2px",
//                     },
//                     "&.Mui-focused fieldset": {
//                       borderColor: "#0891b2",
//                       borderWidth: "2px",
//                     },
//                   },
//                   "& .MuiInputLabel-root": {
//                     color: "#374151",
//                     fontSize: "0.875rem",
//                   },
//                   "& .MuiInputLabel-root.Mui-focused": { color: "#0891b2" },
//                 }}
//               />

//               {/* Phone Field */}
//               <TextField
//                 fullWidth
//                 size="small"
//                 name="phone"
//                 label="Phone Number"
//                 placeholder="+1 234 567 8900"
//                 type="number"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 required
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     fontSize: "0.875rem",
//                     "& input": { padding: "10px 14px" },
//                     "& fieldset": { borderWidth: "2px" },
//                     "&:hover fieldset": {
//                       borderColor: "#0891b2",
//                       borderWidth: "2px",
//                     },
//                     "&.Mui-focused fieldset": {
//                       borderColor: "#0891b2",
//                       borderWidth: "2px",
//                     },
//                   },
//                   "& .MuiInputLabel-root": {
//                     color: "#374151",
//                     fontSize: "0.875rem",
//                   },
//                   "& .MuiInputLabel-root.Mui-focused": { color: "#0891b2" },
//                 }}
//               />

//               {/* Location Field */}
//               <TextField
//                 fullWidth
//                 size="small"
//                 name="location"
//                 label="Location"
//                 placeholder="City, Country"
//                 value={formData.location}
//                 onChange={handleChange}
//                 required
//                 sx={{
//                   "& .MuiOutlinedInput-root": {
//                     fontSize: "0.875rem",
//                     "& input": { padding: "10px 14px" },
//                     "& fieldset": { borderWidth: "2px" },
//                     "&:hover fieldset": {
//                       borderColor: "#0891b2",
//                       borderWidth: "2px",
//                     },
//                     "&.Mui-focused fieldset": {
//                       borderColor: "#0891b2",
//                       borderWidth: "2px",
//                     },
//                   },
//                   "& .MuiInputLabel-root": {
//                     color: "#374151",
//                     fontSize: "0.875rem",
//                   },
//                   "& .MuiInputLabel-root.Mui-focused": { color: "#0891b2" },
//                 }}
//               />
//             </div>
//           </DialogContent>

//           {/* Dialog Actions */}
//           <div className=" py-5 flex justify-center">
//             <Button
//               type="submit"
//               variant="contained"
//               sx={{
//                 backgroundColor: "#0891b2",
//                 "&:hover": { backgroundColor: "#0e7490" },
//                 px: 4,
//               }}
//             >
//               Create Account
//             </Button>
//           </div>
//         </form>