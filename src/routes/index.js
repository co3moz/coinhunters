const gluon = require('gluon');

const router = gluon.router();
const path = require('path')

router.use('/', function (req, res) {
    res.status(404).send('<img src="https://i.ytimg.com/vi/KuLFXr7OPpc/hqdefault.jpg">');
});

module.exports = router;