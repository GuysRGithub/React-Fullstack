const express = require("express");
const router = express.Router();
const Author = require("../model/author");
const Book = require("../model/book")

router.get("/", async (req, res) => {
  let searchOptions = {};

  if (req.query.name != null && req.query.name.length !== "") {
    searchOptions.name = RegExp(req.query.name, "i");
  }
  try {
    const authors = await Author.find(searchOptions);
    console.log(authors);
    res.render("authors/index", { authors: authors, searchOptions: req.query });
  } catch {
    res.redirect("/");
  }
});

router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

router.post("/", async (req, res) => {
  console.log(req.body.name);
  if (req.body.name == '') return
  const author = new Author({
    name: req.body.name,
  });


  try {
    const newAuthor = await author.save();
    res.redirect(`authors/${newAuthor.id}`);

    res.redirect("authors");
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error while creating Author",
    });
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id)
    res.render("authors/edit", {
      author: author
    })
  } catch (error) {
    res.redirect("/")
  }
})

router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id)
    const books = await Book.find({author: author.id}).limit(6).exec()
    res.render('authors/show', {
      author: author,
      booksByAuthor: books
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
});

router.put("/:id/edit", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    res.render("authors/edit", { author: author });
  } catch (error) {
    console.log('Error', error)
    res.redirect("/authors");
  }
});

router.put("/:id", async (req, res) => {
  let author
  try {
    author = await Author.findById(req.params.id);
    author.name = req.body.name;
    await author.save();
    res.redirect(`/authors/${author.id}`);
  } catch {
    if (author == null) {
      res.redirect("/")
    } else {
      res.render("authors/", {
        author: author,
        errorMessage: "Error while updating Author",
      });
    }
    
  }
});

router.delete("/:id", async (req, res) => {
  let author
  try {
    author = await Author.findById(req.params.id);
    await author.remove()
    res.redirect(`/authors/`);
  } catch {
    if (author == null) {
      res.redirect("/")
    } else {
      res.redirect(`/..authors/${author.id}`)
    }
    
  }
});

module.exports = router;
