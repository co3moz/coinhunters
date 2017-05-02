const gluon = require('gluon');

const router = gluon.router();

router.use('/', function (req, res) {
 res.notFound('unknown service');
});

module.exports = router;