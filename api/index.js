const db = require("../src/db/index");
const app = require("../src/App");

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    await db();
    isConnected = true;
  }
  return app(req, res);
};
