const md5 = require('js-md5');
const gluon = require('gluon');
const control = require('gluon/control');
const User = require('../../models/user');

const router = gluon.router();

router.post('/', control(['email', 'password', 'name']), function (req, res) {
  User.find({
    where: {
      $or: [
        {
          email: req.body.email
        },
        {
          name: req.body.name
        }
      ]

    }
  }).then(function (user) {
    if (user != null) return res.unauthorized('this account is already registered, try something else');

    User.create({
      email: req.body.email,
      password: md5(req.body.password),
      name: req.body.name
    }).then(res.ok)
      .catch(res.database);;
  }).catch(res.database);
});

router.all('/', function (req, res) {
  res.redirectRequest('use post');
});

module.exports = router;