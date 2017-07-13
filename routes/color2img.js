var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
res.render('color2img', { title: '生成图片文件' });
});

module.exports = router;
