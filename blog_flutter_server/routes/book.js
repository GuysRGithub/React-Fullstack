const express = require('express');
const router = express.Router();
const axios = require('axios').default;

router.get('/books', (req, res) => {
    // noinspection JSUnresolvedFunction
    const q = req.query.q || "the men";
    const limit = req.query.limit || null
    axios.get(`https://openlibrary.org/search.json?q=${q}${limit ? `&limit=${limit}` : ""}`)
        // .then(result => result.json())
        .then(result => {
            const books = []
            for (let i = 0; i < result.data['numFound']; i++) {
                const doc = result.data['docs'][i];
                if (doc === undefined) continue
                const book = {
                    "title": doc['title'],
                    // "description": x['text'],
                    "publish_date": doc['publish_date'] ? doc['publish_date'][0] : "",
                    'author': doc['author_name'] ? doc['author_name'][0] : "",
                    'cover': `https://covers.openlibrary.org/b/isbn/${doc['isbn'] ? doc['isbn'][0] : 'blank'}-M.jpg`
                }
                books.push(book)
            }
            return res.json({"docs": books})
        })
        .catch(err => {
            return res.status(500).json({err: err.message})
        })
})

module.exports = router