var restify = require('restify');
var server = restify.createServer();

server.use(restify.queryParser());
server.use(restify.bodyParser());

var table = {};

server.get('/v1/:name', (req, res, next) => {
    var name = req.params.name;
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    res.contentType = 'text/plain';
    console.log("Saved:", name, ip);
    table[name] = ip;
    
    res.send("ok");
});

server.get('/v1/:name/ip', (req, res, next) => {
    var name = req.params.name;
    res.contentType = 'text/plain';
    var reponse = table[name] || "error";
    console.log('Requested:', name, table[name]);
    res.send(reponse);
});


server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});