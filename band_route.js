const express = require('express');
const bandrouter = express.Router();

const app = express();


bandrouter.route('/band')
.all((req,res,next)=>{
  if(req.user){
    res.render('band', { list: [{ link: '/home', title: 'Home' }, { link: '/band', title: 'Band' }, { link: '/tour', title: 'Tour' }, { link: '/contact', title: 'contact'} ] });
  }else{
    res.redirect('/auth/signup');
  }
})


module.exports = bandrouter;