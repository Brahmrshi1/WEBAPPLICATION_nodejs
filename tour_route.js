const express = require('express');
const tourrouter = express.Router();
const MongoClient=require('mongodb').MongoClient;

tourrouter.route('/tour')

// .get((req,res,next)=>{
//   if(req.user){
//     res.render('tour', { list: [{ link: '/home', title: 'Home' }, { link: '/band', title: 'Band' }, { link: '/tour', title: 'Tour' }, { link: '/contact', title: 'contact'} ] });
//   }else{
//     res.redirect('/auth/signup');
//   }
// })


.all((req,res,next)=>{

  if(req.user){
    const {person,Email} = req.body;
    const url = 'mongodb://localhost:27017';
    const dbname = 'mydb';
    
    (async function  adduser() {
      let client;
      try{
        client = await MongoClient.connect(url);
        console.log("Connected perfectly");
    
        const db = client.db(dbname);
        const col = db.collection('tour');
        const user = {person,Email};
        const result = await col.insertOne(user)
        res.render('tour', { list: [{ link: '/home', title: 'Home' }, { link: '/band', title: 'Band' }, { link: '/tour', title: 'Tour' }, { link: '/contact', title: 'contact'} ] });        console.log(result);
    
      }catch(err){
        console.log(err.stack);
      }
    
    }())
    
    

  }else{
    res.redirect('/auth/signup');
  }
})




// .get((req, res) => {
  //   res.render('tour', { list: [{ link: '/home', title: 'Home' }, { link: '/band', title: 'Band' }, { link: '/tour', title: 'Tour' }, { link: '/contact', title: 'contact'}, {link:'/auth/signin',title:'Sign in'} ] });
  //   // res.send('Welcome to tour site');
  // });

  module.exports = tourrouter;