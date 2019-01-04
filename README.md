# nodejs-client
nodejs-client is a NodeJS http handler that makes NodeJS WebServers easier to make

## Using the client
Grab the client creator.
```javascript
var Client = require('nodejs-client').Client;
```

Create the client (notice the capitalization difference).
```javascript
var client = new Client();
```

Set up the client's so going to any page will open up a welcome screen but going to /goodbye will say goodbye.
```javascript
client.on("connect", function (req, res, callback) {
  callback({type: "text/html", code: 200, data: '<!DOCTYPE html><html lang="en-US"><head><title>Welcome</title></head><body><h1>Welcome!</h1></body></html>'});
});
```
