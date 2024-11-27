import React,{useState} from 'react'
import { Menu, MenuItem, Dialog, TextField, Button } from "@mui/material";
import { MdCloudUpload } from "react-icons/md";


function Action() {
     let [editPolicy, seteditPolicy] = useState(false);
     let [deletePolicy, setdeletePolicy] = useState(false);
     
     const [anchorEl, setAnchorEl] = useState(null);
     const openMenu = (event) => setAnchorEl(event.currentTarget);
     const closeMenu = () => setAnchorEl(null);
     
     // Upload file
     
     const [files, setFiles] = useState([]);

const handleFileChange = (event) => {
  const selectedFiles = Array.from(event.target.files); // Convert FileList to Array
  setFiles(selectedFiles);
};


const [status, setStatus] = useState("");

const handleChange = (event) => {
  setStatus(event.target.value);
};




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
                  seteditPolicy(true);
                  closeMenu();
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setdeletePolicy(true);
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
        open={editPolicy}
        onClose={() => seteditPolicy(false)}
        fullWidth
        maxWidth="sm"
      >
        <div className="p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-semibold mb-4">Edit Policy</h3>
          <form className="space-y-4">
            <TextField
              fullWidth
              select
              label="Edit Policy Name"
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
              label="Changes done in Policy"
              variant="outlined"
            ></TextField>

            <Button
              component="label"
              variant="contained"
              startIcon={<MdCloudUpload />}
            >
              Upload files
              <input type="file" onChange={handleFileChange} multiple hidden />
            </Button>

            {/* Display selected files */}
            {files.length > 0 && (
              <ul style={{ marginTop: "1rem" }}>
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}

            <div className="flex justify-end space-x-2">
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#CD5C5C",
                }}
                onClick={() => seteditPolicy(false)}
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
      <Dialog open={deletePolicy} onClose={() => setdeletePolicy(false)}>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Delete Policy</h3>
          <p className="text-gray-700 mb-4">
            Are you sure you want to delete this Policy?
          </p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="contained"
              sx={{
                bgcolor: "#CD5C5C",
              }}
              onClick={() => setdeletePolicy(false)}
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
              <b>Delete</b>
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Action
