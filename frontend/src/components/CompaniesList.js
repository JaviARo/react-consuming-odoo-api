import React, { useState, useEffect } from "react";
import CompanyDataService from "../services/CompanyService";
import { Link } from "react-router-dom";

const CompaniesList = () => {
  const [companies, setCompanies] = useState([]);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    retrieveCompanies();
  }, []);

  const onChangeSearchName = e => {
    const searchName = e.target.value;
    setSearchName(searchName);
  };

  const retrieveCompanies = () => {
    CompanyDataService.getAll()
      .then(response => {
        setCompanies(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveCompanies();
    setCurrentCompany(null);
    setCurrentIndex(-1);
  };

  const setActiveCompany = (company, index) => {
    setCurrentCompany(company);
    setCurrentIndex(index);
  };

  const removeAllCompanies = () => {
    CompanyDataService.removeAll()
      .then(response => {
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByName = () => {

    if(searchName === '') {
      refreshList();
      return;
    }

    CompanyDataService.findByName(searchName)
      .then(response => {
        setCompanies(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Companies List</h4>

        <ul className="list-group">
          {companies &&
            companies.map((company, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveCompany(company, index)}
                key={index}
              >
                {company.name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllCompanies}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentCompany ? (
          <div>
            <h4>Company</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentCompany.name}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentCompany.description}
            </div>
            <div>
              <label>
                <strong>Ingresos:</strong>
              </label>{" "}
              {currentCompany.ingresos}
            </div>
            <div>
              <label>
                <strong>Gastos:</strong>
              </label>{" "}
              {currentCompany.gastos}
            </div>
            <div>
              <label>
                <strong>Beneficios:</strong>
              </label>{" "}
              {currentCompany.beneficios}
            </div>
            <div>
              <label>
                <strong>Rentabilidad:</strong>
              </label>{" "}
              {currentCompany.rentabilidad}
            </div>

            <Link
              to={"/app/companies/" + currentCompany.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Company...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompaniesList;
