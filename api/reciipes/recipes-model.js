const db = require("../../data/db-config");

exports.getRecipeById = async (id) => {
  const recipe = await db
    .select("r.recipe_name", "r.recipe_creation_date", "s.*")
    .from("recipes as r")
    .join("steps as s", function () {
      this.on("r.recipe_id", "s.recipe_id");
    })
    .where("r.recipe_id", 2)
    .orderBy("s.step_number");

  const reducedRecipe = await recipe.reduce(
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
  );
  //TODO account for recipe w/ no steps

  const stepIds = reducedRecipe.steps.map((s) => s.step_id);

  const quantities = await db("step_ingredient_quantities").whereIn(
    "step_id",
    stepIds
  );

  // const ingredientIds = [...new Set(quantities.map((q)=>q.ingredient_id))]

  return quantities;
};
