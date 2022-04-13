import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";

import { Icon, Col, Card, Row } from "antd";

const { Meta } = Card;

import Axios from "axios";
import ImageSilder from "../../Utils/ImageSilder";
import { on } from "nodemon";
import CustomCheckBox from "./Sections/CheckBox";
import RadioCheckBox from "./Sections/RadioCheckBox";
import SearchFeature from "./Sections/SearchFeature";

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);
  const [SearchValue, setSearchValue] = useState("");
  const [Filters, setFilters] = useState({
    continents: [],
    price: [],
  });

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    };
    postGetProducts(variables);
  });

  const postGetProducts = (variables) => {
    Axios.post("/api/product/getProducts", variables).then((response) => {
      if (response.data.success) {
        if (variables.loadMore) {
          setProducts([...Products, response.data.products]);
        } else {
          setProducts(response.data.products);
        }
        setPostSize(response.data.PostSize);
      } else {
        alert("Failed to fetch");
      }
    });
  };

  const onLoadMore = () => {
    let skip = Skip + Limit;
    const variables = {
      skip: Skip,
      limit: Limit,
      loadMore: true,
    };
    postGetProducts(variables);
    setSkip(skip);
  };

  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };
    newFilters[category] = filters;

    if (category == "price") {
      newFilters[category] = handlePrice(filters);
    }

    setFilters(newFilters);
  };

  const showFilteredResults = (filters) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };
    setSkip(0);
  };

  const updateSearch = (searchValue) => {
    const variables = {
      skip: Skip,
      limit: Limit,
      loadMore: loadMore,
      filters: filters,
      search: searchValue,
    };
    setSearchValue(searchValue);
    setSkip(0);

    postGetProducts();
  };

  return (
    <>
      <div className="app" style={{ width: "75%", margin: "3rem auto" }}>
        <div className="" style={{ textAlign: "center" }}>
          <h2>
            {" "}
            Let's Travel to somewhere <Icon type="rocket" />{" "}
          </h2>
        </div>

        {/*  */}
        <Row gutter={[16, 16]}>
          <Col lg={12} xs={20}>
            <CustomCheckBox
              handleFilters={(filters) => handleFilters(filters, "continents")}
            />
          </Col>
          <Col lg={12} xs={20}>
            <RadioCheckBox
              handleFilters={(filters) => handleFilters(filters, "prices")}
            />
          </Col>
        </Row>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "1rem auto",
          }}
        >
          <SearchFeature refreshFunction={updateSearch} />
        </div>
        {/*  */}

        {Products.length === 0 ? (
          <div
            style={{
              display: "flex",
              height: "300px",
              justifyContent: "center",
            }}
          >
            <h2>No post yet ...</h2>
          </div>
        ) : (
          <div>
            <Row gutter={[16, 16]}>
              {Products.map((product) => {
                return (
                  <Col lg={6} md={8} xs={18}>
                    <Card
                      hoverable={true}
                      cover={<ImageSilder images={product.images} />}
                    >
                      <Meta
                        title={`$${product.title}`}
                        description={product.price}
                      />
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
        )}
        <br />
        <br />
        {PostSize >= Limit && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onLoad={onLoadMore}>Load More</button>
          </div>
        )}
      </div>
    </>
  );
}

export default LandingPage;
