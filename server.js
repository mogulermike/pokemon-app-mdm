const express = require('express');
const pokemon = require('./pokemon')

const app = express();//app is an object
app.use(express.urlencoded({extended: true}));

const routes = require('./routes')

const methodOverride=require('method-override');
app.use(methodOverride('_method'));

app.use('/pokemon', routes.pokemon);
app.use('/players', routes.players);

app.use(express.static('public'))

app.listen(3001, () => {
    console.log('I am listening on port 3001');
})