const express = require('express');
const router = express.Router();
const { createTodo, getTodos, completeTodo, deleteTodo } = require('../controllers/todoController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', createTodo);
router.get('/', getTodos);
router.put('/:id/complete', completeTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
