import React, { useState,useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Avatar,
  Grid,
  Paper,
  Typography,
  Divider,
  Box,
  Card,
  CardContent,
  Tooltip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { motion } from "framer-motion";
import image from "./images/images.png"; // Assume image is correctly imported
import axios from "axios"
import {useAuth} from "../../../Components/Context/AuthContext"

const UltimateUserProfile = () => {
  const { authState } = useAuth();

  

  const DEFAULT_EMPLOYEE_ID = authState.userDetails.employeeId;
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCard, setCurrentCard] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [userData, setUserData] = useState([]);

  const handleEditClick = (card) => {
    setCurrentCard(card);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentCard("");
  };

  const renderEditForm = () => {
    if (!currentCard) return null;

    const cardData = userData[currentCard];
    if (Array.isArray(cardData)) {
      return cardData.map((item, index) => (
        <div key={index} className="mb-4">
          {Object.entries(item).map(([key, value]) => (
            <TextField
              key={key}
              label={key}
              name={key}
              defaultValue={value}
              fullWidth
              margin="dense"
              onChange={(e) => handleFieldChange(currentCard, index, key, e.target.value)}
            />
          ))}
        </div>
      ));
    } else {
      return Object.entries(cardData).map(([key, value]) => (
        <TextField
          key={key}
          label={key}
          name={key}
          defaultValue={value}
          fullWidth
          margin="dense"
          onChange={(e) => handleFieldChange(currentCard, key, e.target.value)}
        />
      ));
    }
  };

  const handleFieldChange = (card, index, key, value) => {
    setUserData((prev) => {
      const updatedCardData = [...prev[card]];
      updatedCardData[index] = {
        ...updatedCardData[index],
        [key]: value,
      };
      return {
        ...prev,
        [card]: updatedCardData,
      };
    });
  };


  const fetchAllDetailOfEmployee = async () => {
    try {
      const response = await axios.get(
        "http://server.ovf.bgg.mybluehostin.me:8080/fetchAllEmployees"
      );
      const employees = response.data.data;
      console.log("employees data",employees)
      
      // Find the selectedEmployee with the default ID
      const selectedEmployee = employees.find((emp) => emp.employeeId === DEFAULT_EMPLOYEE_ID);
      console.log(selectedEmployee);
      setSelectedEmployee(selectedEmployee);
      setUserData([selectedEmployee]);

    } catch (error) {
      console.error("Error fetching selectedEmployee data:", error);
    }
  };

  useEffect(() => {
    fetchAllDetailOfEmployee();
  }, []);

  console.log(userData);

  return (
<div>
{userData.map((selectedEmployee)=>{
return(


    <Box sx={{ p: 4, maxWidth: 1600, mx: "auto", backgroundColor: "#000000" }} key={selectedEmployee.id}>
      {/* Profile Header */}
      <Paper
  sx={{
    display: "flex",
    flexDirection: { xs: "column", sm: "row" }, // Stack on small screens, row on larger screens
    alignItems: { xs: "center", sm: "flex-start" }, // Center items on small screens
    p: { xs: 2, sm: 4 }, // Adjust padding for different screen sizes
    borderRadius: 3,
    boxShadow: 10,
    mb: 4,
    background: "linear-gradient(135deg, #000000, #ffd700)",
  }}
>
  <Avatar
    alt="User"
    src={image}
    sx={{
      width: { xs: 80, sm: 120 }, // Adjust avatar size for small and large screens
      height: { xs: 80, sm: 120 },
      border: 5,
      borderColor: "white",
      mb: { xs: 2, sm: 0 }, // Add bottom margin for small screens
      mr: { xs: 0, sm: 3 }, // Add right margin for larger screens
    }}
  />
  <Box textAlign={{ xs: "center", sm: "left" }}>
    <Typography
      variant="h3"
      fontWeight="bold"
      sx={{
        fontSize: { xs: "1.5rem", sm: "2.5rem" }, // Adjust font size for different screens
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {selectedEmployee.name}
    </Typography>
    <Typography
      variant="h3"
      fontWeight="bold"
      sx={{
        fontSize: { xs: "1.3rem", sm: "2.2rem" }, // Adjust font size for username
        color: "white",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {selectedEmployee.userName}
    </Typography>
    <Typography
      variant="h6"
      sx={{
        fontSize: { xs: "1rem", sm: "1.25rem" }, // Adjust font size for role
        color: "white",
        opacity: 0.8,
        fontFamily: "Arial, sans-serif",
      }}
    >
      {selectedEmployee.role}
    </Typography>
    <Typography variant="body1" sx={{ color: "white", opacity: 0.7 }}>
      Employee ID: {selectedEmployee.employeeId}
    </Typography>
    <Typography variant="body1" sx={{ color: "white", opacity: 0.7 }}>
      Contact: {selectedEmployee.officialNumber}
    </Typography>
    <Typography variant="body1" sx={{ color: "white", opacity: 0.7 }}>
      Email: {selectedEmployee.officialEmail}
    </Typography>
    <Typography variant="body1" sx={{ color: "white", opacity: 0.7 }}>
      Department: {selectedEmployee.department}
    </Typography>
    <Typography variant="body2" sx={{ color: "white", opacity: 0.7 }}>
      Join Date: {selectedEmployee.joiningDate}
    </Typography>
  </Box>
</Paper>


      {/* Cards Section */}
      <Grid container spacing={4}>
        {/* Personal Information */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 10, borderRadius: 3, height: "100%", backgroundColor: "#1e1e1e", transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.05)", boxShadow: 24 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: "#ffd700" }}>Personal Information</Typography>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                {/* <Tooltip title="Edit" arrow>
                  <IconButton onClick={() => handleEditClick("personalInfo")} color="primary">
                    <EditIcon sx={{ color: "#ffd700" }} />
                  </IconButton>
                </Tooltip> */}
              </motion.div>
            </Box>
            <Divider sx={{ my: 2, backgroundColor: "#ffd700" }} />
            <Box>
              <Typography variant="body2" sx={{ color: "white" }}>Father-Name: {selectedEmployee.fatherName}</Typography>
              <Typography variant="body2" sx={{ color: "white" }}>Father No.: {selectedEmployee.fatherContactNumber}</Typography>
              <Typography variant="body2" sx={{ color: "white" }}>Mother-Name: {selectedEmployee.motherName}</Typography>
              <Typography variant="body2" sx={{ color: "white" }}>Mother No.: {selectedEmployee.motherNumber}</Typography>
              <Typography variant="body2" sx={{ color: "white" }}>Aadhar No: {selectedEmployee.aadharCardNumber}</Typography>
              <Typography variant="body2" sx={{ color: "white" }}>Pan-Card No.: {selectedEmployee.panCardNumber}</Typography>
              <Typography variant="body2" sx={{ color: "white" }}>Date-of-birth: {selectedEmployee.dob}</Typography>
              <Typography variant="body2" sx={{ color: "white" }}>Mobile: {selectedEmployee.phoneNumber}</Typography>
              <Typography variant="body2" sx={{ color: "white" }}>Email: {selectedEmployee.email}</Typography>
              <Typography variant="body2" sx={{ color: "white" }}>Gender: {selectedEmployee.gender}</Typography>
              <Typography variant="body2" sx={{ color: "white" }}>Blood-Group: {selectedEmployee.bloodGroup}</Typography>
              {/* <Typography variant="body2" sx={{ color: "white" }}>Emergency-Contact: {selectedEmployee.emergencyContact}</Typography> */}
              <Typography variant="body2" sx={{ color: "white" }}>Permanent-Address: {selectedEmployee.permanentAddress}</Typography>
              <Typography variant="body2" sx={{ color: "white" }}>Local-Address: {selectedEmployee.localAddress}</Typography>
            </Box>
          </Card>
        </Grid>

        {/* Bank Information */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 10, borderRadius: 3, height: "100%", backgroundColor: "#1e1e1e", transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.05)", boxShadow: 24 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: "#ffd700" }}>Bank Information</Typography>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                {/* <Tooltip title="Edit" arrow>
                  <IconButton onClick={() => handleEditClick("bankInfo")} color="primary">
                    <EditIcon sx={{ color: "#ffd700" }} />
                  </IconButton>
                </Tooltip> */}
              </motion.div>
            </Box>
            <Divider sx={{ my: 2, backgroundColor: "#ffd700" }} />
            <Box>
              <Typography variant="body2" sx={{ color: "white" }}>Bank Name: {selectedEmployee.bankName}</Typography>
              <Typography variant="body2" sx={{ color: "white" }}>Branch Name: {selectedEmployee.branchName}</Typography>
              <Typography variant="body2" sx={{ color: "white" }}>Account No: {selectedEmployee.accountNumber}</Typography>
              <Typography variant="body2" sx={{ color: "white" }}>IFSC: {selectedEmployee.ifscCode}</Typography>
              <Typography variant="body2" sx={{ color: "white" }}>PAN No: {selectedEmployee.panCardNumber}</Typography>
            </Box>
          </Card>
        </Grid>

        {/* Education Information */}
         
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 10, borderRadius: 3, height: "100%", backgroundColor: "#1e1e1e", transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.05)", boxShadow: 24 } }} key={selectedEmployee.id}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: "#ffd700" }}>Leaves Balance</Typography>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                {/* <Tooltip title="Edit" arrow>
                  <IconButton onClick={() => handleEditClick("education")} color="primary">
                    <EditIcon sx={{ color: "#ffd700" }} />
                  </IconButton>
                </Tooltip> */}
              </motion.div>
            </Box>
            <Divider sx={{ my: 2, backgroundColor: "#ffd700" }} />
              <Box >
                <Box key={selectedEmployee.id}>
                  <Typography variant="body2" sx={{ color: "white" }}>Casual-Leaves: {selectedEmployee.casualLeaveBalance}</Typography>
                  <Typography variant="body2" sx={{ color: "white" }}>Sick-Leaves: {selectedEmployee.sickLeaveBalance}</Typography>
                  <Typography variant="body2" sx={{ color: "white" }}>Earned-Leaves: {selectedEmployee.paidLeaveBalance}</Typography>
                  <Typography variant="body2" sx={{ color: "white" }}>Emergency Death-Leaves: {selectedEmployee.emergencyDeathLeave}</Typography>
                  {/* <Divider sx={{ my: 2, backgroundColor: "#ffd700" }} /> */}
                </Box>
            </Box>
          </Card>
        </Grid>
          

        {/* Experience Information */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 10, borderRadius: 3, height: "100%", backgroundColor: "#1e1e1e", transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.05)", boxShadow: 24 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: "#ffd700" }}>Enquiry</Typography>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                {/* <Tooltip title="Edit" arrow>
                  <IconButton onClick={() => handleEditClick("experience")} color="primary">
                    <EditIcon sx={{ color: "#ffd700" }} />
                  </IconButton>
                </Tooltip> */}
              </motion.div>
            </Box>
            <Divider sx={{ my: 2, backgroundColor: "#ffd700" }} />
            <Box>
             
                <Box key={selectedEmployee.id}>
                  {/* <Typography variant="body2" sx={{ color: "white" }}>Experience: {selectedEmployee.experience}</Typography> */}
                  <Typography variant="body2" sx={{ color: "white" }}>Emergency Contact-Name: {selectedEmployee.emergencyContactName}</Typography>
                  <Typography variant="body2" sx={{ color: "white" }}>emergency Contact-relation: {selectedEmployee.emergencyContactRelation}</Typography>
                  {/* <Divider sx={{ my: 2, backgroundColor: "#ffd700" }} /> */}
                </Box>
             
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog for Editing */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Edit {currentCard}</DialogTitle>
        <DialogContent>
          {renderEditForm()}
        </DialogContent>
            
        <DialogActions>
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
                color: "#ffff",
              }}
              onClick={handleDialogClose}
            >
              <b>Edit</b>
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </Box>
)
  })}
    </div>
  
);
};

export default UltimateUserProfile;
