var httpserver = require('http').createServer(require("lib/HTTPServerCode"));

var on = require("lib/onCode");
var dataGet = require("lib/data");

dataGet.set("handlers", {ping: function(data) {
  return data;
}
});

function listen(port, hostname, backlog, callback) {
  httpserver.listen(port, hostname, backlog, callback);
}

exports.listen = listen;
exports.on = on;
