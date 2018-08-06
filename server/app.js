let express = require('express');
let app = express();
global.Utils = require('./libs/utils.js');
global.ROOT_PATH = __dirname;
const config = require('./config/environments');
global.config = config;
const path = require('path');
const fs = require('fs');
//Configure application
require('./config/mongo');
require('./config/express')(app);

// require('./root-user');

app.use(express.static(path.join(__dirname, '../dist')));


const multer =require('multer');
//multer image store
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('file : ', file);
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    let splitFileName = file.originalname.split('.');
    file.originalname  = `${Math.random().toString(36).substring(2)}.${splitFileName[splitFileName.length-1]}`;
    cb(null, file.originalname);
  }
});

global.upload = multer({ storage: storage }).array('file', 1);
global.moreImagesUpload = multer({ storage: storage }).array('uploads[]', 12);


//Configure api routes authentication
app.use((req, res, next) => {
  if (req.path.indexOf('/apis') === 0) { // If request is starting with /apis, then apply authentication check
    next();
    if (req.session.isLoggedIn === 'Y') {

    } else {
      let secretKey = req.headers['X-SECRET-KEY'];
      let accessKey = req.headers['X-ACCESS-KEY'];
      let sessionToken = req.headers['X-SESSION-TOKEN'];

      // IMPLEMENT APP SPECIFIC AUTHENTICATION LOGIC
      next();
    }
  } else {
    next();
  }
});

let Api = require('./apis');
new Api(app);

let Module = require('./modules');
new Module(app);

module.exports = app;
