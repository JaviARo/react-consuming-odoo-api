import React, { useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddCompany from "./components/AddCompany";
import Company from "./components/Company";
import CompaniesList from "./components/CompaniesList";

import AddBicycle from "./components/AddBicycle";
import Bicycle from "./components/Bicycle";
import BicyclesList from "./components/BicyclesList";

import BicycleService from "./services/BicycleService";

import CompanyService from "./services/CompanyService";

function App() {

  useEffect(() => {
    let session_id = localStorage.getItem("session_id");
    if (!session_id) {
      // CompanyService.initSession().then(response => {
      //   localStorage.setItem("session_id", response.data.result.session_id.toString())
      // })
      BicycleService.initSession().then(response => {
        localStorage.setItem("session_id", response.data.result.session_id.toString())
      })
      return
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/app/companies" className="navbar-brand">
          <div className="company-logo" >
            <img src="/app/company-logo.jpg" alt="Companies" />
          </div>
        </a>
        <div className="navbar-nav mr-auto">
          {/* <li className="nav-item">
            <Link to={"/app/companies"} className="nav-link">
              Companies
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/app/add"} className="nav-link">
              Add
            </Link>
          </li> */}
          <li className="nav-item">
            <Link to={"/app/bicycles"} className="nav-link">
              Bicycles
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/app/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          {/* <Route path="/app" element={<CompaniesList />} />
          <Route path="/app/companies" element={<CompaniesList />} />
          <Route path="/app/add" element={<AddCompany />} />
          <Route path="/app/companies/:id" element={<Company />} />
          <Route path="/" element={<Navigate to="/app" />} />
          <Route path="*" element={
            <div>
              <h2>404 Page not found</h2>
            </div>
          }
          /> */}
          <Route path="/app" element={<BicyclesList />} />
          <Route path="/app/bicycles" element={<BicyclesList />} />
          <Route path="/app/add" element={<AddBicycle />} />
          <Route path="/app/bicycles/:id" element={<Bicycle />} />
          <Route path="/" element={<Navigate to="/app" />} />
          <Route path="*" element={
            <div>
              <h2>404 Page not found</h2>
            </div>
          }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
