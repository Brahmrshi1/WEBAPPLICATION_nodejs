const express = require('express');
const chalk = require('chalk');
const path = require('path');

const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));

app.set('views', './scr/views');
app.set('view engine', 'ejs');


// app.set('views', './scr/views');
// app.set('view engine', 'pug');


app.get('/', (req, res) => {
  res.render('new', { list: [{ link: '/home', title: 'Home' }, { link: '/band', title: 'Band' }, { link: '/tour', title: 'Tour' }, { link: '/contact', title: 'contact' }, { link: '/more', title: 'More' }] });
  // res.render('indext', });

  // using for normal
  //   res.sendFile(path.join(__dirname, 'view/index.html'));
});

app.listen(port, () => {
  console.log(`App is running on${chalk.green(port)}`);
});
