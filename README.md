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

Set up the client's so going to any page on localhost:*portNumber* will open up a welcome screen but going to localhost:*portNumber*/goodbye will say goodbye.
```javascript
client.on("connect", function (req, res, callback) {
  callback({type: "text/html", code: 200, data: '<!DOCTYPE html><html lang="en-US"><head><title>Welcome</title></head><body><h1>Welcome!</h1></body></html>'});
  
client.on("connect", "/goodbye", function (req, res, callback) {
  callback({type: "text/html", code: 200, data: '<!DOCTYPE html><html lang"en-US"><head><title>Goodbye</title></head><body><h1>Goodbye!</h1></body></html>'});
});
```

Tell the client to listen to connections on port 8080.
```javascript
client.listen(8080);
```

Once you use the command line to start your script (`node testServer.js` if you named your file with the above code testServer.js), going to localhost:8080/goodbye will show:

# Goodbye!
----------

Where going to any other page on localhost:8080 will show:

# Welcome!
----------

# Internal functions

## Client() constructor
### on()
on() takes 3 arguments, an event, an optional name, and a function, so it looks like

on(*event*, [*name*,] *function*);

The event argument is a string, the supported values are:

* "connect"
* "request"

#### "connect"
If the name argument is specified, this will listen to any incoming http connections where the url after and including the first / is equal to the specified name and run the function argument.

If the name argument is not specified, this will listen to any incoming http connections where the url after and including the first / is **not** equal to the specified name of another on("connect") and run the function argument.


The function argument runs a function with 3 inputs, the http req data, the http res data, and a callback function.

The callback will take 1 input, an object with 3 properties, *type*, *code*, and *data*.

* The type property is the mime type of the returned data.
* The code property is the status code of the returned data.
* The data property is the data being returned to the connected client.

The callback function should only be called once, when you are done processing the input data and are ready to output the processed data, this function should not be called if you use the http res data to return your processed data.

#### "request"
This should always have a specified name, this will listen for data sent from the http client through the **server javascript object** from the HTML webpage.

The function argument will take 2 inputs, *data* and *callback*.

The data input will have the data sent rom the http client.

The callback function will be ran with 1 input, the data to send to the http client that requested the data.

### listen()
The listen function will make the server start listening, it has 4 inputs.

listen(*port*, *hostname*, *backlog*, *callback*);

All of these inputs are put directly into the http server object, so you can use the same inputs you use for an http server object without any wrappers as you use here.
