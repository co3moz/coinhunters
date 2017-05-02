const gluon = require('gluon');
const control = require('gluon/control');
const Room = require('../../../models/room');
const User = require('../../../models/user');

const router = gluon.router();

router.get('/', function (req, res) {
    Room.all({
        attributes: [
            'id',
            'name',
            'opponentId',
            'challengerId',
            'status',
            'moveCount',
            'opponentCoin',
            'challengerCoin'
        ],
        where: {
            $or: [
                {
                    challengerId: req.user.id
                },
                {
                    opponentId: req.user.id
                }
            ]
        },
        limit: 20,
        offset: req.query.offset || 0,
        order: 'updatedAt desc'
    }).then(function (rooms) {
        res.ok(rooms);
    }).catch(res.database);
});

module.exports = router;