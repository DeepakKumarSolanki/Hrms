import { useState, useEffect } from "react";
import { TextField, MenuItem, CircularProgress } from "@mui/material";
import axios from "axios";

function ResignationAdminPanel() {
  const [data, setData] = useState([]); // State to store resignation details
  const [loading, setLoading] = useState(false); // State to handle loading
  const [error, setError] = useState(""); // State to handle errors

  // Fetch resignation data from the backend
  const fetchResignationData = async () => {
    setLoading(true);
    setError(""); // Clear any previous errors
    try {
      const response = await axios.get(
        "http://server.ovf.bgg.mybluehostin.me:8080/getResignationDetails"
      );
      setData(response.data.data); // Assuming the response contains a data field
    } catch (error) {
      console.error("Error fetching resignation data:", error);
      setError("Failed to fetch resignation data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchResignationData();
  }, []);

  // Handle change in status locally and persist it to the backend
  const handleStatusChange = async (resignationId, newStatus) => {
    console.log(`Updating resignation ID: ${resignationId} with status: ${newStatus}`);
    try {
      // Send the updated status to the backend
      const response = await axios.put(
       `http://server.ovf.bgg.mybluehostin.me:8080/editResignationStatus/${resignationId}`,
        {
          resignationStatus: newStatus,
        }
      );
  
      console.log("Response from backend:", response.data);
  
      // Re-fetch data from the backend to ensure synchronization
      const updatedData = await axios.get("http://server.ovf.bgg.mybluehostin.me:8080/getResignationDetails");
      console.log(updatedData.data.data);
      setData(updatedData.data.data); // Update state with fresh data from backend
      // alert("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please check the backend and try again.");
    }
  };
  

  // Render the component
  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-yellow-600">Resignation Panel</h2>
        <div className="text-gray-500 text-sm md:text-base text-yellow-600">
          Dashboard / <span className="text-gray-700 font-medium text-yellow-600">Resignation</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-500 text-center mb-4">
          {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : (
        // Table to display resignation details
        <div className="overflow-x-auto bg-white rounded-md shadow-md">
          <table className="table-auto w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-2 px-2 md:px-4 border-b">No.</th>
                <th className="text-left py-2 px-2 md:px-4 border-b">Employee Name</th>
                <th className="text-left py-2 px-2 md:px-4 border-b">Employee ID</th>
                <th className="text-left py-2 px-2 md:px-4 border-b">Email</th>
                <th className="text-left py-2 px-2 md:px-4 border-b">Contact No.</th>
                <th className="text-left py-2 px-2 md:px-4 border-b">Resignation Date</th>
                <th className="text-left py-2 px-2 md:px-4 border-b">Reason</th>
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
                      size="small"
                      select
                      value={employee.resignationStatus || ""}
                      onChange={(e) =>
                        handleStatusChange(employee.resignationId, e.target.value)
                      }
                    >
                      <MenuItem value="ACCEPTED"><span className="text-green-500">ACCEPTED</span></MenuItem>
                      <MenuItem value="REJECTED"><span className="text-red-500">REJECTED</span></MenuItem>
                    </TextField>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ResignationAdminPanel;