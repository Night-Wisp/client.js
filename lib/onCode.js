var data = require("./data");

exports = function(event, name, func) {
  func = func || name;
  var hasName = true;
  if (func == name) {
    hasName = false;
  }
  if (hasName && event == 'request') {
    if (name == "ping") { return; }
    var handlers = data.grab("handlers");
    handlers[name] = func;
    data.set("handlers", handlers);
  } else if (event == 'connect') {
    var connectors = data.grab("connectors");
    if (hasName) {
      connectors[name] = func;
    } else {
      connectors.general = func;
    }
    data.set("connectors", connectors);
  }
}
