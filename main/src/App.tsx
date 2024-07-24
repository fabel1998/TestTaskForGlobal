import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { OrganizationList } from "./components/OrganizationList";
import { EmployeeList } from "./components/EmployeeList";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrganizationList />} />
        <Route path="/organization/:id" element={<EmployeeList />} />
      </Routes>
    </Router>
  );
}

export default App;
