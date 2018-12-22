var formidable = require('formidable');
var fs = require('fs');
var url = require('url');
var http = require('http');

var handlers = {};
var connectors = {};
var httpserver;

handlers["ping"] = function(data) {
  return data;
};

function listen(port, ip, heart, callback) {
  httpserver = http.createServer(selfServer);
  httpserver.listen(port, ip, heart, callback);
}

function selfServer(req, res) {
  var q = url.parse(req.url, true);
  var path = q.pathname;
  if (path == "/client/request/server/54193") {
    getData(req, function (d) {
      runHandlers(req, res, d);
    });
    return;
  }

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

function getData(req, callback) {
  var data1 = {};
  var form = new formidable.IncomingForm();
  form.uploadDir = "./";
  form.keepExtensions = true;
  form.type = 'urlencoded';
  form.on('file', function(name, file) {
    fs.unlink(form.uploadDir + file.path, function(err) {
      if (err) throw err;
    });
  });
  form.on('field', function(name, field) {
    data1[name] = field;
  });
  form.on('error', function(err) {
    throw err;
    next(err);
  });
  form.on('end', function() {
    callback(data1);
  });
  form.parse(req, function (err, fields, files) {
    if (err) throw err;
  });
}

function runHandlers(req, res, data) {
  var err = false;
  if (!handlers[data.name]) {
    err = "ERROR: No such handler as " + data.name;
    console.log("BAD REQUEST: No Name" + err);
  }

  handlers[data.name] (JSON.parse(data.data), function(d) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(JSON.stringify(d));
    res.end();
  }, err);
}

function on(event, name, func) {
  func = func || name;
  var hasName = true;
  if (func == name) {
    hasName = false;
  }
  if (hasName && event == 'request') {
    if (name == "ping") { return; }
    handlers[name] = func;
  } else if (event == 'connect') {
    if (hasName) {
      connectors[name] = func;
    } else {
      connectors.general = func;
    }
  }
}

exports.listen = listen;
exports.on = on;
