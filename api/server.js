const express = require("express");
const { getRecipeById } = require("./reciipes/recipes-model");
const server = express();

// const recipeRouter = require("./recipes/recipe-router")

server.use(express.json());
// server.use('/api/recipes', recipeRouter)

server.use("/", (_req, res) => {
  getRecipeById().then((recipe) => res.send(recipe));
});

// eslint-disable-next-line no-unused-vars
server.use((err, _req, res, _next) => {
  res.status(err.status || 500).json({
    devNotes: "How do you eat an elephant?",
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
