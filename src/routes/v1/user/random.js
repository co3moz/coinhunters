const Sequelize = require('sequelize');
const gluon = require('gluon');
const control = require('gluon/control');
const User = require('../../../models/user');

const router = gluon.router();

router.get('/', function (req, res) {
    User.all({
        attributes: [
            'id',
            'name'
        ],
        where: {
            id: {
                $not: req.user.id
            }
        },
        limit: 20,
        order: [
            [Sequelize.fn('RAND')]
        ]
    }).then(function (users) {
        res.ok(users);
    }).catch(res.database);
});


module.exports = router;