import { useEffect, useState } from "react";
import { Button, TextField, Dialog, MenuItem } from "@mui/material";
import axios from "axios";
// import { cleanDigitSectionValue } from "@mui/x-date-pickers/internals/hooks/useField/useField.utils";

function Asset() {
  const [addAsset, setAddAsset] = useState(false);
  const [data, setData] = useState([]);
  const [employeeNames, setEmployeeNames] = useState([]);
  const [fieldsReadonly, setFieldsReadonly] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    assetName: "",
    assetId: "",
    employeeName: "",
    employeeId: "",
    grantedDate: "",
    validUpto: "",
    assetValue: "",
    description: "",
    status: "",
  });

  // Search state
  const [searchCriteria, setSearchCriteria] = useState({
    employeeName: "",
    status: "",
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    AssetData();
    fetchEmployeeNames();
  }, []);

  const AssetData = async () => {
    try {
      let { data: { data } } = await axios.get("http://server.ovf.bgg.mybluehostin.me:8080/findAllAsset");
      console.log("Assets retrieved:", data);
      setData(data);
    } catch (error) {
      console.error("Error fetching assets:", error.message);
    }
  };

  const fetchEmployeeNames = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://server.ovf.bgg.mybluehostin.me:8080/getNameAndDepartment"
      );
      setEmployeeNames(response.data.data); // Ensure department is part of the response
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching employee names:", error.message);
    } finally {
      setLoading(false);
    }
  };
  

  const handleAddAssetSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://server.ovf.bgg.mybluehostin.me:8080/grantAsset", formData);
      setAddAsset(false);
      AssetData();
      reset();
    } catch (error) {
      console.error("Error adding asset:", error.message);
    }
  };

  const handleFormChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const handleDepartmentChange = (department) => {
    handleFormChange("department", department);
    const employeesInDepartment = employeeNames.filter(
      (employee) => employee.department === department
    );
    setFilteredEmployees(employeesInDepartment);
    setFormData((prevData) => ({
      ...prevData,
      employeeName: "",
      employeeId: "",
    }));
  };
  



  const handleEmployeeChange = (field, value) => {
    const selectedEmployee = filteredEmployees.find(
      (employee) => employee.employeeName === value
    );
    if (selectedEmployee) {
      setFormData({
        ...formData,
        employeeName: selectedEmployee.employeeName,
        employeeId: selectedEmployee.employeeId,
      });
    }
  };
  

  console.log(formData.employeeName)

  const handleDialogClose = () => {
    setAddAsset(false);
    setFormData({
      assetName: "",
      assetId: "",
      employeeName: "",
      employeeId: "",
      grantedDate: "",
      validUpto: "",
      assetValue: "",
      description: "",
      status: "",
    });
    setFieldsReadonly(false);
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredData = data.filter((employee) => {
    const matchesEmployeeName =
      employee.employeeName &&
      employee.employeeName.toLowerCase().includes(searchCriteria.employeeName.toLowerCase());
    const matchesStatus = searchCriteria.status
      ? employee.status === searchCriteria.status
      : true;
    const matchesFromDate = searchCriteria.fromDate
      ? new Date(employee.grantedDate) >= new Date(searchCriteria.fromDate)
      : true;
    const matchesToDate = searchCriteria.toDate
      ? new Date(employee.grantedDate) <= new Date(searchCriteria.toDate)
      : true;

    return matchesEmployeeName && matchesStatus && matchesFromDate && matchesToDate;
  });




// Handle the Status
const handleStatusChange = async (id, newStatus) => {
  console.log(`Updating Asset ID: ${id} with status: ${newStatus}`);
  try {
    // Send the updated status to the backend
    const response = await axios.put(
      `http://server.ovf.bgg.mybluehostin.me:8080/changeStatus/${id}`,
      {
        status: newStatus,
      }
    );

    console.log("Response from backend:", response.data);

    // Update the status in the current list without re-fetching
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );

    alert("Status updated successfully!");
  } catch (error) {
    console.error("Error updating status:", error);
    alert("Failed to update status.");
  }
};



