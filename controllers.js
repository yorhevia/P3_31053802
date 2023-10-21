
const http = require('http');
const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

app.use(express.static(__dirname+'/static'));

app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
app.listen(5000);
console.log('Servidor corriendo exitosamente en el puerto 5000');

app.get('/',(req,res)=>{
res.render('index.ejs');
});
