const db = require("../../data/db-config");

exports.getRecipeById = async (id) => {
  // const recipeSteps = await
  return db
    .select("r.recipe_name", "r.recipe_creation_date", "s.*")
    .from("recipes as r")
    .join("steps as s", function () {
      this.on("r.recipe_id", "s.recipe_id");
    })
    .where("r.recipe_id", 2)
    .orderBy("s.step_number");

  // return recipeSteps;
};
