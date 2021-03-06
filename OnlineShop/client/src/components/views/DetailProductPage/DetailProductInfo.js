import React from "react";
import { Descriptions, Button } from "antd";
import { useState } from "react";
import { useEffect } from "react";

function DetailProductInfo(props) {
  const [Product, setProduct] = useState({});

  useEffect(() => {
    setProduct(props.detail);
  }, [props.detail]);


  const addToCartHandle = () => {
    props.addToCart(props.detail._id)
  }

  return (
    <div>
      <Descriptions title="Product Info">
        <Descriptions.Item label="Price">{Product.price}</Descriptions.Item>
        <Descriptions.Item label="Sold">{Product.sold}</Descriptions.Item>
        <Descriptions.Item label="View">{Product.views}</Descriptions.Item>
        <Descriptions.Item label="Description">{Product.description}</Descriptions.Item>
      </Descriptions>

      <div className="" style={{ display: "flex", justifyContent: "center" }}>
        <Button size="large" size="round" type="danger" onClick>
          Add to cart
        </Button>
      </div>
    </div>
  );
}

export default DetailProductInfo;
