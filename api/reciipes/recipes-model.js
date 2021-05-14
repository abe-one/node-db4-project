const db = require("../../data/db-config");

exports.getRecipeById = (id) => {
  return db("recipes");
};
