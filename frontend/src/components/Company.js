import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import CompanyDataService from "../services/CompanyService";

const Company = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialCompanyState = {
    id: null,
    name: "",
    description: "",
    // ingresos: "",
    // gastos: ""
  };
  const [currentCompany, setCurrentCompany] = useState(initialCompanyState);
  const [message, setMessage] = useState("");

  const getCompany = id => {
    CompanyDataService.get(id)
      .then(response => {
        setCurrentCompany(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getCompany(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentCompany({ ...currentCompany, [name]: value });
  };

  const updateCompany = () => {
    CompanyDataService.update(currentCompany.id, currentCompany)
      .then(response => {
        setMessage("The Company was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteCompany = () => {
    CompanyDataService.remove(currentCompany.id)
      .then(response => {
        navigate("/app/companies");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCompany ? (
        <div className="edit-form">
          <h4>Company</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentCompany.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentCompany.description}
                onChange={handleInputChange}
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="ingresos">Ingresos</label>
              <input
                type="number"
                className="form-control"
                id="ingresos"
                name="ingresos"
                value={currentCompany.ingresos}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gastos">Gastos</label>
              <input
                type="number"
                className="form-control"
                id="gastos"
                name="gastos"
                value={currentCompany.gastos}
                onChange={handleInputChange}
              />
            </div> */}

          </form>

          <button className="badge badge-danger mr-2" onClick={deleteCompany}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateCompany}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Company..</p>
        </div>
      )}
    </div>
  );
};

export default Company;
