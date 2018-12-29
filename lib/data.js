var storage = require("./storage");

function getDataFile() {
  return storage.retrieve();
}

function setDataFile(file) {
  storage.store(file);
}

function grab(name) {
  var data = getDataFile() || {};
  try {
    return data[name];
  } catch(e) {
    console.log("ERROR: parameter " + name + " not set";
    return false;
  }
}

function set(name, data) {
  var d = getDataFile();
  d[name] = data;
  setDataFile(d);
}

exports.grab = grab;
exports.set = set;
