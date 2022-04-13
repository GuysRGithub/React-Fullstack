import React from "react"
import {Row, Col} from "reactstrap"




const Table = props => {

    const getRow1 = _ => {
        let chairs = []
        for(var i = 0; i < Math.ceil(props.chair / 2); i++) {
            chairs.push(
                <span
                key={i}
                className={props.empty ? "empty-table" : "full-table"}>

                </span>
            )
        }
        return chairs;
    }
    const getRow2 = _ => {
        let chairs2 = []
        for(var i = 0; i < Math.ceil(props.chair / 2); i++) {
            chairs2.push(
                <span
                key={i}
                className={props.empty ? "empty-table" : "full-table"}>

                </span>
            )
        }
        return chairs2;
    }

    return (
        <div className="table-container">
        <Col
        className={props.empty ? "table selectable-table" : "table"}
        onClick={_ => {
            props.empty ? props.selectTable(props.name, props.id)
            : console.log("Try another table")
        }}>

        <Row noGutters className="table-rpw">
            <Col className="text-center">{getRow1()}</Col>
        </Row>
        <Row noGutters className="table-rpw">
            <Col className="text-center">{getRow2()}</Col>
        </Row>
        <p className="text-center table-name">{props.name}</p>
        </Col>
            
        </div>
    )
}

export default Table;