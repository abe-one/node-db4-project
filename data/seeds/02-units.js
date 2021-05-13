exports.seed = function (knex) {
  return knex("units").insert([
    {
      unit_singular_name: "cup",
      unit_plural_name: "cups",
    },
    {
      unit_singular_name: "egg",
      unit_plural_name: "eggs",
    },
  ]);
};
