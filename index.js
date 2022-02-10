const express = require('express')
const engine = require('express-handlebars').engine;

const app = express()
const port = 4000

app.engine('spy', engine({
    defaultLayout: 'main',
    extname: '.spy'
}));

app.set('view engine', 'spy');

app.use(express.static('public'));

app.get('/', (req, res) => {
	  res.render('home.spy', { message: 'Hello, Hello!' });
})


app.listen(port, () => {
	  console.log(`App listening on port ${port}`)
})
