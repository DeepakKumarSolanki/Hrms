import React from 'react';
import CalenderBackend from "./BackendDepartment/CalenderBackend"
import CalenderSales from "./Sales/Calender"
import { useAuth } from "./Components/Context/AuthContext"; // AuthContext

function MainCalendar() {
    const { authState } = useAuth();
    const department =authState.userDetails.department;
  return (
    <div>
      {department==="TECH" ? (<CalenderBackend/>) : (<CalenderSales/>)}
    </div>
  );
}

export default MainCalendar;
