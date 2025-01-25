import { useState, useEffect } from "react";
import axios from "axios";

function OnsiteAdminPanel() {
  const [status, setStatus] = useState("");
  const [data, setData] = useState([]);

  const OnsiteData = async () => {
    try {
      const response = await axios.get("http://server.ovf.bgg.mybluehostin.me:8080/findAllOnsiteEmployees");
      console.log(response.data.data);
      setData(response.data.data);  // Assuming the response has a 'data' property
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    OnsiteData();
  }, []);

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-semibold">Onsite</h2>
        <div className="text-gray-500 text-sm md:text-base">
          Dashboard / <span className="text-gray-700 font-medium">Onsite</span>
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
              <th className="text-left py-2 px-2 md:px-4 border-b">Client Name</th>
              <th className="text-left py-2 px-2 md:px-4 border-b">Project Name</th>
              <th className="text-left py-2 px-2 md:px-4 border-b">Contact No.</th>
              {/* <th className="text-left py-2 px-2 md:px-4 border-b">Onsite Date</th> */}
              <th className="text-left py-2 px-2 md:px-4 border-b">Location</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => (
              <tr key={employee.employeeId} className="hover:bg-gray-50">
                <td className="py-2 px-2 md:px-4 border-b">{index + 1}</td>
                <td className="py-2 px-2 md:px-4 border-b">{employee.empName}</td>
                <td className="py-2 px-2 md:px-4 border-b">{employee.employeeId}</td>
                <td className="py-2 px-2 md:px-4 border-b">{employee.clientName}</td>
                <td className="py-2 px-2 md:px-4 border-b">{employee.projectName}</td>
                <td className="py-2 px-2 md:px-4 border-b">{employee.empContactNo}</td>
                {/* <td className="py-2 px-2 md:px-4 border-b">{employee.dateOfSite}</td> */}
                <td className="py-2 px-2 md:px-4 border-b">{employee.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OnsiteAdminPanel;