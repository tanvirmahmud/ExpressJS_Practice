const path = require("path");

// Find the main root directory
module.exports = path.dirname(process.mainModule.filename);
