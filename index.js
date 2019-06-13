const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SEL_ALL_PRODS_QUERY = 'SELECT * FROM import';

const connection = mysql.createConnection({
	host:'localhost',
	user: 'root',
	password: 'dirtyhands',
	database: 'coding_challenge'
});

connection.connect(err => {
	if(err){
		console.log(err);
	}
	else{
		console.log('Connected to the MySQL server');
	}
});


app.use(cors());


app.get('/', (req,res) => {
	res.send('go to /import to see import file')
});

//get all entries
app.get('/import', (req,res) =>{
	connection.query(SEL_ALL_PRODS_QUERY, (err,results) => {
		if(err) {
			return res.send(err)
		}
		else{
			return res.json({
			 data: results
			})
		}
	});
});


//add new entry
app.get('/import/add/', (req,res) => {
	const {title, description, author, tags, created_at, updated_at} = req.query;
	const INSERT_PRODUCTS_QUERY = `INSERT INTO import (title, description, author, tags, created_at, updated_at) VALUES('${title}', '${description}','${author}', '${tags}','${created_at}','${updated_at}')`;
	connection.query(INSERT_PRODUCTS_QUERY, (err,results) => {
		if(err){
			return res.send(err)
		}
		else{
			return res.send('successfully added')
		}
	});
	
});

//update an entry title
app.get('/import/update_title/', (req,res) =>{
	const { Id, title} = req.query;
	const UPDATE_OBJECT_QUERY = `UPDATE import SET title = '${title}' WHERE Id = '${Id}'`; 
	connection.query(UPDATE_OBJECT_QUERY , (err,results) => {
		if(err){
			return res.send(err)
		}
		else{
			return res.send('succesfully updated title')
		}
	});
});

app.get('/import/update_description/', (req,res) =>{
	const { Id, description} = req.query;
	const UPDATE_OBJECT_QUERY = `UPDATE import SET description = '${description}' WHERE Id = '${Id}'`; 
	connection.query(UPDATE_OBJECT_QUERY , (err,results) => {
		if(err){
			return res.send(err)
		}
		else{
			return res.send('succesfully updated description')
		}
	});
});

app.get('/import/update_author/', (req,res) =>{
	const { Id, author} = req.query;
	const UPDATE_OBJECT_QUERY = `UPDATE import SET author = '${author}' WHERE Id = '${Id}'`; 
	connection.query(UPDATE_OBJECT_QUERY , (err,results) => {
		if(err){
			return res.send(err)
		}
		else{
			return res.send('succesfully updated author')
		}
	});
});

app.get('/import/update_tags/', (req,res) =>{
	const { Id, tags} = req.query;
	const UPDATE_OBJECT_QUERY = `UPDATE import SET tags = '${tags}' WHERE Id = '${Id}'`; 
	connection.query(UPDATE_OBJECT_QUERY , (err,results) => {
		if(err){
			return res.send(err)
		}
		else{
			return res.send('succesfully updated tags')
		}
	});
});

app.get('/import/update_created/', (req,res) =>{
	const { Id, created_at} = req.query;
	const UPDATE_OBJECT_QUERY = `UPDATE import SET created_at = '${created_at}' WHERE Id = '${Id}'`; 
	connection.query(UPDATE_OBJECT_QUERY , (err,results) => {
		if(err){
			return res.send(err)
		}
		else{
			return res.send('succesfully updated creation date')
		}
	});
});

app.get('/import/update_updated/', (req,res) =>{
	const { Id, updated_at} = req.query;
	const UPDATE_OBJECT_QUERY = `UPDATE import SET updated_at = '${updated_at}' WHERE Id = '${Id}'`; 
	connection.query(UPDATE_OBJECT_QUERY , (err,results) => {
		if(err){
			return res.send(err)
		}
		else{
			return res.send('succesfully updated updated date')
		}
	});
});



//delete entry by id number
app.get('/import/delete/', (req,res) =>{
	const {Id} = req.query;
	const DELETE_OBJECT_QUERY = `DELETE FROM import WHERE Id = '${Id}'`; 
	connection.query(DELETE_OBJECT_QUERY, (err,results) => {
		if(err) {
			return res.send(err)
		}
		else {
			return res.send('deleted successfully');
		}
	});
});


//get specific entry by id number
app.get('/import/get/:Id', (req,res) =>{
	connection.query('SELECT * FROM import WHERE Id = ?',[req.params.Id], (err,results) => {
		if(err) {
			return res.send(err)
		}
		else{
			return res.json({
			 data: results
			})
		}
	});
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`Listening on port ${port}`)
});