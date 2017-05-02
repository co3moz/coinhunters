var app;

var request = require('request');
var config = require('config');
var chai = require('chai');
var baseUrl = 'http://localhost:' + config.get('port') + '/';

var assert = chai.assert,
  expect = chai.expect;

describe('Api', function () {
  this.timeout(60000);

  it('should stay without error', function (done) {
    app = require('../src/app');
    setTimeout(done, 3000);
  });


  var dogan;
  var goksel;
  it('v1/login', function (done) {
    request({
      method: 'POST',
      url: baseUrl + 'v1/login',
      body: {
        email: "doganderya59@gmail.com",
        password: "1"
      },
      json: true

    }, function (err, res, body) {
      if (err || res.statusCode != 200) {
        done(new Error(JSON.stringify(body)))
        return;
      }

      console.log(JSON.stringify(body));
      dogan = body;
      done();
    });
  });

  it('v1/user/online', function (done) {
    request({
      method: 'GET',
      url: baseUrl + 'v1/user/online',
      headers: {
        'Token': dogan.code
      },
      json: true
    }, function (err, res, body) {
      if (err || res.statusCode != 200) {
        done(new Error(JSON.stringify(body)))
        return;
      }

      console.log(JSON.stringify(body));
      done();
    });
  });

  it('v1/user/random', function (done) {
    request({
      method: 'GET',
      url: baseUrl + 'v1/user/random',
      headers: {
        'Token': dogan.code
      },
      json: true
    }, function (err, res, body) {
      if (err || res.statusCode != 200) {
        done(new Error(JSON.stringify(body)))
        return;
      }

      console.log(JSON.stringify(body));
      done();
    });
  });

  it('v1/user/search', function (done) {
    request({
      method: 'POST',
      url: baseUrl + 'v1/user/search',
      body: {
        name: 'gox'
      },
      headers: {
        'Token': dogan.code
      },
      json: true
    }, function (err, res, body) {
      if (err || res.statusCode != 200) {
        done(new Error(JSON.stringify(body)))
        return;
      }

      goksel = body[0];

      console.log(JSON.stringify(body));
      done();
    });
  });


  it('v1/room/active', function (done) {
    request({
      method: 'GET',
      url: baseUrl + 'v1/room/active',
      headers: {
        'Token': dogan.code
      },
      json: true
    }, function (err, res, body) {
      if (err || res.statusCode != 200) {
        done(new Error(JSON.stringify(body)))
        return;
      }

      console.log(JSON.stringify(body));
      done();
    });
  });

  var room;
  it('v1/room/create', function (done) {
    request({
      method: 'POST',
      url: baseUrl + 'v1/room/create',
      body: {
        name: 'life is beatiful',
        opponentId: goksel.id
      },
      headers: {
        'Token': dogan.code
      },
      json: true
    }, function (err, res, body) {
      if (err || res.statusCode != 200) {
        done(new Error(JSON.stringify(body)))
        return;
      }

      room = body;

      console.log(JSON.stringify(body));
      done();
    });
  });


  it('v1/room/info', function (done) {
    request({
      method: 'GET',
      url: baseUrl + 'v1/room/info/' + room.id,
      headers: {
        'Token': dogan.code
      },
      json: true
    }, function (err, res, body) {
      if (err || res.statusCode != 200) {
        done(new Error(JSON.stringify(body)))
        return;
      }

      console.log(JSON.stringify(body));
      done();
    });
  });

});