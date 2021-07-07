const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv= require('dotenv');

dotenv.config({ path: './config/config.env'})

const app = express();

const dbURI = '<enter db credentials>';
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server running on port ${PORT}`));
