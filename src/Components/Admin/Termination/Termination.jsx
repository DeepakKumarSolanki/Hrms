import React, { useState, useEffect } from "react";
import { Dialog, TextField, Button, MenuItem } from "@mui/material";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function TerminationPage() {
  const [addTermination, setAddTermination] = useState(false);
  const [editTermination, setEditTermination] = useState(false);
  const [deleteTermination, setDeleteTermination] = useState(false);
  const [data, setData] = useState([]);
  const [selectedTerminationId, setSelectedTerminationId] = useState(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm();

  // Fetch Termination Data
  const fetchTerminationData = async () => {
    try {
      const response = await axios.get(
        "http://server.ovf.bgg.mybluehostin.me:8080/findAllTermination"
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching termination data:", error);
    }
  };

  // Add Termination
  const handleAddTerminationSubmit = async (formData) => {
    try {
      await axios.post(
        "http://server.ovf.bgg.mybluehostin.me:8080/terminationDetail",
        formData
      );
      setAddTermination(false);
      fetchTerminationData();
      reset();
    } catch (error) {
      console.error("Error adding termination:", error);
      alert("Employee Already Terminated")
    }
  };



  // Edit Termination
  // Edit Termination
  const handleEditTerminationSubmit = async (formData) => {
    try {
      // Send the updated data to the backend
      await axios.put(
        `http://server.ovf.bgg.mybluehostin.me:8080/editTerminationDetail?terminationDetailId=${selectedTerminationId}`,
        formData
      );
  
      // Update the local state without re-fetching
      fetchTerminationData((prevData) =>
        prevData.map((termination) =>
          termination.selectedTerminationId === selectedTerminationId
            ? { ...termination, ...formData } // Update the specific termination entry
            : termination
        )
      );
  
      // Close the modal and reset the form
      setEditTermination(false);
      reset();
    } catch (error) {
      console.error("Error editing termination:", error);
    }
  };
  

  // const handleEditTerminationSubmit = async (formData) => {
  //   try {
  //     // Send updated data to the backend
  //     await axios.put(
  //       `http://server.ovf.bgg.mybluehostin.me:8080/editTerminationDetail?terminationDetailId=${selectedTerminationId}`,
  //       formData
  //     );
  
  //     // Update the local state without re-fetching
  //     fetchTerminationData((prevData) =>
  //       prevData.map((termination) =>
  //         termination.id === selectedTerminationId
  //           ? { ...termination, ...formData }
  //           : termination
  //       )
  //     );
  
  //     setEditTermination(false); // Close the modal
  //     reset(); // Reset the form
  //   } catch (error) {
  //     console.error("Error editing termination:", error);
  //   }
  // };
  

  // Delete Termination
  const deleteTerminationOfEmployee = async () => {
    try {
      const response = await axios.delete(
        `http://server.ovf.bgg.mybluehostin.me:8080/deleteTerminationDetail/${selectedTerminationId}`,
        { withCredentials: true }  // Add this if your server requires credentials
      );
      setData((prevData) =>
        prevData.filter(
          (employee) => employee.terminationDetailId !== selectedTerminationId
        )
      );
      setDeleteTermination(false);
    } catch (error) {
      console.error("Error deleting termination:", error);
    }
  };
  
  // Open Edit Modal
  const handleEditClick = (termination) => {
    setSelectedTerminationId(termination.terminationDetailId);
    reset({
      employeeName: termination.employeeName,
      employeeId: termination.employeeId,
      department: termination.department,
      terminationType: termination.terminationType,
      terminationDate: termination.terminationDate,
      terminationReason: termination.terminationReason,
      noticeDate: termination.noticeDate,
    });
    setEditTermination(true);
  };

  // Open Delete Confirmation
  const handleDeleteClick = (id) => {
    setSelectedTerminationId(id);
    setDeleteTermination(true);
  };

  useEffect(() => {
    fetchTerminationData();
  }, []);



  // dropdown

  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  
  // Fetch employee data
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://server.ovf.bgg.mybluehostin.me:8080/getNameAndDepartment"); // Replace with actual API
    
        setEmployeeData(response.data.data); // Assuming data is an array of employee objects { id, name, department }
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchEmployees();
  }, []);
  
  // Watch for changes to department and employeeName
  const department = watch("department");
  const employeeName = watch("employeeName");
  
  // Filter employees by department when the department changes
  useEffect(() => {
    if (department) {
      const filtered = employeeData.filter((emp) => emp.department === department);
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees([]);
    }
  }, [department, employeeData]);
  
  // Automatically update employeeId based on selected employeeName
  useEffect(() => {
    if (employeeName) {
      const selectedEmployee = filteredEmployees.find((emp) => emp.employeeName === employeeName);
      if (selectedEmployee) {
        setValue("employeeId", selectedEmployee.employeeId); // Update employeeId
      }
    }
  }, [employeeName, filteredEmployees, setValue]);
  
  // // Handle form submission
  // const onSubmit = (data) => {
  //   console.log("Form Data:", data);
  //   // Submit logic here
  //   setAddTermination(false);
  // };
  

  return (
    <div className=" min-h-screen">
      <div className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center  pb-4">
          <h3 className="text-2xl font-semibold text-yellow-600">Termination</h3>
          
          <Button
            variant="contained"
            sx={{ bgcolor: "#B17F27", color: "#FFFF" ,marginLeft:"10px", }}
            onClick={() => setAddTermination(true)}
            startIcon={<i className="fa fa-plus" />}
          >
            <b className="text-sm">+ Add Termination</b>
          </Button>
        </div>
        <div className=" text-sm md:text-base text-yellow-600">
          Dashboard / <span className=" font-medium text-yellow-600">Termination</span>
        </div>

        {/* Table */}
        <div className="mt-6 bg-white rounded shadow overflow-x-auto">
          <table className="table-auto w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4">Employee Id</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4">Notice Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((employee) => (
                <tr className="border-b" key={employee.terminationDetailId}>
                  <td className="py-3 px-4">{employee.employeeId}</td>
                  <td className="py-3 px-4">{employee.employeeName}</td>
                  <td className="py-3 px-4">{employee.department}</td>
                  <td className="py-3 px-4">{employee.terminationType}</td>
                  <td className="py-3 px-4">{employee.terminationDate}</td>
                  <td className="py-3 px-4">{employee.terminationReason}</td>
                  <td className="py-3 px-4">{employee.noticeDate}</td>
                  <td className="py-3 px-4 text-right">
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "#b17f27", color: "#FFFF" }}
                      onClick={() => handleEditClick(employee)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "#CD5C5C", ml: 2 }}
                      onClick={() => handleDeleteClick(employee.terminationDetailId)}
                    >
                      <MdDelete/>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Termination Modal */}
      <Dialog open={addTermination} onClose={() => setAddTermination(false)}>
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">Add Termination</h3>
      <form onSubmit={handleSubmit(handleAddTerminationSubmit)} className="space-y-4">
        {/* Department */}
        <Controller
          name="department"
          control={control}
          rules={{ required: "Department is required" }}
          render={({ field }) => (
            <TextField
              fullWidth
              select
              label="Department"
              variant="outlined"
              {...field}
              error={!!errors.department}
              helperText={errors.department ? errors.department.message : ""}
            >
              <MenuItem value="SALES">SALES</MenuItem>
              <MenuItem value="MARKETING">MARKETING</MenuItem>
              <MenuItem value="TECH">TECH</MenuItem>
              <MenuItem value="OTHER">OTHER</MenuItem>
            </TextField>
          )}
        />

        {/* Employee Name */}
        <Controller
          name="employeeName"
          control={control}
          rules={{ required: "Employee Name is required" }}
          render={({ field }) => (
            <TextField
              fullWidth
              select
              label="Terminated Employee Name"
              variant="outlined"
              {...field}
              error={!!errors.employeeName}
              helperText={errors.employeeName ? errors.employeeName.message : ""}
            >
              {filteredEmployees.map((employee) => (
                <MenuItem key={employee.employeeId} value={employee.employeeName}>
                  {employee.employeeName}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        {/* Employee ID (Read-Only) */}
        <p>Terminated Employee ID</p>
        <Controller
          name="employeeId"
          control={control}
          rules={{ required: "Employee ID is required" }}
          render={({ field }) => (
            <TextField
              fullWidth
              variant="outlined"
              {...field}
              InputProps={{
                readOnly: true,
              }}
              error={!!errors.employeeId}
              helperText={errors.employeeId ? errors.employeeId.message : ""}
            />
          )}
        />

        {/* Termination Type */}
        <Controller
          name="terminationType"
          control={control}
          rules={{ required: "Termination Type is required" }}
          render={({ field }) => (
            <TextField
              fullWidth
              select
              label="Termination Type"
              variant="outlined"
              {...field}
              error={!!errors.terminationType}
              helperText={errors.terminationType ? errors.terminationType.message : ""}
            >
              <MenuItem value="Misconduct">Misconduct</MenuItem>
              <MenuItem value="Not follow the policy">Not follow the policy</MenuItem>
              <MenuItem value="Others">Others</MenuItem>
            </TextField>
          )}
        />

        {/* Termination Date */}
        <Controller
          name="terminationDate"
          control={control}
          rules={{ required: "Termination Date is required" }}
          render={({ field }) => (
            <TextField
              fullWidth
              label="Termination Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              {...field}
              error={!!errors.terminationDate}
              helperText={errors.terminationDate ? errors.terminationDate.message : ""}
              inputProps={{
                min: new Date().toISOString().split("T")[0], // Disable past dates
              }}
            />
          )}
        />

         {/* Termination Reason */}
         <Controller
            name="terminationReason"
            control={control}
            rules={{ required: "Termination Reason is required" }}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Termination Reason"
                variant="outlined"
                {...field}
                error={!!errors.terminationReason}
                helperText={errors.terminationReason ? errors.terminationReason.message : ""}
              />
            )}
          />

          {/* Notice Date */}
          <Controller
            name="noticeDate"
            control={control}
            rules={{ required: "Notice Date is required" }}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Notice Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                {...field}
                error={!!errors.noticeDate}
                helperText={errors.noticeDate ? errors.noticeDate.message : ""}
                inputProps={{
        min: new Date().toISOString().split("T")[0], // Disable past dates
      }}
              />
            )}
          />

        {/* Actions */}
        <div className="flex justify-end space-x-2 mt-4">
          <Button
            variant="contained"
            sx={{ bgcolor: "#CD5C5C" }}
            onClick={() => setAddTermination(false)}
          >
            <b>Cancel</b>
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "#b17f27", color: "#ffffff" }}
            type="submit"
          >
            <b>Submit</b>
          </Button>
        </div>
      </form>
    </div>
  </Dialog>

            
            

      {/* Edit Termination Modal */}
      <Dialog open={editTermination} onClose={() => setEditTermination(false)}>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Edit Termination</h3>
          <form onSubmit={handleSubmit(handleEditTerminationSubmit)} className="space-y-4">
            <Controller
              name="employeeName"
              control={control}
              rules={{ required: "Employee Name is required" }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Terminated Employee Name"
                  variant="outlined"
                  required
                  {...field}
                  error={!!errors.employeeName}
                  helperText={errors.employeeName ? errors.employeeName.message : ""}
                
                />
                
              )}
            />
            <Controller
              name="employeeId"
              control={control}
              rules={{ required: "Employee Id is required" }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Terminated Employee Id"
                  variant="outlined"
                  required
                  {...field}
                  error={!!errors.employeeId}
                  helperText={errors.employeeId ? errors.employeeId.message : ""}
                />
              )}
            />
            <Controller
              name="terminationType"
              control={control}
              rules={{ required: "Termination Type is required" }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  select
                  label="Termination Type"
                  variant="outlined"
                  {...field}
                  error={!!errors.terminationType}
                  helperText={errors.terminationType ? errors.terminationType.message : ""}
                >
                  <MenuItem value="Misconduct">Misconduct</MenuItem>
                  <MenuItem value="Not follow the policy">Not follow the policy</MenuItem>
                  <MenuItem value="Others">Others</MenuItem>
                </TextField>
              )}
            />
            <Controller
              name="terminationDate"
              control={control}
              rules={{ required: "Termination Date is required" }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Termination Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  {...field}
                  error={!!errors.terminationDate}
                  helperText={errors.terminationDate ? errors.terminationDate.message : ""}
                  inputProps={{
        min: new Date().toISOString().split("T")[0], // Disable past dates
      }}
                />
              )}
            />
            <Controller
  name="terminationReason"
  control={control}
  rules={{ required: "Termination Reason is required" }}
  render={({ field }) => (
    <TextField
      fullWidth
      label="Termination Reason"
      variant="outlined"
      {...field}
      error={!!errors.terminationReason}
      helperText={errors.terminationReason ? errors.terminationReason.message : ""}
    />
  )}
