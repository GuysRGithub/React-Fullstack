import React, { useState } from "react";
import { Collapse, Radio } from "antd";
const { Panel } = Collapse;

const prices = [
  {
    _id: 0,
    name: "Any",
    array: [],
  },
  {
    _id: 1,
    name: "$0 to $199",
    array: [0, 199],
  },
  {
    _id: 2,
    name: "$200 to $249",
    array: [200, 249],
  },
  {
    _id: 3,
    name: "$250 to $279",
    array: [250, 279],
  },
  {
    _id: 4,
    name: "$280 to $299",
    array: [280, 299],
  },
  {
    _id: 5,
    name: "More than $300",
    array: [300, 1500000],
  },
];

function RadioCheckBox(props) {
  const [Value, setValue] = useState("0");
  const renderRadioBox = () => {
    return prices.map((value) => {
      return (
        <Radio key={value._id} value={`${value._id}`}>
          {value.name}
        </Radio>
      );
    });
  };

  const handleRadioBoxChange = (event) => {
    setValue(event.target.value);
    props.handleFilters(event.target.value);
  };

  return (
    <div>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="Price">
          <Radio.Group onChange={handleRadioBoxChange} value={Value}>
            {renderRadioBox()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
}

export default RadioCheckBox;
