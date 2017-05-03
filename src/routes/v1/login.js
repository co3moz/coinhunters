const md5 = require('js-md5');
const gluon = require('gluon');
const control = require('gluon/control');
const User = require('../../models/user');

const router = gluon.router();

router.post('/', control(['email', 'password']), function (req, res) {
  User.find({
    where: {
      email: req.body.email,
      password: md5(req.body.password)
    }
  }).then(function (user) {
    if (user == null) return res.unauthorized('invalid credentials');

    return req.auth.login(user).then(function (token) {
      res.ok(token);
    });
  }).catch(res.database);
});

router.all('/', function (req, res) {
  res.redirectRequest('use post');
});

module.exports = router;