// Using CommonJS syntax since this script is run by Node
// and CommonJS is Node's standard for importing/exporting.
const fs = require("fs");
const users = require("./src/mockData/usersMockData");

// Create a db.json file using the mockData provided.
// This way json-server has consistent data to serve upon app start.
function createDb(mockData, dbJsonFilePath, callback) {
  fs.writeFile(dbJsonFilePath, JSON.stringify(mockData), function(err) {
    if (err) return console.log(err);
    console.log("Mock DB created.");
    if (callback) callback();
  });
}

const data = {
  users
};

createDb(data, "./db.json");
