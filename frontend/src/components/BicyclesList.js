import React, { useState, useEffect } from "react";
import BicycleDataService from "../services/BicycleService";
import { Link } from "react-router-dom";

const BicyclesList = () => {
  const [bicycles, setBicycles] = useState([]);
  const [currentBicycle, setCurrentBicycle] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchBrand, setSearchBrand] = useState("");

  useEffect(() => {
    retrieveBicycles();
  }, []);

  const onChangeSearchBrand = e => {
    const searchBrand = e.target.value;
    setSearchBrand(searchBrand);
  };

  const retrieveBicycles = () => {
    BicycleDataService.getAll()
      .then(response => {
        setBicycles(response.data.result.response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveBicycles();
    setCurrentBicycle(null);
    setCurrentIndex(-1);
  };

  const setActiveBicycle = (bicycle, index) => {
    setCurrentBicycle(bicycle);
    setCurrentIndex(index);
  };

  const removeAllBicycles = () => {
    BicycleDataService.removeAll()
      .then(response => {
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByBrand = () => {

    if(searchBrand === '') {
      refreshList();
      return;
    }

    BicycleDataService.findByBrand(searchBrand)
      .then(response => {
        setBicycles(response.data.result.response);
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
            placeholder="Search by brand"
            value={searchBrand}
            onChange={onChangeSearchBrand}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByBrand}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Bicycles List</h4>

        <ul className="list-group">
          {bicycles &&
            bicycles.map((bicycle, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveBicycle(bicycle, index)}
                key={index}
              >
                {bicycle.brand}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllBicycles}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentBicycle ? (
          <div>
            <h4>Bicycle</h4>
            <div>
              <label>
                <strong>Brand:</strong>
              </label>{" "}
              {currentBicycle.brand}
            </div>
            <div>
              <label>
                <strong>Model:</strong>
              </label>{" "}
              {currentBicycle.model}
            </div>

            <Link
              to={"/app/bicycles/" + currentBicycle.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Bicycle...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BicyclesList;
