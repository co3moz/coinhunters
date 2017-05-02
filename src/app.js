delete process.env.DEBUG_FD;

var gluon = require('gluon');
var config = require('config');
var cluster = require('cluster');
var logger = require('gluon/logger');
var test;

logger.set('worker_id', cluster.worker ? cluster.worker.id : '#');

switch (process.env.NODE_ENV) {
  case 'development' :
    test = true;
    logger.log('Developer environment');
    break;

  case 'production' :
    test = false;
    logger.log('Production environment');
    break;
  default:
    test = false;
    logger.log('No env setting. Production environment');
}

var db = require('gluon/db');


var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

global.io = io; // harcoded
module.exports = gluon({
  app: app,
  ready: function (app, logger) {
    if (test == true) {
      logger.log('Database dropping and creating new one');
      require('../test/dev/before-sync')(db).then(function () {
        db.sync({force: true}).then(function () {
          logger.log('Sync ended. Dummy loader executing');
          require('../test/dev/dummy-loader')(db).then(function (status) {
            if(status != 'done') {
              process.exit(1);
            }

            http.listen(config.get('port'));
          });
        });
      });
    } else {
      http.listen(config.get('port'));
    }
  }
});