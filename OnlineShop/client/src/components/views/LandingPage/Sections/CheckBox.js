import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";
import CollapsePanel from "antd/lib/collapse/CollapsePanel";

const continents = [
  {
    _id: 1,
    name: "Africa",
  },
  {
    _id: 2,
    name: "Europe",
  },
  {
    _id: 3,
    name: "Asia",
  },
  {
    _id: 4,
    name: "",
  },
  {
    _id: 5,
    name: "Australia",
  },
  {
    _id: 6,
    name: "Australia",
  },
  {
    _id: 7,
    name: "Antarctica",
  },
];

function CustomCheckBox(props) {

  
    const [Checked, setChecked] = useState([])

    const handleToggle = (value) => {
        const currentIndex = Checked.indexOf(value)
        const newChecked = [...Checked];

        if (currentIndex === -1) {
            newChecked.push(value)
        } else {
          console.log("WTF");
            newChecked.splice(currentIndex, 1)
        }
        console.log(newChecked);

        setChecked(newChecked)
        props.handleFilters(newChecked)
    }

  return (
    <div style={{width: "100%"}}>
      <Collapse defaultActiveKey={["0"]}>
        <CollapsePanel header="Continents" key="1">
          {continents.map((value, index) => (
            <>
              <Checkbox onChange={() => handleToggle(value._id)} type="checkbox" checked={Checked.indexOf(value._id) === -1 ? false : true} key={index} />
              <span>{value.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

            </>
          ))}
        </CollapsePanel>
      </Collapse>
    </div>
  );
}

export default CustomCheckBox;
