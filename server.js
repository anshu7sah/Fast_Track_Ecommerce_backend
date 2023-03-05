const app = require("./app");
const { mongoConnect } = require("./config/database");

//Handling unCaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Sutting dowm the server due to uncaught Exception`);
  process.exit(1);
});

//Config
require("dotenv").config({ path: "config/config.env" });
const DATABASE = process.env.DATABASE;

mongoConnect(DATABASE);
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//unHandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Sutting dowm the server due to unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
