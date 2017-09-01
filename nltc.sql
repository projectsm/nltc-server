create table users(
	id serial,
	firstname character varying(100),
	lastname character varying(100),
	contactnumber character varying(15),
	username character varying(50),
	password character varying(200),
	type character varying(25),
	primary key(id)
);

INSERT INTO users (firstname, lastname, contactnumber, username, password, type) VALUES('jason','lam','09111111111','jason',md5('jason'),'manager'); 
INSERT INTO users (firstname, lastname, contactnumber, username, password, type) VALUES('clyde','smith','09222222222','clyde',md5('clyde'),'supplier'); 
INSERT INTO users (firstname, lastname, contactnumber, username, password, type) VALUES('luie','lumanta','09333333333','luie',md5('luie'),'customer');

select * from users;

select * from users where username='jason' and password=md5('jason');