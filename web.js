//var static = require('node-static');
//
////
//// Create a node-static server instance to serve the './public' folder
////
//var file = new(static.Server)('./app');
//var port = process.env.PORT || 5000;
//require('http').createServer(function (request, response) {
//
//        //
//        // Serve files!
//        //
//        file.serve(request, response, function(err, result){
//            if(err && (err.status === 404)){
//                file.serveFile('/index.html', 200, {}, request, response);
//            }
//        })
//}).listen(port);
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express();

var samlValidate = function(req, res){

    var options = {
        host: 'https://sso.rumba.int.pearsoncmg.com',
        port: 443,
        path: '/sso/samlValidate?service=http://floating-peak-4593.herokuapp.com/findBook&ticket='+req.params.id,
        method: 'GET'
    };

    var req2 = http.get(options, function(res2) {
        var pageData = "";
        res2.setEncoding('utf8');
        res2.on('data', function (chunk) {
            pageData += chunk;
        });

        res2.on('end', function(){

            res.send(pageData);

        });
    });
}

// Configuration

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/app'));
    app.use(app.router);
});

//app.configure('development', function(){
//    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
//});
//
//app.configure('production', function(){
//    app.use(express.errorHandler());
//});

// Routes

app.get('/', routes.index);
app.get('/partials/:name', function (req, res) {
    var name = req.params.name;
    res.render('partials/' + name);
});

// JSON API

app.get('/api/validate/:id', samlValidate);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

// Start server

app.listen(3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});