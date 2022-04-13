import React, { Component } from "react";
import PropTypes from "prop-types";
import CardArticle from "../../components/UI/Card/CardArticle";
import "./style.css";
import { Redirect, withRouter } from "react-router-dom";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewDetail: false,
      id: 0,
    };
  }

  render() {
    // if (this.state.viewDetail === true) {
    //   <Redirect to={`/post/${this.state.id}`} />
    // }
    return (
      <div className="articles">
        <CardArticle
          id="1"
          imageSrc="redcharlie-k2zWqv_yfNM-unsplash.jpg"
          title="Converting from Speech to Text with JavaScript"
          content=" A free pack of responsive Bootstrap 3 image gallery templates with
            smooth CSS on-hover effects and Lightbox overlays."
        ></CardArticle>
        <CardArticle
          id="2"
          imageSrc="patrick-tomasso-5hvn-2WW6rY-unsplash.jpg"
          title="Converting from Speech to Text with JavaScript"
          content="New JavaScript tools from the Facebook developers team, an excellent Electron starter kit. and more in our web dev resources compilation for March!"
        ></CardArticle>
        <CardArticle
          id="3"
          imageSrc="tim-swaan-eOpewngf68w-unsplash.jpg"
          title="Freebie: 5 Fantastic Bootstrap Footers"
          content="A bundle of Bootstrap 3 templates for responsive footers. They are absolutely free, very easy to implement, and will save you lots of precious coding time."
        ></CardArticle>
        <CardArticle
          id="4"
          imageSrc="sora-sagano-Dksk8szLRN0-unsplash.jpg"
          title="CSS Grid VS Flexbox: A Practical Comparison"
          content="We take a look at the new CSS Grid system and compare it with flexbox to see which is the better layout building tool."
        ></CardArticle>
        <CardArticle
          id="5"
          imageSrc="redcharlie-k2zWqv_yfNM-unsplash.jpg"
          title="Converting from Speech to Text with JavaScript"
          content=" A free pack of responsive Bootstrap 3 image gallery templates with
            smooth CSS on-hover effects and Lightbox overlays."
        ></CardArticle>
        <CardArticle
          id="1"
          imageSrc="nature-3082832_640.jpg"
          title="Converting from Speech to Text with JavaScript"
          content=" A free pack of responsive Bootstrap 3 image gallery templates with
            smooth CSS on-hover effects and Lightbox overlays."
        ></CardArticle>
      </div>
    );
  }
}

Posts.propTypes = {};

export default withRouter(Posts);
