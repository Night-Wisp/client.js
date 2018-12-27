var runHandlers = require("./runHandlerCode");
var getData = require("./getDataCode");
var url = require("url");
var data = require("./data");

exports = function(req, res) {
  var q = url.parse(req.url, true);
  var path = q.pathname;
  if (path == "/client/request/server/54193") {
    getData(req, function (d) {
      runHandlers(req, res, d);
    });
    return;
  }
  
  var connectors = data.grab("connectors");
  if (!connectors[path]) {
    path = "general";
  }
  
  if (connectors[path]) {
    connectors[path](req, res, function(data) {
      data.header = data.header || {};
      data.header['Content-Type'] = data.type;
      res.writeHead(data.code, data.header);
      res.write(data.data, 'binary');
      return res.end();
    });
  }
}
