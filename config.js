var config = {
  development: {
    database: {
      host: "localhost",
      port: "3306",
      db: "CODEGAME",
      userName: "nodeprocess",
      password: "node",
    },
    app: {
      port: 3000,
    },
  },
  production: {
    database: {
      host: "localhost",
      port: "3306",
      db: "CODEGAME",
      userName: "root",
      password: "Welcome@123",
    },
    app: {
      port: 4000,
    },
  },
};
module.exports = config;
