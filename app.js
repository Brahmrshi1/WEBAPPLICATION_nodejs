
const express = require('express');
const chalk = require('chalk');
const path = require('path');
const body_parser = require('body-parser');
const passport = require('passport');
const cookie_parser=require('cookie-parser');
const session = require('express-session');

const dbconfig = require('./public/config/database_config');
// const debug = require('debug')(app);


// route for site

const homerouter = require('./scr/route/home_route');
const bandrouter = require('./scr/route/band_route');
const tourrouter = require('./scr/route/tour_route');
const contactrouter = require('./scr/route/contact_route');
const authroute = require('./scr/route/auth');
const port = process.env.PORT || 3000;

 
const app = express();

app.use(body_parser.json()); 
app.use(body_parser.urlencoded({extended:false}));
app.use(cookie_parser());
app.use(session({secret:'exjs'}));
require('./public/config/passport')(app);

app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.set('views', './scr/views');
app.set('view engine', 'ejs');


// app.set('views', './scr/views');
// app.set('view engine', 'pug');

app.use('/', homerouter);
app.use('/', bandrouter);
app.use('/', tourrouter);
app.use('/', contactrouter);
app.use('/auth', authroute);


app.get('/', (req, res) => {
  res.render('home', { list: [{ link: '/home', title: 'Home' }, { link: '/band', title: 'Band' }, { link: '/tour', title: 'Tour' }, { link: '/contact', title: 'contact'}, {link:'/auth/signin',title:'Sign in'}, {link:'/auth/signup',title:'Sign up'} ] });
  // res.render('indext', });

  // using for normal
  //   res.sendFile(path.join(__dirname, 'view/index.html'));
}); 

app.listen(port, () => {
  console.log(`App is running on${chalk.green(port)}`);
});
 