import React from "react";
import Termination from "./Components/Admin/Termination/Termination"
import Resignation from "./Components/Employee/Resignation/Resignation";
import Policies from "./Components/Admin/Policies/Policies";
import Onsite from "./Components/Employee/Onsite/Onsite"
import Assest from './Components/Employee/Assets-emp/Asset-emp';

import AssetAdmin from "./Components/Admin/Assest-admin/Asset-admin"
import ResignationAdminPanel from './Components/Admin/Resignation-admin/ResignationAdminPanel';

import KnowledgeBase from "./Components/Employee/KnowledgeBase/KnowledgeBase"
import KnowledgeBaseAdmin from "./Components/Admin/KnowledgeBase-admin/KnowledgeBaseAdmin"
import CalendarAdmin from './Components/Admin/Calender/Calender';
import Calendar2025 from './Components/Employee/Calender/Sales/Calender';
import EmployeeProfile from "./Components/Employee/Profile-emp/Profile"
import TerminationPage from "./Components/Admin/Termination/Termination";
import OnsiteAdminPanel from "./Components/Admin/OnsiteAdminPanel/Onsite"

import CalendarSales from "./Components/Employee/Calender/Sales/Calender"
import CalendarBackend from "./Components/Employee/Calender/BackendDepartment/CalenderBackend"



function App() {
  return (
    <div>


  <AssetAdmin /> 
 {/*
 <Termination/> 
  <ResignationAdminPanel/> 
   <Resignation/>   
  <Assest/>  
 <EmployeeProfile/>
       <OnsiteAdminPanel/>
     <Onsite/>  
    <CalendarAdmin/> 
     <KnowledgeBaseAdmin/>    
     <KnowledgeBase/>


  
 
  


      

    
 
 


     




   




    

      
     
    
   
   


<CalendarSales/>
<CalendarBackend/> 


 
 
 
 
 
 
 
 
 
  */}
       <Policies/>






    </div>
  );

  
}

export default App;
