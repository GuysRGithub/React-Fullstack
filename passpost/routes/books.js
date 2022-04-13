const express = require("express");
const router = express.Router();
const Book = require("../model/book");
const imageWhiteList = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
const Author = require("../model/author");

router.get("/", async (req, res) => {
  let query = Book.find();

  if (req.query.title != null && req.query.title != "") {
    query = query.regex("title", new RegExp(req.query.title, "i"));
  }

  if (req.query.publishAfter != null && req.query.publishAfter != "") {
    query = query.gte("publishDate", req.query.publishAfter);
  }

  if (req.query.publishBefore != null && req.query.publishBefore != "") {
    query = query.lte("publishDate", req.query.publishBefore);
  }

  try {
    const books = await query.exec();
    res.render("books/index", {
      books: books,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
});

router.get("/new", async (req, res) => {
  let book = new Book()
  console.log('====================================');
  console.log(book);
  console.log('====================================');
  renderFormPage(res, book, "new");
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    description: req.body.description,
  });

  saveCover(book, req.body.cover);

  try {
    const newBook = await book.save();
    res.redirect("books");
  } catch (err) {
    // if (book.coverImage != null) {
    //   removeBookCover(book.coverImage);
    // }
    console.log("Error when save books", err);
    renderFormPage(res, book, "new", true);
  }
});

// function removeBookCover(fileName) {
//   fs.unlink(path.join(uploadPath, fileName), (err) => {
//     if (err) console.error(err);
//   });
// }

// Show
router.get("/:id", async (req, res) => {
  try {
    const book = Book.findById(req.params.id).populate("Author").exec();
    res.render("books/show", {
      book: book,
    });
  } catch (error) {
    res.redirect("/");
  }
});

// Edit
router.get("/:id/edit", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    renderFormPage(res, book, "edit", true);
  } catch (error) {
    console.log("Error", error);
    res.redirect("/books");
  }
});

router.put("/:id", async (req, res) => {
  let book;
  try {
    book = await Book.findById(req.params.id);
    book.title = req.body.name;
    book.description = req.body.description;
    book.author = req.body.author;
    book.pageCount = req.body.pageCount;
    book.publishDate = new Date(req.body.publishDate);
    if (req.body.cover != null && req.body.cover !== "") {
      saveCover(book, req.body.cover);
    }
    await book.save();
    res.redirect(`/books/${book.id}`);
  } catch {
    if (book == null) {
      res.redirect("/");
    } else {
      renderFormPage(res, book, "edit", true);
    }
  }
});

router.delete("/:id", async (req, res) => {
  let book;
  try {
    book = Book.findById(req.params.id);
    await book.remove();
    res.redirect("/books");
  } catch (error) {
    if (book == null) {
      res.redirect("/");
    } else {
      res.render("books/show", {
        book: book,
        errorMessage: "Could not remove book",
      });
    }
  }
});

async function renderFormPage(res, book, form, hasError = false) {
  try {
    const authors = await Author.find({});
    const params = { book: book, authors: authors };
    if (hasError) params.errorMessage = "Error creating new Book";
    res.render(`books/${form}`, params);
  } catch {
    res.redirect("/books");
  }
}

function saveCover(book, coverEncoded) {
  if (coverEncoded == null) return;
  const coverJson = JSON.parse(coverEncoded);
  console.log(coverJson.type);

  if (coverJson != null && imageWhiteList.includes(coverJson.type)) {
    book.coverImage = new Buffer.from(coverJson.data, "base64");
    book.coverImageType = coverJson.type;
  }
}

module.exports = router;
