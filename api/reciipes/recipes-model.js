const db = require("../../data/db-config");

exports.getRecipeById = async (id) => {
  const recipe = await db
    .select("r.recipe_name", "r.recipe_creation_date", "s.*")
    .from("recipes as r")
    .join("steps as s", function () {
      this.on("r.recipe_id", "s.recipe_id");
    })
    .where("r.recipe_id", 2)
    .orderBy("s.step_number"); //query recipe and steps

  const reducedRecipe = recipe.reduce(
    (acc, step) => {
      if (!acc.recipe_id) {
        acc.recipe_id = step.recipe_id;
        acc.recipe_name = step.recipe_name;
        acc.recipe_creation_date = step.recipe_creation_date;
      }
      acc.steps.push({
        step_id: step.step_id,
        step_number: step.step_number,
        step_instructions: step.step_instructions,
      });
      return acc;
    },
    { steps: [] }
  ); //hammer recipe into single object
  //TODO account for recipe w/ no steps

  const stepIds = reducedRecipe.steps.map((s) => s.step_id); //map out step keys

  const quantities = await db("step_ingredient_quantities").whereIn(
    "step_id",
    stepIds
  ); //get quantities

  const ingredientIds = quantities
    .filter((quant, idx) => quantities.indexOf(quant) === idx)
    .map((quant) => quant.ingredient_id); //remove duplicate ingredients and isolate ids

  const ingredients = await db("ingredients").whereIn(
    "ingredient_id",
    ingredientIds
  ); // query ingredients

  const units = ingredients
    .filter((ingredient, idx) => ingredients.indexOf(ingredient) === idx)
    .map((ingredient) => ingredient.unit_id); //remove duplicate units and isolate ids

  return units;
};
