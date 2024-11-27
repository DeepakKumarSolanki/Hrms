import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

function Onsite() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const messageRef = useRef(null);
 

  
  const [formData, setFormData] = useState({
    empName: "",
    employeeId: "",
    clientName: "",
    projectName: "",
    empContactNo: "",
    location: "",
  });
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(formData);
  
  const sendOnsiteForm =async (data) => {
    console.log(data); // Handle the form submission
    messageRef.current.innerText = "Form submitted successfully!";
    
    try {
      await axios.post("http://localhost:8080/terminationDetail", formData);
      reset();
    } catch (error) {
      console.error("Error adding Resignation:", error);
    }
    

     // Reset the form fields using react-hook-form's reset method
     reset();
    
     // Reset the formData state
     setFormData({
       empName: "",
       employeeId: "",
       clientName: "",
       projectName: "",
       empContactNo: "",
       location: "",
     });
 
     // Optionally clear the success message after a few seconds (if needed)
     setTimeout(() => {
       messageRef.current.innerText = "";
     }, 3000);
   };
  
   const WhatsappRedirect = () => {
    console.log("Hi");
    window.location.href = "https://wa.me/917225952005?text=";
  };

  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md">
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Onsite Form
        </h3>
        <h5
          ref={messageRef}
          className="text-center text-green-500 text-sm font-medium mb-4"
        ></h5>

        <form
          onSubmit={handleSubmit(sendOnsiteForm)}
          className="space-y-4"
        >
          {/* Full Name Field */}
          <div>
            <input
              type="text"
              placeholder="Enter your full name"
              {...register("empName", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="empName"
              value={formData.empName}
              onChange={handleChange}
            />
            {errors.empName && (
              <p className="text-red-500 text-sm mt-1">{errors.empName.message}</p>
            )}
          </div>

          {/* Employee No Field */}
          <div>
            <input
              type="text"
              placeholder="Enter your Employee Id"
              {...register("employeeId", {
                required: "Employee Id is required",
              })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
            />
            {errors.employeeId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.employeeId.message}
              </p>
            )}
          </div>

          {/* Client Name Field */}
          <div>
            <input
              type="text"
              placeholder="Enter your Client name"
              {...register("clientName", {
                required: "Client name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
            />
            {errors.clientName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.clientName.message}
              </p>
            )}
          </div>

          {/* Project Name Field */}
          <div>
            <input
              type="text"
              placeholder="Enter your Project name"
              {...register("projectName", {
                required: "Project name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
            />
            {errors.projectName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.projectName.message}
              </p>
            )}
          </div>

          {/* Contact Number Field */}
          <div>
            <input
              type="tel"
              placeholder="Enter your contact number"
              {...register("empContactNo", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[6-9][0-9]{9}$/,
                  message: "Invalid phone number",
                },
              })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="empContactNo"
              value={formData.empContactNo}
              onChange={handleChange}
            />
            {errors.empContactNo && (
              <p className="text-red-500 text-sm mt-1">
                {errors.empContactNo.message}
              </p>
            )}
          </div>

          {/* Onsite Location Field */}
          <div>
            <textarea
              rows="3"
              placeholder="Enter your Onsite location"
              {...register("location", {
                required: "Location is required",
              })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="location"
              value={formData.location}
              onChange={handleChange}
            ></textarea>
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">
                {errors.location.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="button"
              variant="contained"
              sx={{
                bgcolor: "#CD5C5C",
              }}
              onClick={WhatsappRedirect}
              className="w-full sm:w-auto"
            >
              <b> Share your Live location</b>
            </Button>

            <Button
              // type="submit"
              variant="contained"
              sx={{
                bgcolor: "#b17f27",
                color: "#ffff",
              }}
              onClick={sendOnsiteForm}
            >
              <b>Submit</b>
            </Button>
          </div>
        </form>
      </div>
    </div>
  </>
  );
}

export default Onsite; 