import React, { useState } from "react";
import DropZone from "react-dropzone";
import { Icon } from "antd";
import Axios from "axios"

const onDrop = (files) => {
    let formData = new FormData();
    const config = {
        header: {'content-type': 'multipart/form-data'}
    }
    formData.append("file", files[0])

    Axios.post('/api/product/UploadImage', formData, config).then(response => {
        if (response.data.success) {
            setImmediate([...Images, response.data.image])
            props.refreshFunction()
        } else {
            alert("Failed to upload image")
        }
    })
}

const onDeleteImage = (image) => {
  const currentIndex = Images.indexOf(image)
  let newImages = [...Images]
  newImages.slice(currentIndex, 1)
  setImages(newImages)
  props.refreshFunction(newImages)
}
function FileUpload(props) {

    const {Images, setImages} = useState([])

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <DropZone onDrop={onDrop} 
      multiple={false}
       maxSize={40 * 1024 * 1024}>
        {({ getRootProps, getInputProps }) => {
          <div
            className=""
            style={{
              width: "300px",
              height: "240px",
              border: "1px solid lightgray",
              display: "flex",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps} />
            <Icon type="plus" style={{ fontSize: "3rem" }} />
          </div>;
        }}
      </DropZone>

      <div style={{display: "flex", width: "350px", height: "240px", overflow="scroll"}}>
      {Images.map((image, index) => (
        <div onClick={() => onDeleteImage(image)}>
              <img style={{minWidth: '300px', width: "300px", height: "240px"}} src={`http://localhost:5000/${image}`} alt={`ProductImg-${key}`}/>
          </div>
      ))}
          

      </div>
    </div>
  );
}

export default FileUpload;
