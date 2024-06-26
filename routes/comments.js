// routes/comments.js

const express = require('express');
const router = express.Router();
const { Comment } = require('../models');

router.get('/', async (req, res) => {
    if (req.session.loggedin) {
        const comments = await Comment.findAll();
        res.render('comments', { username: req.session.username, comments });
    } else {
        res.redirect('/auth/login');
    }
});

router.post('/', async (req, res) => {
    if (req.session.loggedin) {
        const { content } = req.body;
        await Comment.create({ content, username: req.session.username });
        res.redirect('/comments');
    } else {
        res.redirect('/auth/login');
    }
});

module.exports = router;
