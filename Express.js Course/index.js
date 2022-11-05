// Create a simple express server
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');
const app = express();

// Init middleware
// app.use(logger);

// Handlebars Middleware

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
// This is to parses data from a form
app.use(express.urlencoded({extended: false}));

// Home page route. Render home page. We want to render the index view
app.get('/', (req,res) => res.render('index', {
    title: 'Member App',
    members
}));


// Set a static folder
app.use(express.static(path.join(__dirname,'public'))); // Middeleware

// Members API Routes
// First parameter is the api endpoint, second parameter is the callback function
app.use('/api/members', require('./routes/api/members'));

// This is for deployment, first check environment variable, if not found, use 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));