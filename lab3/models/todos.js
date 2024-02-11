const { json } = require('express');
const fs = require('fs');

const getAll = () => {
  const todos = JSON.parse(fs.readFileSync('./todos.json'));
  return todos;
};

const getById = (id) => {
  const todos = getAll();
  const todo = todos.find((todo) => todo.id === id);
  return todo;
};

const deleteById = (id) => {
  let todos = getAll(); // am using let because todos is reassigined to new value
  todos = todos.filter((todo) => todo.id !== id);
  fs.writeFileSync('./todos.json', JSON.stringify(todos, null, 2));
};

const updateById = (id, updatedTodo) => {
  const todos = getAll();
  const index = todos.findIndex((todo) => todo.id === id);

  if (index !== -1) {
    todos[index] = { ...todos[index], ...updatedTodo };
    fs.writeFileSync('./todos.json', JSON.stringify(todos, null, 2));
    return true; // Successfully updated
  }
  return false; // Todo not found
};

const createTodo = (newTodo) => {
  const todos = getAll();
  newTodo.id = todos.length === 0 ? 1 : todos[todos.length - 1].id + 1;
  todos.push(newTodo);
  fs.writeFileSync('todos.json', JSON.stringify(todos, null, 2));
  return newTodo;
};
module.exports = {
  getAll,
  getById,
  deleteById,
  updateById,
  createTodo,
};
