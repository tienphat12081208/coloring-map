import React from "react";
import home_image from "../../assets/images/home_image.png";

import "./style.scss";

const ImageGroup = () => {
  return (
    <div className="component-image-groups">
      <img
        src={home_image}
        className="component-image-groups-image"
        alt="groups"
      />
    </div>
  );
};

export default ImageGroup;
