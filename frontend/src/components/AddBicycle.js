import React, { useState } from "react";
import BicycleDataService from "../services/BicycleService";

const AddBicycle = () => {
  const initialBicycleState = {
    id: null,
    brand: "",
    model: "",
  };
  const [bicycle, setBicycle] = useState(initialBicycleState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setBicycle({ ...bicycle, [name]: value });
  };

  const saveBicycle = () => {
    var data = {
      brand: bicycle.brand,
      model: bicycle.model
    };

    BicycleDataService.create(data)
      .then(response => {
        setBicycle({
          id: response.data.id,
          brand: response.data.brand,
          model: response.data.model,
        });
        setSubmitted(true);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newBicycle = () => {
    setBicycle(initialBicycleState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newBicycle}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              className="form-control"
              id="brand"
              required
              value={bicycle.brand}
              onChange={handleInputChange}
              name="brand"
            />
          </div>

          <div className="form-group">
            <label htmlFor="model">Model</label>
            <input
              type="text"
              className="form-control"
              id="model"
              required
              value={bicycle.model}
              onChange={handleInputChange}
              name="model"
            />
          </div>

          <button onClick={saveBicycle} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddBicycle;
