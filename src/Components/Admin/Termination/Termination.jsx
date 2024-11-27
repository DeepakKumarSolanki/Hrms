import React, { useState, useEffect } from "react";
import { Dialog, TextField, Button, MenuItem, Menu } from "@mui/material";
import image from "./images/images.png";

import axios from "axios";
import { useForm, Controller } from "react-hook-form";

function TerminationPage() {
  const [addTermination, setaddTermination] = useState(false);
  const [editTermination, seteditTermination] = useState(false);
  const [deleteTermination, setdeleteTermination] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = (event) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);
  const [data, setData] = useState([]);
  const [selectedTerminationId, setSelectedTerminationId] = useState(null);

  const { control, handleSubmit, formState: { errors }, reset } = useForm();

  const TerminationData = async () => {
    try {
      let { data } = await axios.get("http://localhost:8080/terminations");
      console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTerminationSubmit = async (formData) => {
    console.log("Submitted Add Termination");
    try {
      await axios.post("http://localhost:8080/terminationDetail", formData);
      setaddTermination(false);
      TerminationData();
      reset();
    } catch (error) {
      console.error("Error adding termination:", error);
    }
  };

  const handleEditTerminationSubmit = async (formData) => {
    console.log("Submitted Edit Termination", formData);
    try {
      await axios.put(`http://localhost:8080/terminationDetail/${selectedTerminationId}`, formData);
      seteditTermination(false);
      TerminationData();
      reset();
    } catch (error) {
      console.error("Error editing termination:", error);
    }
  };

  const deleteTerminationOfEmployee = async (id) => {
    console.log("hii");
    console.log(id)
    try {
      await axios.delete(`http://localhost:8080/terminationDetail/${id}`);
      setdeleteTermination(false);
      TerminationData();
    } catch (error) {
      console.error("Error deleting termination:", error);
    }
  };

  // const handleEditClick = (termination) => {
  //   setSelectedTerminationId(termination.id);
  //   reset({
  //     employeeName: termination.employeeName,
  //     employeeId: termination.employeeId,
  //     terminationType: termination.terminationType,
  //     terminationDate: termination.terminationDate,
  //     terminationReason: termination.terminationReason,
  //     noticeDate: termination.noticeDate,
  //   });
  //   seteditTermination(true);
  // };

  const handleDeleteClick = (id) => {
    console.log(id)
    setSelectedTerminationId(id);
    setdeleteTermination(true);
  };

  useEffect(() => {
    TerminationData();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800">
              Termination
            </h3>
            <ul className="flex items-center space-x-2 text-gray-600 text-sm mt-1">
              <li>
                <a href="/admin-dashboard" className="hover:text-gray-900">
                  Dashboard
                </a>
              </li>
              <li>/</li>
              <li className="text-gray-800 font-medium">Termination</li>
            </ul>
          </div>
          <div>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#b17f27",
                color: "#FF",
              }}
              onClick={() => setaddTermination(true)}
              startIcon={<i className="fa fa-plus" />}
            >
              <b>Add Termination</b>
            </Button>
          </div>
        </div>

        {/* Table */}

        <div className="mt-6 bg-white rounded shadow overflow-x-auto">
          <table className="table-auto w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Terminated Employee</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Termination Type</th>
                <th className="py-3 px-4">Termination Date</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4">Notice Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            {data.map((employee, index) => {
              return (
                <tbody key={index}>
                  <tr className="border-b">
                    <td className="py-3 px-4">{index + 1}</td>
                    <td className="py-3 px-4 flex items-center space-x-2">
                      <img
                        src={image}
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />
                      <a
                        href="/profile"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {employee.employeeName}
                      </a>
                    </td>
                    <td className="py-3 px-4">{employee.department}</td>
                    <td className="py-3 px-4">{employee.terminationType}</td>
                    <td className="py-3 px-4">{employee.terminationDate}</td>
                    <td className="py-3 px-4">{employee.terminationReason}</td>
                    <td className="py-3 px-4">{employee.noticeDate}</td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        className="py-1 px-3 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={openMenu}
                        sx={{
                          bgcolor: "#b17f27",
                          color: "#FFFF",
                        }}
                      >
                        <b>Actions</b>
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={closeMenu}
                      >
                        <MenuItem
                          onClick={() => {
                            handleEditClick(employee);
                            closeMenu();
                          }}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleDeleteClick(employee.id);
                            closeMenu();
                          }}
                        >
                          Delete {employee.id}
                        </MenuItem>
                      </Menu>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>

      {/* Add Termination Modal */}
      <Dialog open={addTermination} onClose={() => setaddTermination(false)}>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Add Termination</h3>
          <form onSubmit={handleSubmit(handleAddTerminationSubmit)} className="space-y-4">
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
                />
              )}
            />

            <div className="flex justify-end space-x-2 mt-4">
              <Button
                variant="contained"
                sx={{ bgcolor: "#CD5C5C" }}
                onClick={() => setaddTermination(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: "#b17f27", color: "#FFFF" }}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Dialog>

      {/* Edit Termination Modal */}
      <Dialog open={editTermination} onClose={() => seteditTermination(false)}>
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
                />
              )}
            />

            <div className="flex justify-end space-x-2 mt-4">
              <Button
                variant="contained"
                sx={{ bgcolor: "#CD5C5C" }}
                onClick={() => seteditTermination(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{ bgcolor: "#b17f27", color: "#FFFF" }}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Dialog>

      {/* Delete Termination Modal */}
      <Dialog open={deleteTermination} onClose={() => setdeleteTermination(false)}>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this termination?</h3>
          <div className="flex justify-end space-x-2">
            <Button
              variant="contained"
              sx={{ bgcolor: "#CD5C5C" }}
              onClick={() => setdeleteTermination(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "#b17f27", color: "#FFFF" }}
              onClick={() => deleteTerminationOfEmployee(selectedTerminationId)}
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