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
    client: "sqlite3",
    connection: {
      filename: "./data/recipes",
    },
  },
};
