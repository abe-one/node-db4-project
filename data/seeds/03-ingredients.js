exports.seed = function (knex) {
  return knex("ingredients").insert([
    {
      ingredient_name: "water",
      unit_id: 1,
    },
    {
      ingredient_name: "eggs",
      unit_id: 2,
    },
  ]);
};
