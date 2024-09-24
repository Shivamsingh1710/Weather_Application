//to run  node src/app.js
const express = require("express");
const path = require("path");
const hbs = require("hbs");        // for using partials we need to require hbs so
const app = express();
const port = process.env.PORT || 3001

//public static path
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");  // template kae andar views hai so templates/views
const partials_path = path.join(__dirname, "../templates/partials");

app.set('view engine' , 'hbs');
app.set('views' , template_path);   //here we changed our path from views to template for using partials so we need to change it so again we are using set methodand givimg path 
hbs.registerPartials(partials_path);    // when we are using partials we need to register it so we did and give its path
app.use(express.static(static_path));


//after adding partials we went to terminal and wrote nodemon src/app.js  -e  js , hbs so that our express runs this extensiom to so now if we change 
//  amything on out hbs file automatic change on website will also happen  so its imp


//routing

app.get("", (req,res)=> {
    res.render('index')             //we used pug so instead of res.send we are using res.rener

})
app.get("/about", (req,res)=> {
    res.render('about')

})
app.get("/weather", (req,res)=> {
    res.render('weather')

})
app.get("*", (req,res)=> {                         // * -> home weather ar abt page kae alwaa koi page visit so 404 error page 
    res.render('404error' ,  {
        errmsg: "Opps page not found."
    })

})

app.listen(port, ()=> {
    console.log(`listening from the port ${port}`);
});


