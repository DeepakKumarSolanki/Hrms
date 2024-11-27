import { useState } from "react";
import { Button, TextField, Dialog, MenuItem } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

function Assest() {
  let [addAsset, setaddAsset] = useState(false);

  const [status, setStatus] = useState(""); 

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [formData, setFormData] = useState({
    assetName: "",
    assetId: "",
    employeeName: "",
    employeeId: "",
    grantedDate: "",
    validUpto: "",
    assetValue: "",
    description: "",
    status: "Pending",
  });

  const handleChange = (event) => {
    let { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddAssetSubmit = async (e) => {
    console.log("hii");
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/terminationDetail", formData);
      setaddAsset(false); // Close the modal after submission
      AssetData(); // Refresh the data
    } catch (error) {
      console.error("Error adding termination:", error);
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    handleAddAssetSubmit(data);
    reset(); // Reset form after successful submission
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Assets</h2>
        <Button
          variant="contained"
          color="error"
          sx={{
                  bgcolor: "#b17f27",
                          color: "#FFFF",
                        }}
          onClick={() => {
            setaddAsset(true);
          }}
        >
          <b>Add Asset</b>
        </Button>
      </div>

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <a href="#" className="hover:underline">
          Dashboard
        </a>
        /
        <span className="font-semibold text-gray-800">
          <a href="#" className="hover:underline">
            Assets
          </a>
        </span>
      </div>


 {/* Search Criteria */}
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <TextField
            fullWidth
            variant="outlined"
            label="Employee Name"
            size="small"
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Status"
            size="small"
            select
            value={status} // Bind the state to the value prop
            onChange={handleChange} // Handle the change event
          >
            {/* Use MenuItem instead of option */}
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Pending"> Pending</MenuItem>
            <MenuItem value="Granted"> Granted</MenuItem>
            <MenuItem value="Returned"> Returned</MenuItem>
          </TextField>
          <TextField
            fullWidth
            variant="outlined"
            label="From Date"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="To Date"
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          <Button
            variant="contained"
            sx={{
                          bgcolor: "#b17f27",
                          color: "#FFFF",
                        }}
          >
            <b>Search</b>
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-200 text-gray-700 text-left">
              <th className="p-2 sm:p-3">Asset Employee Name</th>
              <th className="p-2 sm:p-3">Asset Name</th>
              <th className="p-2 sm:p-3">Asset Id</th>
              <th className="p-2 sm:p-3">Asset Employee Id</th>
              <th className="p-2 sm:p-3">Granted date</th>
              <th className="p-2 sm:p-3">validUpto</th>
              <th className="p-2 sm:p-3">Value</th>
              <th className="p-2 sm:p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-2 sm:p-3">Catherine Manseau</td>
              <td className="p-2 sm:p-3 font-bold">Canon Portable Printer</td>
              <td className="p-2 sm:p-3">#AST-0012</td>
              <td className="p-2 sm:p-3">kings#2091</td>
              <td className="p-2 sm:p-3">14 Jan 2020</td>
              <td className="p-2 sm:p-3">12 months</td>
              <td className="p-2 sm:p-3">$2500</td>
              <td className="p-2 sm:p-3">
                <span className="bg-yellow-100 text-yellow-800 py-1 px-2 rounded-full text-xs sm:text-sm">
                  Pending
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>




      {/* Add Asset Dialog */}
      <Dialog
        open={addAsset}
        onClose={() => {
          setaddAsset(false);
        }}
        fullWidth
        maxWidth="sm"
      >
        <div className="p-6">
          <h3 className="text-xl sm:text-2xl font-semibold text-center mb-6">
            Add Asset
          </h3>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="assetName"
                control={control}
                rules={{
                  required: "Asset Name is required",
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Asset Name"
                    variant="outlined"
                    required
                    error={!!errors.assetName}
                    helperText={errors.assetName ? errors.assetName.message : ""}
                    {...field}
                  />
                )}
              />
              <Controller
                name="assetId"
                control={control}
                rules={{
                  required: "Asset Id is required",
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Asset Id"
                    variant="outlined"
                    required
                    error={!!errors.assetId}
                    helperText={errors.assetId ? errors.assetId.message : ""}
                    {...field}
                  />
                )}
              />
              <Controller
                name="employeeName"
                control={control}
                rules={{
                  required: "Employee Name is required",
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Asset Employee Name"
                    variant="outlined"
                    required
                    error={!!errors.employeeName}
                    helperText={errors.employeeName ? errors.employeeName.message : ""}
                    {...field}
                  />
                )}
              />
              <Controller
                name="employeeId"
                control={control}
                rules={{
                  required: "Employee Id is required",
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Asset Employee Id"
                    variant="outlined"
                    required
                    error={!!errors.employeeId}
                    helperText={errors.employeeId ? errors.employeeId.message : ""}
                    {...field}
                  />
                )}
              />
              <Controller
                name="grantedDate"
                control={control}
                rules={{
                  required: "Granted Date is required",
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Granted Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    required
                    error={!!errors.grantedDate}
                    helperText={errors.grantedDate ? errors.grantedDate.message : ""}
                    {...field}
                  />
                )}
              />
              <Controller
                name="validUpto"
                control={control}
                rules={{
                  required: "Valid Upto Date is required",
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Valid Upto"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    required
                    error={!!errors.validUpto}
                    helperText={errors.validUpto ? errors.validUpto.message : ""}
                    {...field}
                  />
                )}
              />
              <Controller
                name="assetValue"
                control={control}
                rules={{
                  required: "Asset Value is required",
                  valueAsNumber: true,
                }}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Asset Value"
                    type="number"
                    variant="outlined"
                    required
                    error={!!errors.assetValue}
                    helperText={errors.assetValue ? errors.assetValue.message : ""}
                    {...field}
                  />
                )}
              />
            </div>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Description"
                  variant="outlined"
                  {...field}
                />
              )}
            />
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  select
                  label="Status"
                  variant="outlined"
                  {...field}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Granted">Granted</MenuItem>
                  <MenuItem value="Returned">Returned</MenuItem>
                </TextField>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#CD5C5C",
                }}
                onClick={() => setaddAsset(false)}
              >
                <b>Cancel</b>
              </Button>
              <Button
                variant="contained"
                sx={{
                          bgcolor: "#b17f27",
                          color: "#FFFF",
                        }}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
}

export default Assest;
