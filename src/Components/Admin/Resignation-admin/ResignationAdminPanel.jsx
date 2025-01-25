import { useState, useEffect } from "react";
import { TextField, MenuItem } from "@mui/material";
import axios from "axios";

function ResignationAdminPanel() {
  const [data, setData] = useState([]);

  // Fetch resignation data from the backend
  const fetchResignationData = async () => {
    try {
      const response = await axios.get(
        "http://server.ovf.bgg.mybluehostin.me:8080/getResignationDetails"
      );
      console.log(response.data.data);
      setData(response.data.data); // Adjust according to the structure of your API response
    } catch (error) {
      console.error("Error fetching resignation data:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchResignationData();
  }, []);

  // Handle change in status locally and persist it
  const handleStatusChange = async (employee, resignationId, newStatus) => {
    try {
      // Update the backend
      await axios.put(`http://server.ovf.bgg.mybluehostin.me:8080/editResignationStatus/${resignationId}`
        , {
        id: resignationId,
        employeeDetail: { ...employee }, // Make sure the employee details are properly passed
        status: newStatus,
      });

      // Reflect changes locally
      setData((prevData) =>
        prevData.map((employee) =>
          employee.resignationId === resignationId
            ? { ...employee, resignationStatus: newStatus }
            : employee
        )
      );
      alert("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold">Resignation</h2>
        <div className="text-gray-500 text-sm md:text-base">
          Dashboard /<span className="text-gray-700 font-medium">Resignation</span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-md shadow-md">
        <table className="table-auto w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-2 px-2 md:px-4 border-b">No.</th>
              <th className="text-left py-2 px-2 md:px-4 border-b">Employee Name</th>
              <th className="text-left py-2 px-2 md:px-4 border-b">Employee Id</th>
              <th className="text-left py-2 px-2 md:px-4 border-b">Employee Email</th>
              <th className="text-left py-2 px-2 md:px-4 border-b">Contact No.</th>
              <th className="text-left py-2 px-2 md:px-4 border-b">Date of Resignation</th>
              <th className="text-left py-2 px-2 md:px-4 border-b">Resignation Reason</th>
              <th className="text-left py-2 px-2 md:px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => (
              <tr className="hover:bg-gray-50" key={employee.resignationId}>
                <td className="py-2 px-2 md:px-4 border-b">{index + 1}</td>
                <td className="py-2 px-2 md:px-4 border-b">{employee.name}</td>
                <td className="py-2 px-2 md:px-4 border-b">{employee.employeeId}</td>
                <td className="py-2 px-2 md:px-4 border-b">{employee.email}</td>
                <td className="py-2 px-2 md:px-4 border-b">{employee.contactNumber}</td>
                <td className="py-2 px-2 md:px-4 border-b">{employee.dateOfResignation}</td>
                <td className="py-2 px-2 md:px-4 border-b">{employee.resignationReason}</td>
                <td className="py-2 px-2 md:px-4 border-b">
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Status"
                    size="small"
                    select
                    value={employee.resignationStatus || ""} // Default to empty if no status
                    onChange={(e) => handleStatusChange(employee, employee.resignationId, e.target.value)} // Update status locally and in backend
                  >
                    <MenuItem value="Accepted">🟢 Accepted</MenuItem>
                    <MenuItem value="Rejected">🔴 Rejected</MenuItem>
                  </TextField>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ResignationAdminPanel;