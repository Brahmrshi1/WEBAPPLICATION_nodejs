const express = require('express');
const contactrouter = express.Router();
const MongoClient=require('mongodb').MongoClient;
contactrouter.route('/contact')

// .get((req,res,next)=>{

//   if(req.user){
//     res.render('contact', { list: [{ link: '/home', title: 'Home' }, { link: '/band', title: 'Band' }, { link: '/tour', title: 'Tour' }, { link: '/contact', title: 'contact'} ] });
//   }else{
//     res.redirect('/auth/signup');
//   }
// })

.all((req,res,next)=>{

  if(req.user){
    const {Name , Email,Message} = req.body;
    const url = 'mongodb://localhost:27017';
    const dbname = 'mydb';
    
    (async function  adduser() {
      let client;
      try{
        client = await MongoClient.connect(url);
        console.log("Connected perfectly");
    
        const db = client.db(dbname);
        const col = db.collection('contact');
        const user = {Name , Email,Message};
        const result = await col.insertOne(user)
        res.render('contact', { list: [{ link: '/home', title: 'Home' }, { link: '/band', title: 'Band' }, { link: '/tour', title: 'Tour' }, { link: '/contact', title: 'contact'} ] });        
        console.log(result);
    
      }catch(err){
        console.log(err.stack);
      }
    
    }())
    
    

  }else{
    res.redirect('/auth/signup');
  }
})




// .get((req, res) => {
//   res.render('contact', { list: [{ link: '/home', title: 'Home' }, { link: '/band', title: 'Band' }, { link: '/tour', title: 'Tour' }, { link: '/contact', title: 'contact'}, {link:'/auth/signin',title:'Sign in'} ] });
//   // res.send('Thnak you for contact us');
// });

module.exports = contactrouter;

