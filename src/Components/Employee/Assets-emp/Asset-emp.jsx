import React, { useState, useEffect } from "react";
import { Button, TextField, MenuItem } from "@mui/material";
import axios from "axios";
import {useAuth} from "../../../Components/Context/AuthContext"

function Assest() {
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    employeeName: "",
    status: "",
    fromDate: "",
    toDate: ""
  });

  const {authState}=useAuth()
  // Simulate getting logged-in user employeeId (for now hardcoded as "EMP001")
  const loggedInEmployeeId = authState.userDetails.employeeId;

  console.log(loggedInEmployeeId)

  const AssetData = async () => {
    try {
      let { data: { data } } = await axios.get("http://server.ovf.bgg.mybluehostin.me:8080/findAllAsset");
      console.log(data);
      setData(data);
    } catch (error) {
      if (error.response) {
        console.error("Server responded with an error:", error.response.data);
      } else {
        console.error("Error fetching assets:", error.message);
      }
    }
  };

  useEffect(() => {
    AssetData();
  }, []);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const handleSearchChange = (event) => {
    const { name, value } = event.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  // Filtered data based on search criteria and logged-in employeeId
  const filteredData = data.filter((employee) => {
    const matchesEmployeeId = employee.employeeId === loggedInEmployeeId; // Only show assets for logged-in employee
    const matchesEmployeeName = employee.employeeName && employee.employeeName.toLowerCase().includes(searchCriteria.employeeName.toLowerCase());
    const matchesStatus = searchCriteria.status ? employee.status === searchCriteria.status : true;
    const matchesFromDate = searchCriteria.fromDate ? new Date(employee.grantedDate) >= new Date(searchCriteria.fromDate) : true;
    const matchesToDate = searchCriteria.toDate ? new Date(employee.grantedDate) <= new Date(searchCriteria.toDate) : true;

    return matchesEmployeeId && matchesEmployeeName && matchesStatus && matchesFromDate && matchesToDate;
  });

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-600">
          Assets
        </h2>
      </div>

      {/* Breadcrumb */}
      <div className="text-sm text-yellow-600 mb-4 sm:mb-6 ">
        <a href="#" className="hover:underline">
          Dashboard
        </a>
        /
        <span className="font-semibold text-yellow-600">
          <a href="#" className="hover:underline">
            Assets
          </a>
        </span>
      </div>

      {/* Search Criteria */}
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <TextField
            fullWidth variant="outlined"
            label="Employee Name"
            size="small"
            name="employeeName"
            value={searchCriteria.employeeName}
            onChange={handleSearchChange}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Status"
            size="small"
            select
            name="status"
            value={searchCriteria.status}
            onChange={handleSearchChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="APPROVED">Approved</MenuItem>
            <MenuItem value="GRANTED">Granted</MenuItem>
            <MenuItem value="RETURNED">Returned</MenuItem>
          </TextField>
          <TextField
            fullWidth
            variant="outlined"
            label="From Date"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            name="fromDate"
            value={searchCriteria.fromDate}
            onChange={handleSearchChange}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="To Date"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
            name="toDate"
            value={searchCriteria.toDate}
            onChange={handleSearchChange}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: "#b17f27",
              color: "#000000",
            }}
          >
            <b>Search</b>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="p-2 sm:p-3">Asset Employee Name</th>
              <th className="p-2 sm:p-3">Asset Name</th>
              <th className="p-2 sm:p-3">Asset Id</th>
              <th className="p-2 sm:p-3">Asset Employee Id</th>
              <th className="p-2 sm:p-3">Granted date</th>
              <th className="p-2 sm:p-3">Valid Upto</th>
              <th className="p-2 sm:p-3">Value</th>
              <th className="p-2 sm:p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((employee, index) => (
              <tr className="border-b hover:bg-gray-50" key={index}>
                <td className="p-2 sm:p-3">{employee.employeeName}</td>
                <td className="p-2 sm:p-3 font-bold">{employee.assetName}</td>
                <td className="p-2 sm:p-3">{employee.assetId}</td>
                <td className="p-2 sm:p-3">{employee.employeeId}</td>
                <td className="p-2 sm:p-3">{employee.grantedDate}</td>
                <td className="p-2 sm:p-3">{employee.validUpto}</td>
                <td className="p-2 sm:p-3">{employee.assetValue}</td>
                <td className="p-2 sm:p-3">
                  <span className="bg-yellow-100 text-yellow-800 py-1 px-2 rounded-full text-xs sm:text-sm">
                    {employee.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Assest;