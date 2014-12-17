// Tile server using the node web framework Express (http://expressjs.com).
// Inspiration: https://gist.github.com/kapouer/2956825
var express = require('express');
var tilelive = require('tilelive');
var mapnik = require('tilelive-mapnik');
mapnik.registerProtocols(tilelive);

var app = express();

var filename = __dirname + '/' + 'stylesheet.xml';
tilelive.load('mapnik://' + filename, function (err, source) {
  if (err) throw err;

  app.get('/:z/:x/:y.*', function(req, res) {
    source.getTile(req.param('z'), req.param('x'), req.param('y'), function(err, tile, headers) {
      // `err` is an error object when generation failed, otherwise null.
      // `tile` contains the compressed image file as a Buffer
      // `headers` is a hash with HTTP headers for the image.
      if (err) {
        return res.send('Tile rendering error: ' + err + '\n');
      }

      res.set('Content-Type', 'image/png');
      return res.send(tile);
    });
  });
});

var server = app.listen(8888, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})
