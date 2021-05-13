exports.seed = function (knex) {
  return knex("steps").insert([
    {
      step_number: 1,
      step_instructions: "Pour water in pot",
      recipe_id: 1,
    },
    {
      step_number: 2,
      step_instructions: "Heat until it looks alive",
      recipe_id: 1,
    },
    {
      step_number: 1,
      step_instructions: "Place all ingredients in pot",
      recipe_id: 2,
    },
    {
      step_number: 2,
      step_instructions: "Heat until it looks alive",
      recipe_id: 2,
    },
    {
      step_number: 3,
      step_instructions: "Wait 10 minutes",
      recipe_id: 2,
    },
    {
      step_number: 4,
      step_instructions: "Remove shell without burning yourself",
      recipe_id: 2,
    },
  ]);
};
