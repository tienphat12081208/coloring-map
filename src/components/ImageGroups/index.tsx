import React from "react";
import home_image from "../../assets/images/banner-one.jpg";

import "./style.scss";

const ImageGroup = () => {
  return (
    <div className="component-image-groups">
      <img
        src={home_image}
        className="component-image-groups-image"
        alt="groups"
      />
      <div className='component-image-groups-information'>
      <p className="component-image-groups-information-wellcome">WELCOME TO</p>
      <p className="component-image-groups-information-title">
        Coloring
      </p>
      <p className="component-image-groups-information-title2">
        Map
      </p>
      <div className="component-image-groups-information-line"></div>
      <div className="component-image-groups-information-instructors">Instructors</div>
      <div className="component-image-groups-information-detail">
        TS. NGUYEN THIEN BAO
      </div>
      </div>
    </div>
  );
};

export default ImageGroup;
