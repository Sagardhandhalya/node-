const express=require('express');
const hbs =require('hbs');
const fs=require('fs');

var app= express();

//middlewaer

app.use((req,res,next)=>{
    res.render('maintain.hbs');
});

app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
    var now=new Date().toString();
    var log = `${now}:${req.method} ${req.url}`;
     
    console.log(log);
    fs.appendFile('data.txt', log + '\n',(err)=>{
        if(err){

        }else{}
    })
    next();
});




app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})




//route setup
app.get('/',(req,res)=>{
//   res.send('<h1>Hello Express</h1>');
//    res.send({
//        name:'Parth',
//        id:210   
//     });

    res.render('home.hbs',{
        title:'Home page',
        pageTitle:'About Page',
        //currentYear:new Date().getFullYear(),
        message:'Welcome to express page'
    })
});

//routes
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',
        //currentYear:new Date().getFullYear()
    });
});

//routes
app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Unable to connect'
    })
})

//listener
//binding setup
app.listen(3000,()=>{
    console.log('server is up on port 3000');
});