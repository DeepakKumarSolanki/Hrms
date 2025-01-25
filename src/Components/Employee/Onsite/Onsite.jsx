import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useAuth } from "../../../Components/Context/AuthContext";

function Onsite() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      empName: "",
      employeeId: "",
      clientName: "",
      projectName: "",
      empContactNo: "",
      dateOfSite: "",
      location: "",
    },
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [thankYouMessage, setThankYouMessage] = useState(false);

  const { authState } = useAuth();
  const EmployeeName = authState.userDetails.userName;
  const EmployeeId = authState.userDetails.employeeId;
  const mobile = authState.userDetails.phoneNumber;

  // Populate default values for read-only fields
  useEffect(() => {
    setValue("empName", EmployeeName);
    setValue("employeeId", EmployeeId);
    setValue("empContactNo", mobile);
  }, [EmployeeName, EmployeeId, mobile, setValue]);

  const sendOnsiteForm = async (data) => {
    console.log("Form Data:", data);
    try {
      const response = await axios.post(
        "http://server.ovf.bgg.mybluehostin.me:8080/onsiteEmployee",
        data
      );
      console.log("Server Response:", response.data);

      // Reset the form and repopulate read-only fields
      reset();
      setValue("empName", EmployeeName);
      setValue("employeeId", EmployeeId);
      setValue("empContactNo", mobile);

      setSnackbarMessage("Form submitted successfully!");
      setOpenSnackbar(true);

      setThankYouMessage(true);

      setTimeout(() => {
        setThankYouMessage(false);
      }, 1000);
    } catch (error) {
      console.error("Error submitting the form:", error);
      setSnackbarMessage("Error submitting the form!");
      setOpenSnackbar(true);
    }
  };

  const WhatsappRedirect = () => {
    window.location.href = "https://wa.me/916299770149?text=";
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-2xl p-8 sm:p-10 w-full sm:max-w-lg">
        <h3 className="text-3xl font-semibold text-gray-800 text-center mb-6">Onsite Form</h3>

        {thankYouMessage && (
          <div className="text-center mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
            Thank you for submitting the form!
          </div>
        )}

        <form onSubmit={handleSubmit(sendOnsiteForm)} className="space-y-6">
          <TextField
            label="Full Name"
            fullWidth
            variant="outlined"
            InputProps={{ readOnly: true }}
            {...register("empName")}
            error={!!errors.empName}
            helperText={errors.empName?.message}
          />

          <TextField
            label="Employee Id"
            fullWidth
            variant="outlined"
            InputProps={{ readOnly: true }}
            {...register("employeeId")}
            error={!!errors.employeeId}
            helperText={errors.employeeId?.message}
          /> <TextField
            label=" Contact Number"
            fullWidth
            variant="outlined"
            type="tel"
            InputProps={{ readOnly: true }}
            {...register("empContactNo")}
            error={!!errors.empContactNo}
            helperText={errors.empContactNo?.message}
          />



          <TextField
            label="Client Name"
            fullWidth
            variant="outlined"
            {...register("clientName", {
              required: "Client name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters" },
            })}
            error={!!errors.clientName}
            helperText={errors.clientName?.message}
          />

          <TextField
            label="Project Name"
            fullWidth
            variant="outlined"
            {...register("projectName", {
              required: "Project name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters" },
            })}
            error={!!errors.projectName}
            helperText={errors.projectName?.message}
          />

         

          <TextField
            label="Date of OnSite"
            fullWidth
            type="date"
            variant="outlined"
            {...register("dateOfSite", {
              required: "Date of Site is required",
            })}
            error={!!errors.dateOfSite}
            helperText={errors.dateOfSite?.message}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              min: new Date().toISOString().split("T")[0],
            }}
          />

          <TextField
            label="Onsite Location"
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            {...register("location", {
              required: "Location is required",
            })}
            error={!!errors.location}
            helperText={errors.location?.message}
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="button"
              variant="contained"
              sx={{ bgcolor: "#CD5C5C" }}
              onClick={WhatsappRedirect}
              className="w-full sm:w-auto"
            >
              <b>Share your Live location</b>
            </Button>

            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "#b17f27", color: "#fff" }}
              className="w-full sm:w-auto"
            >
              <b>Submit</b>
            </Button>
          </div>
        </form>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarMessage.includes("Error") ? "error" : "success"}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Onsite;
