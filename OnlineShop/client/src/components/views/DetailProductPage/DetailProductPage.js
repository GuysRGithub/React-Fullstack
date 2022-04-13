import React, { Component, useEffect, useState } from "react";
import Axios from "axios";
import { Row, Col } from "antd";
import DetailProductImage from "./DetailProductImage";
import DetailProductInfo from "./DetailProductInfo";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../_actions/user_actions";

function DetailProductPage(props) {
  const dispatch = useDispatch();

  const productId = props.match.params.productId;
  const [Product, setProduct] = useState([]);
  useEffect(() => {
    Axios.get(`api/product/product_by_id?id=${productId}&type=single`).then(
      (response) => {
        setProduct(response.data[0]);
      }
    );
  }, []);

  const addToCartHandler = (productId) => {
    dispatch(addToCart(productId));
  };
  return (
    <div className="postPage" style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>{Product.title}</h1>
      </div>
      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <DetailProductImage detail={Product} />
        </Col>
        <Col lg={12} xs={24}>
          <DetailProductInfo detail={Product} addToCart={addToCartHandler} />
        </Col>
      </Row>
    </div>
  );
}

export default DetailProductPage;
