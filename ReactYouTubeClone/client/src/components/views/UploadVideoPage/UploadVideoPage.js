import React from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import DropZone from "react-dropzone";
import { useState } from "react";
import { useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";

const { Title } = Typography;
const { TextArea } = Input;

const Private = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const Category = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Autos & Vehicles" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animal" },
  { value: 4, label: "Sports" },
];
function UploadVideoPage(props) {
  
  const user = useSelector((state) => state.user);

  const [TitleValue, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Privacy, setPrivacy] = useState(0);
  const [Categories, setCategories] = useState("Film & Animation");
  const [FilePath, setFilePath] = useState("");
  const [FileName, setFileName] = useState("");
  const [Duration, setDuration] = useState("");
  const [Thumbnail, setThumbnail] = useState("");

  console.log(user);


  const handleChangeTitle = (event) => {
    setTitle(event.currentTarget.value);
  };

  const handleChangeDescription = (event) => {
    setDescription(event.currentTarget.value);
  };

  const handleChangePrivate = (event) => {
    setPrivacy(event.currentTarget.value);
  };

  const handleChangeCategory = (event) => {
    setCategories(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (user.userData && !user.userData.isAuth) {
      return alert("Please login to upload video");
    }

    if (
      TitleValue === "" ||
      Description === "" ||
      Categories === "" ||
      Duration === "" ||
      FilePath === "" ||
      Thumbnail === ""
    ) {
      console.log('====================================');
      console.log(`${TitleValue}, ${Description}, ${Categories}, ${Duration}, ${FilePath}, ${Thumbnail}`);
      console.log('====================================');
      return alert("Please fill all the fields to upload");
    }

    const data = {
      writer: user.userData._id,
      title: TitleValue,
      description: Description,
      privacy: Privacy,
      filePath: FilePath,
      category: Categories,
      duration: Duration,
      thumbnail: Thumbnail,
    };

    console.log("Data", data);

    Axios.post("/api/video/uploadVideo", data).then((response) => {
      if (response.data.success) {
        alert("Video Upload Successful");
        this.props.history.push("/");
      } else {
        alert("Failed to Upload Video");
      }
    });
  };

  const onVideoDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    console.log('====================================');
    console.log(files);
    console.log('====================================');
    formData.append("file", files[0]);

    Axios.post("/api/video/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        let result = {
          filePath: response.data.filePath,
          fileName: response.data.fileName,
        };
        setFilePath(response.data.filePath);

        Axios.post("/api/video/thumbnail", result).then((response) => {
          if (response.data.success) {
            console.log(response);
            setDuration(response.data.fileDuration);
            setThumbnail(response.data.thumbsFilePath);
          } else {
            alert("Failed to generate Video thumbnail");
          }
        });
      } else {
        alert("Failed to save Video");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Video</Title>
      </div>

      <Form onSubmit={onSubmit}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <DropZone multiple={false} maxSize={800000000} onDrop={onVideoDrop}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "300px",
                  height: "240px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: "3rem"}} />
              </div>
            )}
          </DropZone>

          {Thumbnail !== "" && (
            <div>
              <img
                src={`http://localhost:5000/${Thumbnail}`}
                alt="Thumbnail Video"
              />
            </div>
          )}
        </div>

        <br />
        <label>Title</label>
        <Input value={TitleValue} onChange={handleChangeTitle} />
        <br /> <br/>
        <TextArea value={Description} onChange={handleChangeDescription} />

        <br />
        <br />

        <select onChange={handleChangePrivate}>
          {Private.map((item, index) => (
            <option key={index} value={item.label}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <select onChange={handleChangeCategory}>
          {Category.map((item, index) => (
            <option value={item.value} key={index}>
              {item.label}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="primary" size="large" onClick={onSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default UploadVideoPage;
