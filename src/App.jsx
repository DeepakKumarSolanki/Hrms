import React from "react";
import Termination from "./Components/Admin/Termination/Termination"
import Resignation from "./Components/Employee/Resignation/Resignation";
// import Policies from "./Components";
import Onsite from "./Components/Employee/Onsite/Onsite"
import Assest from './Components/Employee/Assets-emp/Asset-emp';

import AssetAdmin from "./Components/Admin/Assest-admin/Asset-admin"
import ResignationAdminPanel from './Components/Admin/Resignation-admin/ResignationAdminPanel';

import KnowledgeBase from "./Components/Employee/KnowledgeBase/KnowledgeBase"
import KnowledgeBaseAdmin from "./Components/Admin/KnowledgeBase-admin/KnowledgeBaseAdmin"
import Calendar from './Components/Admin/Calender/Calender';
import Calendar2025 from './Components/Employee/Calender/Calender';
import Profile from "./Components/Employee/Profile-emp/Profile"
import TerminationPage from "./Components/Admin/Termination/Termination";



function App() {
  return (
    <div>
     <Termination/>
      {/* <Resignation/>
      <Onsite/> */}
      {/* <Policies/>
   
      <AssetAdmin />
     <Profile/>
    <Calendar/>
 


      <Assest/>
      <Calendar2025/>

      <ResignationAdminPanel/>

     <KnowledgeBase/>
     <KnowledgeBaseAdmin/>   */}
    </div>
  );
}

export default App;
