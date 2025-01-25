import React, { useState } from "react";
import { TextField, MenuItem } from "@mui/material";

const Calendar2025 = () => {
  const [status, setStatus] = useState("Backend");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const months = [
    { name: "January", days: 31, startDay: 3 },
    { name: "February", days: 28, startDay: 6 },
    { name: "March", days: 31, startDay: 6 },
    { name: "April", days: 30, startDay: 2 },
    { name: "May", days: 31, startDay: 5 },
    { name: "June", days: 30, startDay: 1 },
    { name: "July", days: 31, startDay: 3 },
    { name: "August", days: 31, startDay: 6 },
    { name: "September", days: 30, startDay: 1 },
    { name: "October", days: 31, startDay: 4 },
    { name: "November", days: 30, startDay: 7 },
    { name: "December", days: 31, startDay: 2 },
  ];

  const generateDays = (daysInMonth, startDay) => {
    let daysArray = [];
    let currentDay = 1;

    for (let i = 0; i < startDay; i++) {
      daysArray.push(null);
    }

    while (currentDay <= daysInMonth) {
      daysArray.push(currentDay);
      currentDay++;
    }

    return daysArray;
  };

  const backendHighlightDates = {
    January: [5, 12, 19, 26],
    February: [2, 9, 16, 23],
    March: [2, 9, 16, 23, 30],
    April: [6, 13, 20, 27],
    May: [3, 10, 17, 24, 31],
    June: [7, 14, 21, 28],
    July: [5, 12, 19, 26],
    August: [2, 9, 16, 23, 30],
    September: [7, 14, 21, 28],
    October: [4, 11, 18, 25],
    November: [1, 8, 15, 22, 29],
    December: [6, 13, 20, 27],
  };

  const governmentHolidayDates = {
    January: { 26: "Republic Day" },
    August: { 15: "Independence Day", 27: "Ganesh Chaturthi" },
    October: {
      1: "Maha Navami",
      2: "Gandhi Jayanti & Vijaya Dashami",
      21: "Diwali",
      22: "Deepavali",
    },
    November: { 1: "Kannada Rajyothsava" },
    December: { 25: "Christmas" },
  };

  const restrictedHolidayDates = {
    January: { 1: "New Year" },
    March: { 14: "Holi Festival", 27: "Jumat-ul-wida", 28: "Shab-e-qadar" },
    April: { 6: "Ramanavami" },
    May: { 12: "Buddha Poornima" },
    August: {
      8: "Vara Mahalakshmi Vrta",
      9: "Rug-upakarma",
      16: "Krishna Janmashtami",
      25: "Swama Gowri Vrata",
    },
    September: { 7: "Brahma Shri Narayana Guru Jayanthi" },
    October: { 17: "Vishwakarma Jayanthi" },
    December: { 24: "Christmas Eve" },
  };

  const isHighlighted = (monthName, day) => {
    if (governmentHolidayDates[monthName]?.[day]) {
      return "bg-green-400 text-white shadow-md";
    }
    if (restrictedHolidayDates[monthName]?.[day]) {
      return "bg-blue-400 text-white shadow-md";
    }
    if (
      status === "Backend" &&
      backendHighlightDates[monthName]?.includes(day)
    ) {
      return "bg-red-400 text-white shadow-md";
    }
    if (status === "Sales" && salesHighlightDates[monthName]?.includes(day)) {
      return "bg-red-400 text-white shadow-md";
    }
    return "bg-gray-100 text-gray-700";
  };


  return (
    <div className="bg-gray-100 min-h-screen p-4 md:p-8">
      <div className="bg-white shadow-lg rounded-xl p-4 md:p-8 max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-extrabold text-yellow-600 text-center mb-8">
          2025 Calendar
        </h1>

        {/* Dropdown */}
        <div className="mb-8 flex justify-center">
          <TextField
            fullWidth
            variant="outlined"
            label="Select Department"
            size="medium"
            select
            value={status}
            onChange={handleChange}
            className="bg-white shadow-md w-full max-w-md"
          >
            <MenuItem value="Backend">Backend Department</MenuItem>
          </TextField>
        </div>

        {/* Note Section */}
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 shadow-md rounded-lg p-6 mb-8 border border-yellow-200">
        <h2 className="text-lg sm:text-xl font-semibold text-yellow-800 mb-4">
          <b>📌 Note for Employees</b>
        </h2>
        <div className="flex items-center mb-4">
          <p className="text-xl mr-2">🔴</p>
          <h1 className="text-sm sm:text-lg">
            The Red dates are holidays for specific-selected department.
          </h1>
        </div>
        <div className="flex items-center mb-4">
          <p className="text-xl mr-2">🟢</p>
          <h1 className="text-sm sm:text-lg">
            The Green dates are public holidays.
          </h1>
        </div>
        <div className="flex items-center">
          <p className="text-xl mr-2">🔵</p>
          <h1 className="text-sm sm:text-lg">
            The Blue dates are restricted holidays.
          </h1>
        </div>
      </div>


        {/* Calendar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {months.map((month, index) => {
            const daysArray = generateDays(month.days, month.startDay);

            return (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-lg shadow-md p-4"
              >
                <h2 className="text-lg md:text-xl font-bold text-center text-blue-700 mb-4">
                  {month.name}
                </h2>
                <div className="grid grid-cols-7 gap-2 text-center">
                  {daysOfWeek.map((day, i) => (
                    <div
                      key={i}
                      className="text-xs md:text-sm font-semibold text-gray-600 uppercase"
                    >
                      {day}
                    </div>
                  ))}
                  {daysArray.map((day, i) => (
                    <div
                      key={i}
                      className={`rounded-full text-xs md:text-sm font-medium py-1 md:py-2 ${
                        day
                          ? `${isHighlighted(
                              month.name,
                              day
                            )} hover:bg-blue-200 hover:shadow cursor-pointer`
                          : "invisible"
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar2025;
