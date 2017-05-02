const gluon = require('gluon');
const control = require('gluon/control');
const Room = require('../../../../models/room');
const User = require('../../../../models/user');

const router = gluon.router();

router.get('/', function (req, res) {
    Room.find({
        where: {
            id: req.params.id,
            $or: [
                {
                    challengerId: req.user.id
                },
                {
                    opponentId: req.user.id
                }
            ]
        },
        include: [
            {model: User, as: 'opponent'},
            {model: User, as: 'challenger'}
        ]
    }).then(function (room) {
        res.ok(room);
    }).catch(res.database);
});

module.exports = router;