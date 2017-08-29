var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  pokemon = require('./entities/pokemon'), //created model loading here
  skill = require('./entities/skill'), //created model loading here
  user = require('./entities/user'), //created model loading here
  team = require('./entities/team'), //created model loading here

  bodyParser = require('body-parser');
  
// mongoose instance connection url connection
mongoose.Promise = global.Promise;

var uri = "mongodb://eckounltd:cefet123@custerpokemon-shard-00-00-zznsg.mongodb.net:27017,custerpokemon-shard-00-01-zznsg.mongodb.net:27017,custerpokemon-shard-00-02-zznsg.mongodb.net:27017/pokedeck?ssl=true&replicaSet=CusterPokemon-shard-0&authSource=admin";
mongoose.connect(uri); 

var cookieParser = require('cookie-parser');
var session = require('express-session');



app.use(cookieParser());
app.use(session({
    secret: "fd34s@!@dfa453f3DF#$D&W",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: !true }
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routesPokemon = require('./routes/pokemonRoutes'); //importing route
var routesSkill = require('./routes/skillRoutes'); //importing route
var routesUser = require('./routes/userRoutes'); //importing route
var routesTeam = require('./routes/teamRoutes'); //importing route
var routesDefault = require('./routes/defaultRoutes'); //importing route
var routesLogin = require('./routes/loginRoutes'); //importing route
var routesHome = require('./routes/homeRoutes'); //importing route

routesTeam(app); //register the route
routesPokemon(app); //register the route
routesSkill(app); //register the route
routesUser(app); //register the route
routesDefault(app);
routesLogin(app);
routesHome(app);

/*app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});*/

var path = require('path');

app.use('/content',express.static(path.join(__dirname, 'content')));
app.use('/scripts',express.static(path.join(__dirname, 'scripts')));
app.use('/fonts',express.static(path.join(__dirname, 'fonts')));

app.engine('html', require('ejs').renderFile);

require("openurl").open("http://localhost:"+port.toString()+"/");

app.listen(port);
