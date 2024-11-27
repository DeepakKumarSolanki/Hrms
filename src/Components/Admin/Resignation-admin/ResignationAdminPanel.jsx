import {useState} from "react"
import {TextField, MenuItem } from "@mui/material";
function ResignationAdminPanel() {
  
  const [status, setStatus] = useState(""); 

  const handleChange = (event) => {
    setStatus(event.target.value); 
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
              <th className="text-left py-2 px-2 md:px-4 border-b">
                Employee Name
              </th>
              <th className="text-left py-2 px-2 md:px-4 border-b">
                Employee Id
              </th>
              <th className="text-left py-2 px-2 md:px-4 border-b">
               Employee Email
              </th>
              <th className="text-left py-2 px-2 md:px-4 border-b">Contact No.</th>
              <th className="text-left py-2 px-2 md:px-4 border-b">Date of Resignation</th>
              <th className="text-left py-2 px-2 md:px-4 border-b">Status</th>
        
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="py-2 px-2 md:px-4 border-b">1</td>
              <td className="py-2 px-2 md:px-4 border-b">John Doe</td>
              <td className="py-2 px-2 md:px-4 border-b">Kings1201#s</td>
              <td className="py-2 px-2 md:px-4 border-b">john@kingsmenrealty.com</td>
              <td className="py-2 px-2 md:px-4 border-b">9271910870</td>
              <td className="py-2 px-2 md:px-4 border-b">20 Nov 2020</td>
              <td className="py-2 px-2 md:px-4 border-b" >
              <TextField
            fullWidth
            variant="outlined"
            label="Status"
            size="small"
            select
            value={status} 
            onChange={handleChange} // Handle the change event
          >
             <MenuItem value="Accept">✅ Accepted</MenuItem>
             <MenuItem value="Reject">❌ Rejected</MenuItem>
          </TextField>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

<div/>
</div>
  );
}
  

export default ResignationAdminPanel
