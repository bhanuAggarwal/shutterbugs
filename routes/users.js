var express = require('express');
var router = express.Router();
var sess;
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/userLogin',function(req,res){
	sess = req.session;
	console.log(req.body);

	var db = req.db;
	var collection = db.get("users");
	collection.findOne({"email":req.body.email},function(error,document){
		if(error){
			console.log("Error While Checking for User");
		}
		else{
			sess.email = req.body.email;
			console.log(document);
			if(document != null){
				console.log("User Exist");
				res.send("User Exist");
			}
			else{
				console.log("New User");
				collection.insert(req.body,function(error,doc){
					if(error){
						res.send("Error While Adding user To DataBase");
					}
					else{
						res.send("User Added Successfully");
					}
				});
			}
		}
	});
});

router.post('/checkLogin',function(req,res){
	session = req.session;
	if(req.body.email != null){
		var db = req.db;
		var collection = db.get("users");
		console.log(req.body);
		collection.findOne(req.body,
			function(error , document){
				if(error){
					console.log("Fault while quering DataBase");
				}
				else{
					if(document != null){
						var msg = "User Login Successful";
						session.email = req.body.email;
						console.log(session);
						console.log(msg);
						res.send(document);
					}
					else{
						var msg = "Invalid Username or Password";
						console.log(msg);
						res.send(msg);
					}
				}
			});
	}
	else{
		console.log("Param are Empty");
	}

});

router.get('/getUser',function(req,res){
	session = req.session;
	console.log(session);
	var db = req.db;
	var collection = db.get("users");
	if(session != null){
		collection.find({"email":session.email},function(error,document){
			if(error){
				console.log("Fault While Quering DataBase");
			}
			else{
				res.send(document);
			}
		});
	}
	else{
		console.log("Session is Null");
	}
});

router.post('/addLocation',function(req,res){
	session = req.session;
	var db = req.db;
	var collection = db.get("users");
	collection.update({"email":session.email},{$set:req.body},function(error,document){
		if(error){
			console.log("Error While  Updating User Location");
		}	
		else{
			var msg = "Location Added Successfully";
			console.log(msg);
			res.send(msg);
		}
	});
});
module.exports = router;
