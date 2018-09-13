const express = require('express'); // import express
const app = express(); // use function in express
const port = 3000; // custom port
const userDB = require('./db'); //use db from json file
const bodyParser = require('body-parser');// user html body
const fs = require('fs'); //file system 
const cors = require('cors');

app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
  }));

app.use(bodyParser.json()); // create json body html
app.use(bodyParser.urlencoded({ extended: true })); // create json form to send data

// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log('Web Api running on port \nlocalhost:'+port));

app.get('/key/:key',(req,res)=>{
    if(userDB.find(user => user.key === req.params.key))
    {
        res.json(userDB.find(user => user.key === req.params.key));
    }
    else
    {
        res.json(null);
    }
});

app.get('/user/:user',(req, res)=>{
    if(req.params.user == "all"){
        res.json(userDB);
        
    }
    else{
        // res.json(userDB[req.params.user]);
        res.json(userDB.find(user => user.user === req.params.user));
    }
    // var ResMessages = userDB.find(user => user.user === req.params.user);
    // res.json(books.find(book => book.id === req.params.id))
    // res.json(ResMessages);
    // res.send(req.params.user);
});

app.post('/user',(req,res)=>{
    if(userDB.find(user => user.user === req.body.user))
    {
        console.log("Data already Exits");
        res.send("Data already Exist");
    }
    else
    {
        userDB.push(req.body);
        var writebackDB = JSON.stringify(userDB);
        fs.writeFile('db.json', writebackDB, 'utf8');
        //api end
        
        res.status(201).json(req.body);
    }
    // console.log(userDB.find(user => user.user === req.body.user));
    // console.log(req.body.user);
    // userDB.push(req.body);
    // res.status(201).json(req.body);
    // var writebackDB = JSON.stringify(userDB);
    // fs.writeFile('db.json', writebackDB, 'utf8');
});

app.put('/user/:user',(req,res)=>{
    const updateIndex = userDB.findIndex(user => user.user === req.params.user);
    console.log(updateIndex);
    if(updateIndex < 0 )
    {
        res.send("No data");
    }
    else
    {
        var writebackDB = Object.assign(userDB[updateIndex],req.body);
        writebackDB = JSON.stringify(Object.assign(userDB,writebackDB));
        fs.writeFile('db.json', writebackDB, 'utf8');     
        //api end

        res.json(userDB);
    }
    


});

app.delete('/user/:id', (req, res) => {
    const deletedIndex = userDB.findIndex(user => user.user === req.params.id);
    console.log(deletedIndex);
    if(deletedIndex < 0)
    {
        res.send("No data");
    }
    else
    {
        userDB.splice(deletedIndex,1);
        var writebackDB = userDB;
        console.log(writebackDB);
        writebackDB = JSON.stringify(writebackDB);
        fs.writeFile('db.json',writebackDB,'utf8');
        // res.status(204).send()
        res.json(userDB);
    }

 })
 
// app.post('/login',function(req,res){
//     res.send(req.value);
// })

// app.post('/', function (req, res) {
//     res.send('Got a POST request')
// })
// app.put('/user', function (req, res) {
//     res.send('Got a PUT request at /user')
// })

// app.delete('/user', function (req, res) {
//     res.send('Got a DELETE request at /user')
// })