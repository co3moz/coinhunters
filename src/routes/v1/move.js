const md5 = require('js-md5');
const gluon = require('gluon');

const User = require('../../models/user');
const Room = require('../../models/room');
const router = gluon.router();

var live = [];
io.on('connection', function (socket) {
  var token;
  var userId;
  var user;

  socket.on('alive', function (info) {
    token = info.token;
    userId = info.userId;


    // TODO: use gluon to find token
    User.find({
      where: {
        id: userId
      }
    }).then(function (u) {
      user = u;

      live.push({ userId: userId, socket: socket });

      user.online = true;
      user.save();
    });
  });

  //roomId
  //content
  socket.on('move', function (message) {
    // TODO: üyeleri gruba yaz socket.join
    console.log(message);

    Room.find({
      where: {
        id: message.roomId
      }
    }).then(function (room) {
      if (room.status == 'FINISHED') {
        return;
      }
      if (room.status == 'CHALLENGER' && userId != room.challengerId) {
        return;
      }
      else if (room.status == 'OPPONENT' && userId != room.opponentId) {
        return;
      }

      var t = room.ground.charAt(message.fieldId);

      if (t != '?') {
        return;
      }

      var mt = Math.random() > 0.5 ? 'G' : 'C';

      if (mt == 'C') {
        if (room.challengerId == userId) {
          room.challengerCoin += 1;
        } else {
          room.opponentCoin += 1;
        }
      }

      room.ground = room.ground.substring(0, +message.fieldId) + mt + room.ground.substring(+message.fieldId + 1);
      room.status = room.status == 'CHALLENGER' ? 'OPPONENT' : 'CHALLENGER';

      if (room.ground.indexOf('?') == -1) {
        room.status = 'FINISHED';
      }
      room.save().then(function () {
        [room.challengerId, room.opponentId].forEach(function (participant) {
          var item = live.find(function (obj) {
            return obj.userId == participant
          });

          if (item != null) {
            item.socket.emit('move', {
              room: {
                id: room.id,
                name: room.name
              },
              user: {
                id: user.id,
                name: user.name
              },
              fieldId: message.fieldId,
              data: mt
            });
          }
        });

      });
    });
  });

  socket.on('disconnect', function () {
    if (user) {
      user.online = false;
      user.save();
    }

    for (var i = 0; i < live.length; i++) {
      if (live[i].socket == socket) {
        live.splice(i);
        i--;
      }
    }
  });
});

router.all('/', function (req, res) {
  res.redirectRequest('only socket');
});

module.exports = router;