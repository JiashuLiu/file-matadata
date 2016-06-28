var express = require("express");
var app = express();
var multer = require('multer');
var path = require('path');
var fs =require('fs');
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads');
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({
  storage: storage
}).single('userFile');

app.post('/api/file', function(req, res) {
  upload(req, res, function(err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    res.json({
      name: req.file.originalname,
      size: req.file.size,
      date: new Date().toLocaleString(),
      file: req.file.filename
    });
      fs.unlink('./' + req.file.path);
  });

});

app.listen(3000, function() {
  console.log("Working on port 3000");
});
