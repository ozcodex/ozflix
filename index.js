const express = require('express')
const sprightly = require('sprightly')

const app = express()
const port = 4000

app.engine('spy', sprightly);
app.set('view engine', 'spy');

app.use(express.static('public'));

app.get('/', (req, res) => {
	  res.render('home.spy', { message: 'Hello World!' });
})


app.listen(port, () => {
	  console.log(`App listening on port ${port}`)
})
