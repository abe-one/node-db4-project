exports.seed = function (knex) {
  return knex("recipes").insert([
    {
      recipe_name: "Hot Water",
      recipe_creation_date: new Date().toISOString(),
    },
    {
      recipe_name: "Hard-Boiled Egg",
      recipe_creation_date: new Date().toISOString(),
    },
  ]);
};
