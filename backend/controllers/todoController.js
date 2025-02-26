const Todo = require('../models/todo');

exports.createTodo = async (req, res) => {
  const { task } = req.body;

  try {
    const todo = new Todo({
      task,
      user: req.userId,
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userId });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: 'Error getting tasks', error });
  }
};

exports.editTodo=async (req,res)=>{
  const { id,task } = req.body;
  try {
    const todo = await Todo.findOneAndUpdate({ _id: id,user:req.userId },{
      task:task
    });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Error getting tasks', error });
  }
}

exports.completeTodo = async (req, res) => {
  const { id,completed } = req.body;
  try {
    const todo = await Todo.findOneAndUpdate({_id:id,user:req.userId}, { completed: completed });
  } catch (error) {
    res.status(500).json({ message: 'Error completing task', error });
  }
};

exports.deleteTodo = async (req, res) => {
  const { id } = req.query;

  try {
    await Todo.findOneAndDelete({_id:id,user:req.userId});
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};
