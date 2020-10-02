const Pokemon = require('../models').Pokemon;
const Players = require('../models').Players;

// BEFORE
// const index = (req,res) => {
//     res.render('index.ejs', {
//         pokemon: pokemon
//     })
// }

const index = (req, res) => {   
    Pokemon.findAll({
        order: [
            ['id', 'ASC']
        ]
    })
    .then(pokemons => {
        res.render('index.ejs', {
            pokemon : pokemons
        });
    })    
};

// BEFORE
// const show = (req,res) => {
//     res.render('show.ejs', {
//         pokemon: pokemon[req.params.index],
//         index: req.params.index
//     })
// }

const show = (req, res) => {
    Pokemon.findByPk(req.params.index, {
        include : [
            {
            model: Players,
            attributes: ['name']
            }
        ]
    })

    .then(pokemon => {
        res.render('show.ejs', {
            pokemon: pokemon
        });
    })
}

// BEFORE
// const edit = (req,res) => {
//     res.render('edit.ejs', {
//         pokemon: pokemon[req.params.index],
//         index: req.params.index
//     })
// }

const edit = (req, res) => {
    Pokemon.findByPk(req.params.index)
    .then(pokemon => {
        res.render('edit.ejs', {
            pokemon: pokemon
        });
    })
}

const newPokemon = (req,res) => {
    res.render('new.ejs');
}

// BEFORE
// const post = (req,res) => {
//     if(req.body.readyToEat === 'on'){
//         req.body.readyToEat = true;
//     } else {
//         req.body.readyToEat = false;
//     }
//     pokemon.push(req.body);

//     res.redirect('/pokemon');
// }

const post = (req, res) => {
    if(req.body.readyToEat === 'on'){ 
        req.body.readyToEat = true; 
    } else { 
        req.body.readyToEat = false;
    }

    Pokemon.create(req.body)
    .then(newPokemon => {
        res.redirect('/pokemon');
    })
}

// BEFORE
// const put = (req,res) => {
//     pokemon[req.params.index] = req.body;
//     res.redirect(`/pokemon/${req.params.index}`);

// }

const put = (req, res) => {
    Pokemon.update(req.body, {
          where: { id: req.params.index },
          returning: true,
        }
    )
    .then(pokemon => {
        res.redirect(`/pokemon/${req.params.index}`);
    })
}

// BEFORE
// const deletePokemon = (req, res) => {
//     pokemon.splice(req.params.index,1),
//     res.redirect('/pokemon')

// }

const deletePokemon = (req, res) => {
    Pokemon.destroy({ where: { id: req.params.index } })
    .then(() => {
        res.redirect('/pokemon');
    })	
}


module.exports = {
    index,
    show,
    edit,
    newPokemon,
    post,
    put,
    deletePokemon
}