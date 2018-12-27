var data = require("./data");

exports = function(req, res, data1) {
  var err = false;
  var handlers = data.grab("handlers");
  
  if (!handlers[data1.name]) {
    err = "ERROR: No such handler as " + data1.name;
    return handlers[data1.name] (false, function() {}, err);
  }
  
  handlers[data1.name] (JSON.parse(data1.data), function(d) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(JSON.stringify(d));
    res.end();
  }, err);
}
