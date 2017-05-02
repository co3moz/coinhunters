var path = require('path');
var fs = require('fs');
var config = require('config');
var Promise = require("bluebird");
var readFile = Promise.promisify(require("fs").readFile);

var logger = require('gluon/logger');

module.exports = function (db) {
  logger.log('Before sync sql loading.');
  return readFile(path.resolve(__dirname + '/beforeSync.sql')).then(function (data) {
    var sqls = data.toString().replace("@DATABASE_NAME", config.get('database.database'));

    return db.query(sqls).then(function (data) {
      logger.log('beforeSync sql executed. {0} rows affected', data[0].map(function (t) {
        return t.affectedRows
      }).reduce(function (t, a) {
        return t + a;
      }));

      return 'done';
    }).catch(function (err) {
      logger.error('beforeSync sql cannot executed. {message}', err);
    });
  }).catch(function (err) {
    logger.error('beforeSync sql cannot readed. {message}', err);
  });
};
