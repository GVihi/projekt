const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 8000 || process.env;
const databaseConnection = require('./util/databaseConnection');

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(function (req, res, next) {
    res.setHeader(
        'Content-Security-Policy-Report-Only',
        "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
    );
    next();
});


const usersRoutes = require('./routes/userRoutes');
const photosRoutes = require('./routes/photoRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.use('/users', usersRoutes);
app.use('/admin', adminRoutes);
app.use('/photos', photosRoutes);


app.listen(port, function () {
    console.log('Server is working on port: ' + port);
});