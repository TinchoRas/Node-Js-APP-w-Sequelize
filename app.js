const express = require('express');
const { engine } = require('express-handlebars');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/database');
const app = express();
//handlebars

app.engine('handlebars', engine({defaultLayout: 'main'}))
app.engine('handlebars', engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))
app.set('view engine', 'handlebars')
//set static folder
app.use(express.static(path.join(__dirname,'/public')));



 // Test DB connection
    db.authenticate()
        .then(()=> console.log('DB connected'))
        .catch(err => console.log(err))

//index route
app.get('/', (req, res)=> {res.render('index', {layout: 'landing'})})

//body Parser
app.use(bodyParser.urlencoded({extended: false}))




// Gig routes
app.use('/gigs', require('./routes/gigs')); //for anything that is /gigs we're gonna require routes/gigs
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server is running on port ${PORT}`));