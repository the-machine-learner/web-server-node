const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/Partials');
var app = express();

app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

//15. Using middleware use and without next() none of the links will work
// It is a middleware takes the request object spits out some information and then moves on
app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now}: method- ${req.method} on URL- ${req.url} `;
	fs.appendFile('server.log', log + '\n',(err)=>{
		if(err) {
			console.log('Unsable to append to server.log.');
		}
	});
	console.log(log);
    next();
});

    // app.use((req,res,next)=>{
//15. mainainance page will be loaded for every 
//request except to files in public folder as it is directly being accessed above
		// res.render('maintainance.hbs');
    // });
app.get('/',(req,res)=>{
		res.render('about.hbs',{
		pageTitle: 'about Page',
		currentYear: new Date().getFullYear(),
	});
	// res.send({
	// 	likes:["food",
	// 	"trekking"]
	// });
});

//14. setting up partial funcrions for reundant code
hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});
app.get('/about',(req, res)=>{
	  //res.send('About Page');
	res.render('about.hbs',{
		pageTitle: 'about Page',
		currentYear: new Date().getFullYear(),
	});
});

app.get('/bad',(req,res)=>{
res.send({
	errorMessage:'Unable to handle request'
});
});

app.get('/home',(req,res)=>{
	res.render('home.hbs',{
		pageTitle: 'about page',
		currentYear: new Date().getFullYear(),
		wlecomeMess: 'Welcome to my website'
	});
});
app.listen(port,()=>{console.log(`Server is up on port ${port}`);});

//Middleware functions are functions that have access to the request object (req), the response object (res),
// and the next middleware function in the application’s request-response cycle.
// The next middleware function is commonly denoted by a variable named next.