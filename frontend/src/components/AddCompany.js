import React, { useState } from "react";
import CompanyDataService from "../services/CompanyService";

const AddCompany = () => {
  const initialCompanyState = {
    id: null,
    name: "",
    description: "",
    // ingresos: "",
    // gastos: ""
  };
  const [company, setCompany] = useState(initialCompanyState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCompany({ ...company, [name]: value });
  };

  const saveCompany = () => {
    var data = {
      name: company.name,
      description: company.description
    };

    CompanyDataService.create(data)
      .then(response => {
        setCompany({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          // ingresos: response.data.ingresos,
          // gastos: response.data.gastos
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newCompany = () => {
    setCompany(initialCompanyState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCompany}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={company.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={company.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          {/* <div className="form-group">
            <label htmlFor="ingresos">Ingresos</label>
            <input
              type="number"
              className="form-control"
              id="ingresos"
              required
              value={company.ingresos}
              onChange={handleInputChange}
              name="ingresos"
            />
          </div>

          <div className="form-group">
            <label htmlFor="gastos">Gastos</label>
            <input
              type="number"
              className="form-control"
              id="gastos"
              required
              value={company.gastos}
              onChange={handleInputChange}
              name="gastos"
            />
          </div> */}

          <button onClick={saveCompany} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCompany;
