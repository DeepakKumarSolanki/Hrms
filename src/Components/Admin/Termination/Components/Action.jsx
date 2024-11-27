import React,{useState} from 'react'
import { Menu, MenuItem, Dialog, TextField, Button } from "@mui/material";
import axios from "axios"



function Action() {
     let [editTermination, seteditTermination] = useState(false);
     let [deleteTermination, setdeleteTermination] = useState(false);

     const [anchorEl, setAnchorEl] = useState(null);
     const openMenu = (event) => setAnchorEl(event.currentTarget);
     const closeMenu = () => setAnchorEl(null);

     const [status, setStatus] = useState("");

     const handleChange = (event) => {
       setStatus(event.target.value);
     };


     let [data, setData] = useState([]);

     let deleteTerminationOfEmployee=async()=>{
       try {

    let {data} = await axios.get("http://localhost:3001/terminations");
    console.log(data)
    setData(data);
    
  } catch (error) {
    console.log(error);
    
  }

}

     
  return (
    <div>
      <table>
        <tbody>
          <td className="py-3 px-4 text-right">
            <Button
              className="py-1 px-3 bg-gray-200 rounded hover:bg-gray-300"
              onClick={openMenu}
              sx={{
                bgcolor: "#b17f27",
                color: "#000000",
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
                  seteditTermination(true);
                  closeMenu();
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setdeleteTermination(true);
                  closeMenu();
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          </td>
        </tbody>
      </table>

      {/* Edit Termination Modal */}
      <Dialog
        open={editTermination}
        onClose={() => seteditTermination(false)}
        fullWidth
        maxWidth="sm"
      >
        <div className="p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-semibold mb-4">
            Edit Termination
          </h3>
          <form className="space-y-4">
            <TextField
              fullWidth
              type="text"
              label="Name of Employee"
              variant="outlined"
            ></TextField>
            <TextField
              fullWidth
              type="text"
              label="Employee Id"
              variant="outlined"
            ></TextField>
            <TextField
              fullWidth
              label="Department"
              select
              variant="outlined"
              value={status}
              onChange={handleChange}
            >
              <MenuItem value="all departments">All Departments</MenuItem>
              <MenuItem value="web development">Web Development</MenuItem>
              <MenuItem value="marketing">Marketing</MenuItem>
              <MenuItem value="it management">IT Management</MenuItem>
            </TextField>
            <TextField
              fullWidth
              type="text"
              multiline
              rows={3}
              label="Reason"
              variant="outlined"
            ></TextField>

            <div className="flex justify-end space-x-2">
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#CD5C5C",
                }}
                onClick={() => seteditTermination(false)}
              >
                <b>Cancel</b>
              </Button>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#b17f27",
                  color: "#000000",
                }}
              >
                <b>Submit</b>
              </Button>
            </div>
          </form>
        </div>
      </Dialog>

      {/* Delete Termination Modal */}
      <Dialog
        open={deleteTermination}
        onClose={() => setdeleteTermination(false)}
      >
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Delete Termination</h3>
          <p className="text-gray-700 mb-4">
            Are you sure you want to delete this Termination?
          </p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="contained"
              sx={{
                bgcolor: "#CD5C5C",
              }}
              onClick={() => setdeleteTermination(false)}
            >
              <b>Cancel</b>
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: "#b17f27",
                color: "#000000",
              }}

              onClick={deleteTerminationOfEmployee}
            >
              <b>Delete</b>
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Action
