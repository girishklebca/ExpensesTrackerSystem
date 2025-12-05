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
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    location: "New York, USA",
  });

  const [editData, setEditData] = useState({ ...profileData });

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-[90vh] bg-gray-50 p-4 md:p-8 page-enter">
      <div className="max-w-4xl mx-auto">
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
                {profileData.name.charAt(0)}
              </div>
              <div className="text-center md:text-left flex-1">
                <h2 className="text-2xl md:text-3xl font-bold">
                  {profileData.name}
                </h2>
                <p className="text-cyan-100 mt-1 text-sm md:text-base">
                  {profileData.email}
                </p>
              </div>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-cyan-500 px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-cyan-50 transition-colors duration-200 font-medium"
                >
                  <FaEdit />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-6">
              Personal Information
            </h3>
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                  <FaUser className="text-cyan-500" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-800 text-base md:text-lg px-4 py-3 bg-gray-50 rounded-lg">
                    {profileData.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                  <FaEnvelope className="text-cyan-500" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-800 text-base md:text-lg px-4 py-3 bg-gray-50 rounded-lg">
                    {profileData.email}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                  <FaPhone className="text-cyan-500" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.phone}
                    onChange={(e) =>
                      setEditData({ ...editData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-800 text-base md:text-lg px-4 py-3 bg-gray-50 rounded-lg">
                    {profileData.phone}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                  <FaMapMarkerAlt className="text-cyan-500" />
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.location}
                    onChange={(e) =>
                      setEditData({ ...editData, location: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-800 text-base md:text-lg px-4 py-3 bg-gray-50 rounded-lg">
                    {profileData.location}
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-8">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 font-medium"
                >
                  <FaSave />
                  Save Changes
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 font-medium"
                >
                  <FaTimes />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

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
              <p className="text-2xl md:text-3xl font-bold text-blue-800">12</p>
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
    </div>
  );
};

export default Profile;
