var express = require('express');
var router = express.Router();


router.get('/history',function(req,res){
	if(req.query.location != null ){
		var db = req.db;
		var collection = db.get("history");
		collection.findOne({"location":req.query.location},function(error,document){
			if(error){
				console.log("Error in Fetching History data");
			}
			else{
				if(document != null){
					console.log("History Exist");
					res.send(document);
				}
				else{
					console.log("History Doesn't Exist");
				}
			}
		});
		console.log(req.query);	
	}
	else{
		console.log("Param Empty");
	}
});

router.post('/postHistory',function(req,res){
	if(req.body.history != null){
		console.log(req.body);
	}
	else{
		console.log("History Body Is Empty");
	}
});

module.exports = router;
