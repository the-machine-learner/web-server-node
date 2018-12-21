//Express is a very popular npm library for creating web servers
//1. importing express
const express = require('express');

//9. importing handle bar a templating engine that lets us handle HTML in a dynamic way.
const hbs = require('hbs');

//13. Partials store the redundant template code like footers,navbar...
hbs.registerPartials(__dirname + '/views/Partials');
//2.Creating a new app "app" by setting it equal to the return result by calling express as function.
var app = express();

//10. Telling app about the VE we are using 
app.set('view engine','hbs');

//8. Middleware let's you configure how your express app works
//static takes the absolute path of folder whose files u directly want to access
app.use(express.static(__dirname+'/public'));

//3. Route handler - two arguments 1 -url, 2- what to send back
app.get('/',(req,res)=>{
//4. response to be sent
    // res.send('<h1>Hello Express</h1>');
//5. Sending JSON really easy
	res.send({
		likes:["food",
		"trekking"]
	});
});

//6. another page with URL- about
app.get('/about',(req, res)=>{
	  //res.send('About Page');
//11. Using express engine (views is the default file holding templates)
	res.render('about.hbs',{
//12. Passing in arguments which are used for dynamic initialization of the page
		pageTitle: 'about Page',
		currentYear: new Date().getFullYear(),
	});
});

app.get('/bad',(req,res)=>{
res.send({
	errorMessage:'Unable to handle request'
});
});

//13.
app.get('/home',(req,res)=>{
	res.render('home.hbs',{
		pageTitle: 'about page',
		currentYear: new Date().getFullYear(),
		wlecomeMess: 'Welcome to my website'
	});
});

//7. Port to run webServer and the message print while server was being made ready
app.listen(3000,()=>{console.log('Server is up on port 3000');});