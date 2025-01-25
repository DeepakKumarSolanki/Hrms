import React from 'react';
import AllPolicies from "./Policies/AllPolicies";
import AreaSales from "./Policies/AreaSale-Manager";
import RelationshipManager from "./Policies/Relationship-managerPolicies";
import { useAuth } from "./Components/Context/AuthContext"; // AuthContext

function MainPolicies() {
  const { authState } = useAuth();
  const department = authState.userDetails.department;
  const role = authState.userDetails.role;

  return (
    <div>
      {department === "SALES" && role === "MANAGER" ? (
        <AreaSales />
      ) : department === "SALES" && role === "EMPLOYEE" ? (
        <RelationshipManager />
      ) : (
        <AllPolicies />
      )}
    </div>
  );
}

export default MainPolicies;
