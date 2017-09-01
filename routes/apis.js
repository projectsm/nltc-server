var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

const { Pool } = require('pg');
const pool = new Pool({
	connectionString: 'postgres://khwzpithzjevpy:3c7811f7da0d3ce6c136bc2dc69fe22250995c9ccb44ebd729a655c34eee3c53@ec2-184-72-230-93.compute-1.amazonaws.com:5432/df55ih91c1b2cj'
});

/*################################# USERS ######################################*/

router.get('/users', function(req, res, next) {  
	pool.query('SELECT * FROM users')
	.then((data) => {
		res.json({
			status: 'success',
			data: data.rows,
			message: 'Retrieved all users'
		});
	})
	.catch((e) => {
		res.json({
			status: 'failed',
			data: [],
			message: 'Unable to retrieve user. '
		});		
	});	
});

router.get('/users/:id', function(req, res, next) {  
	var user_id = parseInt(req.params.id);
	pool.query('SELECT * FROM users WHERE id = $1', [user_id])
	.then((data) => {
		res.json({
			status: 'success',
			data: data.rows,
			message: 'Retrieved user'
		});
	})
	.catch((e) => {
		res.json({
			status: 'failed',
			data: [],
			message: 'Unable to retrieve user. '
		});		
	});	
});

router.post('/users', function(req, res, next) {
	// Note: use x-www-form-urlencoded in postman
	var user = {
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		contactnumber: req.body.contactnumber,
		username: req.body.username,
		password: req.body.password,
		type: req.body.type
	};	
	
	pool.query('INSERT INTO users (fitstname, lastname, contactnumber, username, password, type) VALUES ($1, $2, $3, $4, md5($5), $6)',[user.firstname, user.lastname, user.contactnumber, user.username, user.password, user.type])
	.then((data) => {
		res.json({
			status: 'success',
			data: {
				username: user.username,
				type: user.type
			},
			message: 'User has been successfully saved.'
		});
	})
	.catch((e) => {
		console.error(e.stack);
		res.json({
			status: 'failed',
			data: [],
			message: 'Unable to save user.'
		});		
	});
});

router.put('/users', function(req, res, next) {
	// Note: use x-www-form-urlencoded in postman
	var user = {
		id: req.body.id,
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		contactnumber: req.body.contactnumber,
		username: req.body.username,
		password: req.body.password,
		type: req.body.type
	};	
	
	pool.query('UPDATE users SET firstname=$1, lastname=$2, contactnumber=$3, username=$4, password=md5($5), type=$6 WHERE id=$7',[user.firstname, user.lastname, user.contactnumber, user.username, user.password, user.type, user.id])
	.then((data) => {
		res.json({
			status: 'success',
			data: {
				username: user.username,
				type: user.type
			},
			message: 'User has been successfully updated.'
		});
	})
	.catch((e) => {
		console.error(e.stack);
		res.json({
			status: 'failed',
			data: [],
			message: 'Unable to update user.'
		});		
	});
});

router.delete('/users', function(req, res, next) {
	// Note: use x-www-form-urlencoded in postman
	var user = {
		id: req.body.id
	};	
	
	pool.query('DELETE FROM users WHERE id=$1',[user.id])
	.then((data) => {
		res.json({
			status: 'success',
			data: user,
			message: 'User has been successfully removed.'
		});
	})
	.catch((e) => {
		console.error(e.stack);
		res.json({
			status: 'failed',
			data: [],
			message: 'Unable to remove user.'
		});		
	});
});

module.exports = router;
