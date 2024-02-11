const TodosModel = require('../models/todos');

const getAll = () => {
  const todos = TodosModel.getAll();
  return todos;
};

const getById = (id) => {
  const todo = TodosModel.getById(id);
  return todo;
};

const deleteById = (id) => {
  TodosModel.deleteById(id);
};

const updateById = (id, updatedTodo) => {
  const oldTodo = TodosModel.getById(id);

  if (oldTodo) {
    const success = TodosModel.updateById(id, updatedTodo);

    return success ? updatedTodo : null;
  }

  return null;
};
const createTodo = (newTodo) => {
return TodosModel.createTodo(newTodo);
 };

module.exports = {
  getAll,
  getById,
  deleteById,
  updateById,
  createTodo,
};
