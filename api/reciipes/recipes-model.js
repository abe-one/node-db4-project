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

  const unitIds = ingredients
    .filter((igdnt, idx) => ingredients.indexOf(igdnt) === idx)
    .map((igdnt) => igdnt.unit_id); //remove duplicate units and isolate ids

  const units = await db("units").whereIn("unit_id", unitIds); //query units

  const fullIngredients = ingredients.map((igdnt) => {
    igdnt.unit = units.find((unit) => unit.unit_id === igdnt.unit_id);
    delete igdnt.unit_id;
    return igdnt;
  }); //hammer full ingredients

  const fullQuantities = quantities.map((quant) => {
    const igdnt = fullIngredients.find(
      (igdnt) => igdnt.ingredient_id === quant.ingredient_id
    );
    const fullQuant = { ...quant, ...igdnt };
    return fullQuant;
  }); //hammer full quantities

  const fullRecipe = reducedRecipe.steps.map((step) => {
    const ingredients = fullQuantities.filter((quant) => {
      quant.step_id === step.step_id;
      return quant;
    });
    step.ingredients = ingredients;
    return step;
  });

  return fullRecipe;
};
