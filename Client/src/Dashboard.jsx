import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = ({ user }) => {
  const [profile, setProfile] = useState({
    name: "",
    email: user?.email || "",
    university: "",
    college: "",
    semester: "",
    goals: "",
    timeLeft: "",
    proficiency: "Beginner",
    studyHoursWeekdays: "",
    studyHoursWeekends: "",
  });
  const API_URL = "https://auth-v1-1gd1.onrender.com";

  // Redirect immediately if user.profile is true
  if (user?.profile) {
    window.location.href = "https://kplor.com/";
    return null; // Prevents any UI from rendering
  }

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/profile`, profile);
      console.log("Profile created:", res.data);
      window.location.href = "https://kplor.com/"; // Redirect after successful profile creation
    } catch (err) {
      console.error("Profile creation failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Create Your Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">University</label>
            <input
              type="text"
              name="university"
              value={profile.university}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">College</label>
            <input
              type="text"
              name="college"
              value={profile.college}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Semester</label>
            <input
              type="text"
              name="semester"
              value={profile.semester}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Goals (Objective)</label>
            <textarea
              name="goals"
              value={profile.goals}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700">
              Time Left to Study (in months)
            </label>
            <input
              type="number"
              name="timeLeft"
              min="0"
              max="12"
              value={profile.timeLeft}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Proficiency in Subject</label>
            <select
              name="proficiency"
              value={profile.proficiency}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Study Hours (Weekdays)</label>
            <input
              type="number"
              name="studyHoursWeekdays"
              min="0"
              max="24"
              value={profile.studyHoursWeekdays}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Study Hours (Weekends)</label>
            <input
              type="number"
              name="studyHoursWeekends"
              min="0"
              max="24"
              value={profile.studyHoursWeekends}
              onChange={handleChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
