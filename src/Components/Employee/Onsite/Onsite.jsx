import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, TextField, Snackbar, Alert } from "@mui/material";
import axios from "axios";

function Onsite() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      empName: "",
      employeeId: "",
      clientName: "",
      projectName: "",
      empContactNo: "",
      location: "",
    },
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const messageRef = useRef(null);

  const sendOnsiteForm = async (data) => {
    console.log(data); // Data from the form submission
    messageRef.current.innerText = "Submitting...";
    try {
      const response = await axios.post("http://server.ovf.bgg.mybluehostin.me:8080/onsiteEmployee", data);
      console.log("Server Response:", response.data);

      // Reset the form fields on successful submission
      reset();
      setSnackbarMessage("Form submitted successfully!");
      setOpenSnackbar(true);
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
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-white shadow-lg rounded-2xl p-8 sm:p-10 w-full sm:max-w-lg">
        <h3 className="text-3xl font-semibold text-gray-800 text-center mb-6">Onsite Form</h3>
        
        <form onSubmit={handleSubmit(sendOnsiteForm)} className="space-y-6">
          <div>
            <TextField
              label="Full Name"
              fullWidth
              variant="outlined"
              {...register("empName", {
                required: "Name is required",
                minLength: { value: 3, message: "Name must be at least 3 characters" },
              })}
              error={!!errors.empName}
              helperText={errors.empName?.message}
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
          </div>

          <div>
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
          </div>

          <div>
            <TextField
              label="Contact Number"
              fullWidth
              variant="outlined"
              type="tel"
              {...register("empContactNo", {
                required: "Mobile number is required",
                pattern: { value: /^[6-9][0-9]{9}$/, message: "Invalid phone number" },
              })}
              error={!!errors.empContactNo}
              helperText={errors.empContactNo?.message}
            />
          </div>

          <div>
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
          </div>

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
        <Alert onClose={handleCloseSnackbar} severity={snackbarMessage.includes("Error") ? "error" : "success"}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Onsite;
