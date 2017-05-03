const gluon = require('gluon');

const router = gluon.router();
const path = require('path')

router.use('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

module.exports = router;