console.log(filteredData)





  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-xl sm:text-2xl font-bold text-yellow-600">Assets</h2>
        <Button
          variant="contained"
          color="error"
          sx={{
            bgcolor: "#b17f27",
            color: "#fffff",
          }}
          onClick={() => {
            setAddAsset(true);
          }}
        >
          <b> + Add Asset</b>
        </Button>
      </div>

      {/* Breadcrumb */}
      <div className="text-yellow-600 text-sm md:text-base mb-8">
        Dashboard /<span className="text-yellow-600 font-medium"> Asset</span>
      </div>

      {/* Search Criteria */}
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <TextField
            fullWidth
            variant="outlined"
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
              color: "#fffff",
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
                {/* <td className="p-2 sm:p-3">
                  <span
                    className={`${
                      employee.status === "APPROVED"
                        ? "text-green-500"
                        : employee.status === "PENDING"
                        ? "text-red-500"
                        : employee.status === "GRANTED"
                        ? "text-orange-500"
                        : employee.status === "RETURNED"
                        ? "text-blue-500"
                        : ""
                    }`}
                  >
                    {employee.status}
                  </span>
                </td> */}

                <td className="py-2 px-2 md:px-4 border-b">
                    <TextField
                      fullWidth
                      variant="outlined"
                      size="small"
                      select
                      value={employee.status || ""}
                      onChange={(e) =>
                        handleStatusChange(employee.id, e.target.value)
                      }
                    >
                      <MenuItem value="GRANTED"><span className="text-orange-500">GRANTED</span></MenuItem>
                      <MenuItem value="PENDING"><span className="text-red-500">PENDING</span></MenuItem>
                      <MenuItem value="APPROVED"><span className="text-green-500">APPROVED</span></MenuItem>
                      <MenuItem value="RETURNED"><span className="text-blue-500">RETURNED</span></MenuItem>
                    </TextField>
                  </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Asset Dialog */}
     {/* Add Asset Dialog */}
<Dialog
  open={addAsset}
  onClose={handleDialogClose}
  fullWidth
  maxWidth="sm"
>
  <div className="p-6">
    <h3 className="text-xl sm:text-2xl font-semibold text-center mb-6">
      Add Asset
    </h3>
    <form className="space-y-4" onSubmit={handleAddAssetSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Asset Name */}
        <TextField
          fullWidth
          label="Asset Name"
          variant="outlined"
          required
          name="assetName"
          value={formData.assetName}
          onChange={(e) => handleFormChange("assetName", e.target.value)}
        />

        {/* Asset ID */}
        <TextField
          fullWidth
          label="Asset Id"
          variant="outlined"
          name="assetId"
          value={formData.assetId}
          onChange={(e) => handleFormChange("assetId", e.target.value)}
        />

        {/* Department */}
        <TextField
          fullWidth
          select
          label="Department"
          variant="outlined"
          value={formData.department}
          onChange={(e) => handleDepartmentChange(e.target.value)}
        >
          <MenuItem value="SALES">Sales</MenuItem>
          <MenuItem value="MARKETING">Marketing</MenuItem>
          <MenuItem value="TECH">Tech</MenuItem>
          <MenuItem value="OTHER">Other</MenuItem>
        </TextField>

        {/* Employee Name */}
        <TextField
          fullWidth
          label="Employee Name"
          select
          variant="outlined"
          value={formData.employeeName}
          onChange={(e) =>
            handleEmployeeChange("employeeName", e.target.value)
          }
        >
          {filteredEmployees.map((employee) => (
            <MenuItem key={employee.employeeId} value={employee.employeeName}>
              {employee.employeeName}
            </MenuItem>
          ))}
        </TextField>

        {/* Employee ID */}
        <TextField
          fullWidth
          label="Employee Id"
          variant="outlined"
          value={formData.employeeId}
          disabled
        />

        {/* Granted Date */}
        <TextField
          fullWidth
          label="Granted Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          name="grantedDate"
          value={formData.grantedDate}
          onChange={(e) => handleFormChange("grantedDate", e.target.value)}
          inputProps={{
            min: new Date().toISOString().split("T")[0], // Disable past dates
          }}
        />

        {/* Valid Upto */}
        <TextField
          fullWidth
          label="Valid Upto (In Months)"
          type="date"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          name="validUpto"
          value={formData.validUpto}
          onChange={(e) => handleFormChange("validUpto", e.target.value)}
          inputProps={{
            min: new Date().toISOString().split("T")[0], // Disable past dates
          }}
        />

        {/* Asset Value */}
        <TextField
          fullWidth
          label="Value"
          type="tel"
          variant="outlined"
          name="assetValue"
          value={formData.assetValue}
          onChange={(e) => handleFormChange("assetValue", e.target.value)}
        />
      </div>

      {/* Description */}
      <TextField
        fullWidth
        multiline
        rows={3}
        label="Description"
        variant="outlined"
        name="description"
        value={formData.description}
        onChange={(e) => handleFormChange("description", e.target.value)}
      />

      {/* Status */}
      <TextField
        fullWidth
        select
        label="Status"
        variant="outlined"
        name="status"
        value={formData.status}
        onChange={(e) => handleFormChange("status", e.target.value)}
      >
        <MenuItem value="PENDING">Pending</MenuItem>
        <MenuItem value="APPROVED">Approved</MenuItem>
        <MenuItem value="GRANTED">Granted</MenuItem>
        <MenuItem value="RETURNED">Returned</MenuItem>
      </TextField>

      <div className="flex justify-end space-x-2">
        <Button
          variant="contained"
          sx={{
            bgcolor: "#CD5C5C",
          }}
          onClick={handleDialogClose}
        >
          <b>Cancel</b>
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#b17f27",
            color: "#fffff",
          }}
          type="submit"
        >
          <b>Submit</b>
        </Button>
      </div>
    </form>
  </div>
</Dialog>

    </div>
  );
}

export default Asset;
