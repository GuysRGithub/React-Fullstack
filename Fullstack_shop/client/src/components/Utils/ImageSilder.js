import React from "react";
import { Carousel } from "antd";

function ImageSilder(props) {
  return (
    <div>
      <Carousel autoplay>
        {props.images.map((image, index) => {
          return (
            <div>
              <img style={{width: "100%", height: "150px"}}
                src={`http://localhost:5000/${image}`}
                alt="productImage"
                key={index}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default ImageSilder;
