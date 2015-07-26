var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sample',function(req,res){
	res.render('sample',{title:"Sample"});
});

router.get('/history',function(req,res){
	res.render('history');
});
module.exports = router;
