module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "postgres",
  // PORT: 3333,
  DB: "primerafinalbackend",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
