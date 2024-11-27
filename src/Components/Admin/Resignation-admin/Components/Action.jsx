import React, { useState } from "react";
import { Menu, MenuItem, Dialog, TextField, Button } from "@mui/material";
import { MdCloudUpload } from "react-icons/md";

function Action() {
  let [acceptResignation, setacceptResignation] = useState(false);
  let [rejectResignation, setrejectResignation] = useState(false);

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
                  setacceptResignation(true);
                  closeMenu();
                }}
              >
                Accepted
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setrejectResignation(true);
                  closeMenu();
                }}
              >
                Rejected
              </MenuItem>
            </Menu>
          </td>
        </tbody>
      </table>

      {/* Edit Termination Modal */}
      <Dialog open={acceptResignation} onClose={() => setacceptResignation(false)}>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Resignation</h3>
          <p className="text-gray-700 mb-4">
            Are you sure you want to Accept this Resignation?
          </p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="contained"
              sx={{
                bgcolor: "#CD5C5C",
              }}
              onClick={() => setacceptResignation(false)}
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
              <b>Accept</b>
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Delete Termination Modal */}
      <Dialog open={rejectResignation} onClose={() => setrejectResignation(false)}>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Reject</h3>
          <p className="text-gray-700 mb-4">
            Are you sure you want to Reject this Resignation?
          </p>
          <div className="flex justify-end space-x-2">
            <Button
              variant="contained"
              sx={{
                bgcolor: "#CD5C5C",
              }}
              onClick={() => setrejectResignation(false)}
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
              <b>Reject</b>
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default Action;
