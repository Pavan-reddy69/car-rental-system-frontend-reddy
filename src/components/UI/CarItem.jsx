import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";

const CarItem = (props) => {
  const { id,url, brandName, modelName, automatic, mileage, pricePerHour } = props.item;

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={url} alt="" className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{brandName} {modelName}</h4>
          <h6 className="rent__price text-center mt-">
            ${pricePerHour}.00 <span>/ Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-car-line"></i> {brandName}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-settings-2-line"></i> {automatic}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i class="ri-timer-flash-line"></i> {mileage}kmpl
            </span>
          </div>

          <button className=" car__item-btn a">
            <Link to={`/cars/${id}`}>Book</Link>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
