// Second Server
const express = require('express');
const app = express();
const server = require('http').Server(app);
const cors = require('cors');
const path = require('path');app.use('*', cors());
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongo = require('mongodb');

// requiring routes!
const add_money = require('./routes/add_money');
const remove_money = require('./routes/remove_money');

const whitelist = ['http://localhost:8025', 'http://127.0.0.1:8025']
const corsOptions = {    
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


//express settings
app.use(cors(corsOptions));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.options(cors(corsOptions));
app.set('view engine', 'ejs');

// mongoDB Schema and Connection;
const basicSchema = {
    title: 'wallet',
    amount: 0, // initial amount will be zero!
}

var mongooseUrl = 'mongodb://127.0.0.1:27017/wallet';
mongo.connect(mongooseUrl, function(err, db){
    if(err) throw err;
    db.createCollection('wallet',basicSchema);
    db.close();
    console.log('wallet collection created!');
})

//routes  // routes
app.use('/add_money', add_money);
app.use('/remove_money', remove_money);

server.listen(9000, function(){
    console.log("BetaService2 microservice is now Running");
});

module.export = app;

