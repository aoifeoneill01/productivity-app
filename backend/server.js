const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const DBURI = process.env.DBURI;

const app = express();

const dbURI = DBURI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => console.log('connected to db'))
.catch((err) => console.log(err));

app.use(cors());
app.use(express.json());
app.use('/', require('./routes/todoRoute'));
app.use('/', require('./routes/habitRoute'));
app.use('/', require('./routes/journalRoute'));
app.use('/', require('./routes/noteRoute'));
app.use('/', require('./routes/boardRoute'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, console.log(`server running on port ${PORT}`));
