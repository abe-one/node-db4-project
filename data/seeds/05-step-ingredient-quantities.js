exports.seed = function (knex) {
  return knex("step_ingredient_quantities").insert([
    {
      ingredient_id: 1,
      step_id: 1,
      step_ingredient_quantity: 1,
    },
    {
      ingredient_id: 1,
      step_id: 3,
      step_ingredient_quantity: 1,
    },
    {
      ingredient_id: 2,
      step_id: 3,
      step_ingredient_quantity: 1,
    },
  ]);
};
