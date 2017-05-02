const gluon = require('gluon');
const control = require('gluon/control');
const User = require('../../../models/user');

const router = gluon.router();

router.post('/', control(['name']), function (req, res) {
    User.all({
        attributes: [
            'id',
            'name'
        ],
        where: {
            name: {
                $like: '%' + req.body.name + '%'
            }
        },
        limit: 20
    }).then(function (users) {
        res.ok(users);
    }).catch(res.database);
});

router.all('/', function (req, res) {
    res.redirectRequest('use post');
});


module.exports = router;