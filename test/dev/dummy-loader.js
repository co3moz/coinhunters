var path = require('path');
var fs = require('fs');
var Promise = require("bluebird");
var readFile = Promise.promisify(require("fs").readFile);

var logger = require('gluon/logger');

module.exports = function (db) {
  logger.log('dummy sql loading.');

  return readFile(path.resolve(__dirname + '/dummy.sql')).then(function (data) {
    var sqls = data.toString();

    if (sqls.trim().length == 0) {
      logger.log('dummy sql is empty');
      return 'done';
    }

    sqls = sqls.replace(/_repeat\s*\(\s*(\d+)\s*(?:,\s*(\w+)\s*)?\)\s+([^;]+);/g, function (all, count, lookfor, statement) {
      if (lookfor)
        lookfor = new RegExp("\\b_" + lookfor + "\\b", "g");

      return ' '.repeat(count).split('').map(function (o, i) {
        if (!lookfor) {
          return statement;
        }
        return statement.replace(lookfor, i + 1) + ';';
      }).join(lookfor ? '\n' : '');
    });

    return db.query(sqls).then(function (data) {
      logger.log('dummy sql executed. {0} rows affected', data[0].map(function (t) {
        return t.affectedRows
      }).reduce(function (t, a) {
        return t + a;
      }));

      return 'done';
    }).catch(function (err) {
      logger.error('dummy sql cannot executed. {message}', err);
      return err;
    });
  }).catch(function (err) {
    logger.error('dummy sql cannot readed. {message}', err);
  });
};
