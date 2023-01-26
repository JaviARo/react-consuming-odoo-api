import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import BicycleDataService from "../services/BicycleService";

const Bicycle = props => {
  const { id }= useParams();
  let navigate = useNavigate();

  const initialBicycleState = {
    id: null,
    brand: "",
    model: "",
  };
  const [currentBicycle, setCurrentBicycle] = useState(initialBicycleState);
  const [message, setMessage] = useState("");

  const getBicycle = id => {
    BicycleDataService.get(id)
      .then(response => {
        setCurrentBicycle(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getBicycle(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentBicycle({ ...currentBicycle, [name]: value });
  };

  const updateBicycle = () => {
    BicycleDataService.update(currentBicycle.id, currentBicycle)
      .then(response => {
        setMessage("The bicycle was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteBicycle = () => {
    BicycleDataService.remove(currentBicycle.id)
      .then(response => {
        navigate("/app/bicycles");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentBicycle ? (
        <div className="edit-form">
          <h4>Bicycle</h4>
          <form>
            <div className="form-group">
              <label htmlFor="brand">Brand</label>
              <input
                type="text"
                className="form-control"
                id="brand"
                name="brand"
                value={currentBicycle.brand}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="model">Model</label>
              <input
                type="text"
                className="form-control"
                id="model"
                name="model"
                value={currentBicycle.model}
                onChange={handleInputChange}
              />
            </div>

          </form>

          <button className="badge badge-danger mr-2" onClick={deleteBicycle}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateBicycle}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Bicycle...</p>
        </div>
      )}
    </div>
  );
};

export default Bicycle;
