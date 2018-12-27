var fs = require("fs");

function getDataFile() {
  try {
    return fs.readFileSync("./dataFile.json");
  } catch(e) {
    return "{}";
  }
}

function setDataFile(file) {
  fs.writeFile("./dataFile.json", file, function(err) {
    if (err) console.log(err);
  });
}

function grab(name) {
  var data = JSON.parse(getDataFile()) || {};
  try {
    return data[name];
  } catch(e) {
    console.log("ERROR: parameter " + name + " not set";
    return false;
  }
}

function set(name, data) {
  var d = JSON.parse(getDataFile());
  d[name] = data;
  setDataFile(JSON.stringify(d));
}

exports.grab = grab;
exports.set = set;