/>
           
            <Controller
              name="noticeDate"
              control={control}
              rules={{ required: "Notice Date is required" }}
              render={({ field }) => (
                <TextField
                  fullWidth
                  label="Notice Date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  {...field}
                  error={!!errors.noticeDate}
                  helperText={errors.noticeDate ? errors.noticeDate.message : ""}
                  inputProps={{
        min: new Date().toISOString().split("T")[0], // Disable past dates
      }}
                />
              )}
            />
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                variant="contained"
                sx={{ bgcolor: "#CD5C5C" }}
                onClick={() => setEditTermination(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: "#b17f27", color: "#FFFF" }}
                type="submit"
                onClick={() => {
                  handleEditTerminationSubmit(selectedemployeeId)
                  setEditTermination(false)}}
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Dialog>

      {/* Delete Confirmation Modal */}
       <Dialog open={deleteTermination} onClose={() => setDeleteTermination(false)}>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">
            Are you sure you want to delete this termination?
          </h3>
          <div className="flex justify-end space-x-2">
            <Button
              variant="contained"
              sx={{ bgcolor: "#CD5C5C" }}
              onClick={() => setDeleteTermination(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "#b17f27", color: "#FFFF" }}
              onClick={() => {
                deleteTerminationOfEmployee(selectedTerminationId)
                setDeleteTermination(false)
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </Dialog>

    </div>
  );
}

export default TerminationPage;
