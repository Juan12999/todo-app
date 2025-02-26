const express = require('express');
const router = express.Router();
const { createTodo, getTodos,editTodo, completeTodo, deleteTodo } = require('../controllers/todoController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/', createTodo);
router.get('/', getTodos);
router.put('/', editTodo);
router.put('/completed', completeTodo);
router.delete('/', deleteTodo);

module.exports = router;
