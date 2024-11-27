import React, { useState } from "react";
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

const UltimateUserProfile = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentCard, setCurrentCard] = useState("");
  const [userData, setUserData] = useState({
    profile: {
      name: "John Doe",
      position: "Web Designer",
      employeeId: "FT-0001",
      joinDate: "1st Jan 2023",
      phone: "9876543210",
      email: "johndoe@example.com",
      birthday: "24th July",
      address: "1861 Bayonne Ave, Manchester Township, NJ, 08759",
      gender: "Male",
      reportsTo: "Jeffery Lalor",
    },
    personalInfo: {
      passportNo: "9876543210",
      passportExp: "24th July 2025",
      nationality: "Indian",
      religion: "Christian",
      maritalStatus: "Married",
      spouseEmployment: "No",
      children: 2,
    },
    bankInfo: {
      bankName: "ICICI Bank",
      accountNo: "159843014641",
      ifsc: "IC24604",
      panNo: "TC000Y56",
    },
    emergencyContact: {
      primary: { name: "John Doe", relationship: "Father", phone: "9876543210" },
      secondary: { name: "Karen Wills", relationship: "Brother", phone: "9876543210" },
    },
    familyInfo: [{ name: "Leo", relationship: "Brother", dob: "Feb 16, 2019", phone: "9876543210" }],
    education: [
      { degree: "BSc Computer Science", institution: "International College of Arts and Science (UG)", years: "2000-2003" },
      { degree: "MSc Computer Science", institution: "International College of Arts and Science (PG)", years: "2004-2006" },
    ],
    experience: [
      { title: "Web Designer", company: "Zen Corporation", duration: "Jan 2015 - Present (6 years)" },
      { title: "Web Designer", company: "Ron-tech", duration: "Jan 2013 - Dec 2014 (2 years)" },
    ],
  });

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

  return (
    <Box sx={{ p: 4, maxWidth: 1600, mx: "auto", backgroundColor: "#000000" }}>
      {/* Profile Header */}
      <Paper sx={{ display: "flex", p: 4, borderRadius: 3, boxShadow: 10, mb: 4, background: "linear-gradient(135deg, #000000, #ffd700)" }}>
        <Avatar alt="User" src={image} sx={{ width: 120, height: 120, border: 5, borderColor: "white", mr: 3 }} />
        <Box>
          <Typography variant="h3" fontWeight="bold" sx={{ color: "white", fontFamily: "Arial, sans-serif" }}>
            {userData.profile.name}
          </Typography>
          <Typography variant="h6" sx={{ color: "white", opacity: 0.8, fontFamily: "Arial, sans-serif" }}>
            {userData.profile.position}
          </Typography>
          <Typography variant="body1" sx={{ color: "white", opacity: 0.7 }}>
            Employee ID: {userData.profile.employeeId}
          </Typography>
          <Typography variant="body2" sx={{ color: "white", opacity: 0.7 }}>
            Join Date: {userData.profile.joinDate}
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
                <Tooltip title="Edit" arrow>
                  <IconButton onClick={() => handleEditClick("personalInfo")} color="primary">
                    <EditIcon sx={{ color: "#ffd700" }} />
                  </IconButton>
                </Tooltip>
              </motion.div>
            </Box>
            <Divider sx={{ my: 2, backgroundColor: "#ffd700" }} />
            <Box>
              <Typography variant="body2" sx={{ color: "white" }}>Passport No: {userData.personalInfo.passportNo}</Typography>
              <Typography variant="body2" sx={{ color: "white" }}>Passport Expiry: {userData.personalInfo.passportExp}</Typography>
              <Typography variant="body2" sx={{ color: "white" }}>Nationality: {userData.personalInfo.nationality}</Typography>
              <Typography variant="body2" sx={{ color: "white" }}>Religion: {userData.personalInfo.religion}</Typography>
              <Typography variant="body2" sx={{ color: "white" }}>Marital Status: {userData.personalInfo.maritalStatus}</Typography>
              <Typography variant="body2" sx={{ color: "white" }}>Spouse Employment: {userData.personalInfo.spouseEmployment}</Typography>
              <Typography variant="body2" sx={{ color: "white" }}>Children: {userData.personalInfo.children}</Typography>
            </Box>
          </Card>
        </Grid>

        {/* Bank Information */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 10, borderRadius: 3, height: "100%", backgroundColor: "#1e1e1e", transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.05)", boxShadow: 24 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: "#ffd700" }}>Bank Information</Typography>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Tooltip title="Edit" arrow>
                  <IconButton onClick={() => handleEditClick("bankInfo")} color="primary">
                    <EditIcon sx={{ color: "#ffd700" }} />
                  </IconButton>
                </Tooltip>
              </motion.div>
            </Box>
            <Divider sx={{ my: 2, backgroundColor: "#ffd700" }} />
            <Box>
              <Typography variant="body2" sx={{ color: "white" }}>Bank Name: {userData.bankInfo.bankName}</Typography>
              <Typography variant="body2" sx={{ color: "white" }}>Account No: {userData.bankInfo.accountNo}</Typography>
              <Typography variant="body2" sx={{ color: "white" }}>IFSC: {userData.bankInfo.ifsc}</Typography>
              <Typography variant="body2" sx={{ color: "white" }}>PAN No: {userData.bankInfo.panNo}</Typography>
            </Box>
          </Card>
        </Grid>

        {/* Education Information */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 10, borderRadius: 3, height: "100%", backgroundColor: "#1e1e1e", transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.05)", boxShadow: 24 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: "#ffd700" }}>Education</Typography>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Tooltip title="Edit" arrow>
                  <IconButton onClick={() => handleEditClick("education")} color="primary">
                    <EditIcon sx={{ color: "#ffd700" }} />
                  </IconButton>
                </Tooltip>
              </motion.div>
            </Box>
            <Divider sx={{ my: 2, backgroundColor: "#ffd700" }} />
            <Box>
              {userData.education.map((edu, index) => (
                <Box key={index}>
                  <Typography variant="body2" sx={{ color: "white" }}>Degree: {edu.degree}</Typography>
                  <Typography variant="body2" sx={{ color: "white" }}>Institution: {edu.institution}</Typography>
                  <Typography variant="body2" sx={{ color: "white" }}>Years: {edu.years}</Typography>
                  <Divider sx={{ my: 2, backgroundColor: "#ffd700" }} />
                </Box>
              ))}
            </Box>
          </Card>
        </Grid>

        {/* Experience Information */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, boxShadow: 10, borderRadius: 3, height: "100%", backgroundColor: "#1e1e1e", transition: "transform 0.3s ease", "&:hover": { transform: "scale(1.05)", boxShadow: 24 } }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" fontWeight="bold" sx={{ color: "#ffd700" }}>Experience</Typography>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Tooltip title="Edit" arrow>
                  <IconButton onClick={() => handleEditClick("experience")} color="primary">
                    <EditIcon sx={{ color: "#ffd700" }} />
                  </IconButton>
                </Tooltip>
              </motion.div>
            </Box>
            <Divider sx={{ my: 2, backgroundColor: "#ffd700" }} />
            <Box>
              {userData.experience.map((exp, index) => (
                <Box key={index}>
                  <Typography variant="body2" sx={{ color: "white" }}>Title: {exp.title}</Typography>
                  <Typography variant="body2" sx={{ color: "white" }}>Company: {exp.company}</Typography>
                  <Typography variant="body2" sx={{ color: "white" }}>Duration: {exp.duration}</Typography>
                  <Divider sx={{ my: 2, backgroundColor: "#ffd700" }} />
                </Box>
              ))}
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
  );
};

export default UltimateUserProfile;
