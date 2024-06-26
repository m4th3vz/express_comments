// routes/comments.js

const express = require('express');
const router = express.Router();
const { Comment } = require('../models');

// Rota para exibir todos os comentários
router.get('/', async (req, res) => {
    if (req.session.loggedin) {
        const comments = await Comment.findAll({
            order: [['createdAt', 'DESC']]
        });
        res.render('comments', { username: req.session.username, comments });
    } else {
        res.redirect('/auth/login');
    }
});

// Rota para criar um novo comentário
router.post('/', async (req, res) => {
    if (req.session.loggedin) {
        const { content } = req.body;
        await Comment.create({ content, username: req.session.username });
        res.redirect('/comments');
    } else {
        res.redirect('/auth/login');
    }
});

// Rota para excluir um comentário específico
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findByPk(id);
        if (!comment) {
            res.status(404).send('Comentário não encontrado.');
            return;
        }
        if (comment.username !== req.session.username) {
            res.status(403).send('Você não tem permissão para excluir este comentário.');
            return;
        }
        await comment.destroy();
        res.redirect('/comments');
    } catch (error) {
        console.error('Erro ao excluir comentário:', error);
        res.status(500).send('Erro ao excluir comentário.');
    }
});

module.exports = router;