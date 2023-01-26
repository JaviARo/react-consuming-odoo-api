import React, { useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddBicycle from "./components/AddBicycle";
import Bicycle from "./components/Bicycle";
import BicyclesList from "./components/BicyclesList";

import BicycleService from "./services/BicycleService";

function App() {

  useEffect(() => {
    let session_id = localStorage.getItem("session_id");
    if (!session_id) {
      BicycleService.initSession().then(response => {
        localStorage.setItem("session_id", response.data.result.session_id.toString())
      })
      return
    }
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/app/bicycles" className="navbar-brand">
          <div className="bicycle-logo" >
            <img src="/app/bicycle-logo.jpg" alt="Bikes" />
          </div>
        </a>
        <div className="navbar-nav mr-auto">
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
