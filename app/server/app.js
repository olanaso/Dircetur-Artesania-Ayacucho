require('./config/config');
var express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const app = require('express')();
var path = require('path');

const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./routes');
/*Define la ruta de los archivos dentro del servidor*/
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

const sessionStore = new MySQLStore({
  host: 'database-1.ctm6s248ayce.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'IdeasSoft2024%',
  database: 'artesania'
});

/*Activando el uso de CORS*/


// Log requests to the console.
app.use(logger('dev'));
//app.use(cors)
app.use(require('express-status-monitor')());
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser());
/*Uso de las sessiones*/
/*app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
}));*/

app.use(session({
  key: 'session_cookie_name',
  secret: '2C44-4D44-WppQ38S',
  store: sessionStore,
  resave: false,  // si no hay cambios en la sesión, no guardarla de nuevo
  saveUninitialized: false  // si es una nueva sesión y no ha sido modificada, no guardarla
}));


/*Direccionamiento de la API*/
router(app);

/*Inicializar servidor*/

//app.set('port', process.env.PORT );
let port = 3002
app.listen(port, function () {
  console.log('Example app listening on port !' + port);
});