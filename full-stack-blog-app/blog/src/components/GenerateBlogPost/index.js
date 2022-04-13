import React, { Component } from "react";


const formValid = (formErrors) => {
  let valid = true;

  Object.values(formErrors).forEach(
    (val) => val.length > 0 && (valid = false)
  );

  return valid
};
class BlogPostGenerate extends Component {

  URL_SERVER = "http://localhost:5000/newBlogPost";

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      blogTitle: null,
      blogCategory: null,
      postedOn: null,
      author: null,
      blogText: null,
      blogImage: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      },
    };
  }

  handleRegister(event) {
    event.preventDefault();

    if (formValid(this.state.formErrors)) {
    } else {
      console.log("Error");
    }
  }

  handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    let formErrors = this.state.formErrors;

    switch (name) {
      case "blogTitle":
        formErrors.firstName =
          value.length < 6 && value.length > 0
            ? "minimun 3 charaters is required"
            : "";
        break;
      case "blogCategory":
        formErrors.lastName =
          value.length < 6 && value.length > 0
            ? "minimun 3 charaters is required"
            : "";
        break;
      case "author":
        formErrors.email =
         emailRegex.test(value) && value.length > 0
            ? "minimun 3 charaters is required"
            : "";
        break;
      case "blogText":
        formErrors.firstName =
          value.length < 6 && value.length > 0
            ? "minimun 6 charaters is required"
            : "";
        break;
      default:
        break;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    var user = {
      username,
      password,
    };

    fetch(this.URL_SERVER, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "content-type": "application/json" },
    });
    // .then((res) => res.json())
    // .then((result) => {
    //   console.log(result);
    // });

    console.log(JSON.stringify(user));
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="blogTitle"></label>
            <input type="text" name="blogTitle" />
          </div>
          <div>
            <label htmlFor="blogCategory"></label>
            <input type="text" name="blogCategory" />
          </div>
          <div>
            <label htmlFor="postedOn"></label>
            <input type="date" name="postedOn" />
          </div>
          <div>
            <label htmlFor="author"></label>
            <input type="text" name="author" />
          </div>
          <div>
            <label htmlFor="blogText"></label>
            <textarea type="text" name="blogText" />
          </div>
          <div>
            <label htmlFor="blogTitle"></label>
            <input type="text" name="blogTitle" />
          </div>
        </form>
      </div>
    );
  }
}

export default BlogPostGenerate;
