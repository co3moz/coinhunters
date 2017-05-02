const md5 = require('js-md5');
const gluon = require('gluon');
const control = require('gluon/control');

const User = require('../../../models/user');
const Room = require('../../../models/room');
const router = gluon.router();

router.post('/', control(['name', 'opponentId']), function (req, res) {
  User.find({
    attributes: [
      'id'
    ],
    where: {
      id: req.body.opponentId
    }
  }).then((user) => {
    if (!user) {
      return res.notFound('invalid opponentId');
    }

    if (user.id == req.user.id) {
      return res.notFound('cant play yourself');
    }

    Room.create({
      name: req.body.name,
      challengerId: req.user.id,
      opponentId: req.body.opponentId,
      ground: '?'.repeat(400)
    }).then((room) => {
      res.ok(room);
    }).catch(res.database);
  }).catch(res.database);
});

router.all('/', function (req, res) {
  res.redirectRequest('use post');
});

module.exports = router;