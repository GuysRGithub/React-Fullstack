import React, { useEffect, useState } from "react";
import { FaCode } from "react-icons/fa";
import Axios from "axios";
import ImageSlider from "../../Utils/ImageSilder";
import CustomCheckBox from "./Sections/CheckBox";
import RadioCheckBox from "./Sections/RadioCheckBox";
import SearchFeature from "./Sections/SearchFeature";
import { continents, price } from "./Sections/Data";
import { Icon, Col, Card, Row } from "antd";

const { Meta } = Card;

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
  }, []);

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
      filters: Filters,
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
    console.log(newFilters);
    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const showFilteredResults = (filters) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: filters,
      loadMore: false,
    };
    postGetProducts(variables);
    setSkip(0);
  };

  const updateSearch = (searchValue) => {
    const variables = {
      skip: Skip,
      limit: Limit,
      loadMore: false,
      filters: Filters,
      search: searchValue,
    };
    setSearchValue(searchValue);
    setSkip(0);

    postGetProducts(variables);
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

        <div style={{ width: "100%" }}>
          {/*  */}
          <Row gutter={[16, 16]}>
            <Col lg={12} xs={20}>
              <CustomCheckBox
                handleFilters={(filters) =>
                  handleFilters(filters, "continents")
                }
              />
            </Col>
            <Col lg={12} xs={20}>
              <RadioCheckBox
                handleFilters={(filters) => handleFilters(filters, "price")}
              />
            </Col>
          </Row>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "1rem auto",
            width: "100%",
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
          <div style={{ width: "100%" }}>
            <Row gutter={[16, 16]}>
              {Products.map((product) => {
                return (
                  <Col lg={6} md={16} xs={24}>
                    <Card
                      hoverable={true}
                      cover={
                        <a href={`/product/${product._id}`}>
                          {" "}
                          <ImageSlider images={product.images} />
                        </a>
                      }
                    >
                      <Meta
                        title={product.title}
                        description={`$${product.price}`}
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
