import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, Snackbar } from "@mui/material";
import axios from "axios";
import { Alert } from "@mui/material";

function Resignation() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const sendResignationForm = async (data) => {
    try {
      await axios.post("http://server.ovf.bgg.mybluehostin.me:8080/resignationDetail", data, {
        headers: { "Content-Type": "application/json" },
      });
      setSnackbarMessage("Form submitted successfully!");
      setOpenSnackbar(true);
      reset(); // Clear the form
    } catch (error) {
      setSnackbarMessage("Error submitting the form.");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen mt-32">
      <div className="bg-white shadow-lg rounded-2xl p-8 sm:p-10 w-full sm:max-w-lg">
        <h3 className="text-3xl font-semibold text-gray-800 text-center mb-6">Resignation Form</h3>

        <form onSubmit={handleSubmit(sendResignationForm)} className="space-y-6">
          <div>
            <TextField
              label="Full Name"
              fullWidth
              variant="outlined"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Name must be at least 3 characters" },
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
              className="w-full"
            />
          </div>

          <div>
            <TextField
              label="Employee Email Id"
              fullWidth
              variant="outlined"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </div>

          <div>
            <TextField
              label="Contact Number"
              fullWidth
              variant="outlined"
              {...register("contactNumber", {
                required: "Mobile number is required",
                pattern: { value: /^[6-9][0-9]{9}$/, message: "Invalid phone number" },
              })}
              error={!!errors.contactNumber}
              helperText={errors.contactNumber?.message}
            />
          </div>

          <div>
            <TextField
              label="Employee Id"
              fullWidth
              variant="outlined"
              {...register("employeeId", {
                required: "Employee Id is required",
              })}
              error={!!errors.employeeId}
              helperText={errors.employeeId?.message}
            />
          </div>

          <div>
            <TextField
              label="Date of Resignation"
              fullWidth
              type="date"
              variant="outlined"
              {...register("dateOfResignation", {
                required: "Date of Resignation is required",
              })}
              error={!!errors.dateOfResignation}
              helperText={errors.dateOfResignation?.message}
              InputLabelProps={{ shrink: true }}
              inputProps={{
        min: new Date().toISOString().split("T")[0], // Disable past dates
      }}
            />
          </div>

          <div>
            <TextField
              label="Reason for Resignation"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              {...register("resignationReason", {
                required: "Reason is required",
              })}
              error={!!errors.resignationReason}
              helperText={errors.resignationReason?.message}
            />
          </div>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            className="py-3 text-lg font-medium rounded-lg transition-all"

            
              sx={{ bgcolor: "#b17f27", color: "#fff" }}
          >
            Submit
          </Button>
        </form>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes("Error") ? "error" : "success"}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Resignation;
