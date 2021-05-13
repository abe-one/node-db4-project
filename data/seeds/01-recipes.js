exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("recipes").insert([
    {
      recipe_name: "Hot Water",
      recipe_creation_date: new Date().toISOString(),
    },
  ]);
};
