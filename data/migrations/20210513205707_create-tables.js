exports.up = function (knex) {
  return knex.schema
    .createTable("recipes", (tbl) => {
      tbl.increments("recipe_id");
      tbl.string("recipe_name", 128).notNullable().unique();
      tbl.string("recipe_creation_date");
    })
    .createTable("units", (tbl) => {
      tbl.increments("unit_id");
      tbl.string("unit_singular_name", 128).notNullable().unique();
      tbl.string("unit_plural_name", 128).notNullable().unique();
    })
    .createTable("ingredients", (tbl) => {
      tbl.increments("ingredient_id");
      tbl.string("ingredient_name", 128).notNullable().unique();
      tbl
        .integer("unit_id")
        .unsigned()
        .notNullable()
        .references("unit_id")
        .inTable("units")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })
    .createTable("steps", (tbl) => {
      tbl.increments("step_id");
      tbl.string("step_name", 128).notNullable();
      tbl.integer("step_number").unsigned().notNullable();
      tbl.string("step_instructions", 280);
      tbl
        .integer("recipe_id")
        .unsigned()
        .notNullable()
        .references("recipe_id")
        .inTable("recipes")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("step_ingredient_quantities", (tbl) => {
      tbl.increments("step_ingredient_quantity_id");
      tbl
        .integer("ingredient_id")
        .unsigned()
        .notNullable()
        .references("ingredient_id")
        .inTable("ingredients")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("step_id")
        .unsigned()
        .notNullable()
        .references("step_id")
        .inTable("steps")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.integer("quantity").unsigned().notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExist("step_ingredient_quantities")
    .dropTableIfExist("steps")
    .dropTableIfExist("ingredients")
    .dropTableIfExist("recipes");
};
