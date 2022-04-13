import React, { Component, useState } from "react";
import { Typography, Button, Form, Input, Icon } from "antd";
import FileUpload from "../../Utils/FileUpload";
import Axios from "axios";
import "./style.css"

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Asia" },
  { key: 3, value: "Europe" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antarctia" },
];

const { Title } = Typography;
const { TextArea } = Input;

function UploadProductPage(props) {
  const [TitleValue, setTitleValue] = useState("");
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [PriceValue, setPriceValue] = useState(0);
  const [ContinentValue, setContinentValue] = useState(1);
  const [Images, setImages] = useState([]);

  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onContinentChange = (event) => {
    setContinentValue(event.currentTarget.value);
  };

  const updateImage = (newImage) => {
    console.log("====================================");
    console.log("Update Image", newImage);
    console.log("====================================");
    setImages(newImage);
  };

  const onPriceChange = (event) => {
    setPriceValue(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (
      !TitleValue ||
      !Images ||
      !PriceValue ||
      !DescriptionValue ||
      !ContinentValue
    ) {
      console.log(
        TitleValue,
        Images,
        PriceValue,
        DescriptionValue,
        ContinentValue
      );
      return alert("Please fill all the field!");
    }

    let data = {
      writer: props.user.userData._id,
      title: TitleValue,
      description: DescriptionValue,
      price: PriceValue,
      continent: ContinentValue,
      images: Images,
    };
    Axios.post("/api/product/uploadProduct", data).then((response) => {
      if (response.data.success) {
        alert("Product Upload Successfully!");
        
      } else {
        alert("Product Upload Failed");
      }
    });
  };

  return (
    <div className="" style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div
        className=""
        style={{ textAlign: "center", marginBottom: "2rem" }}
      ></div>

      <Form action="" onSubmit={onSubmit}>
        <div  className="form-field">
          <FileUpload refreshFunction={updateImage} />
        </div>

        <div className="form-field">
          <label htmlFor="">Title</label>
          <Input type="text" onChange={onTitleChange} value={TitleValue} />
        </div>

        <div className="form-field">
          <label htmlFor="">Description</label>
          <TextArea
            name=""
            id=""
            cols="30"
            rows="10"
            onChange={onDescriptionChange}
            value={DescriptionValue}
          ></TextArea>
        </div>

        <div className="form-field">
          <label htmlFor="">Price</label>
          <Input type="number" onChange={onPriceChange} value={PriceValue} />
        </div>
        <div className="form-field">
          <select
            name=""
            id=""
            onChange={onContinentChange}
            value={ContinentValue}
          >
            {Continents.map((item) => (
              <option value={item.key} key={item.key}>
                {item.value}
              </option>
            ))}
          </select>
        </div>
        <div className="form-field">
          <Button onClick={onSubmit}>Submit</Button>
        </div>
      </Form>
    </div>
  );
}

export default UploadProductPage;
