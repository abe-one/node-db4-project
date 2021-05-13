const sharedConfig = {
  useNullAsDefault: true,
  migrations: {
    directory: "./data/migrations",
  },
  seeds: {
    directory: "./data/seeds",
  },
};

module.exports = {
  development: {
    ...sharedConfig,
    client: "sqlite3",
    connection: {
      filename: "./data/recipes.db3",
    },
  },
};
