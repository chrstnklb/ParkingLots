var PouchDB = require('pouchdb');
var express = require('express');
var app = express();

app.use('/db', require('express-pouchdb')(PouchDB));
app.use('/utils', require('express-pouchdb')(PouchDB));

app.listen(3000);