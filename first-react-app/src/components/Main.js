import React from "react"
import {Row, Col, Button} from "reactstrap"
export default props => {
    return (
        <div>
           <Row noGutters className="text-center align-items-center">
           <Col>
               <p className="looking-for-pizza">
                   If you're looking for grate pizza
                   <i className="fas fa-pizza-slice pizza-slice"></i>
               </p>
               <Button
               color="none"
               className="book-table-btn"
               onClick={_ => {
                   props.setPage(1);
               }}
               
               >
               Book a Table

               </Button>
           </Col>
           </Row>
           <Row noGutters className="text-center big-img-container">
               <Col>
                   <img src={require("../images/cafe.jpg")} alt="Show case"
                   className="big-img">

                   </img>
               </Col>
           </Row>
        </div>
    )
}
