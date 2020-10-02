const Player = require('../models').Players;
const Team = require('../models').Team;
const Pokemon = require('../models').Pokemon;
const PlayerPokemon = require('../models').PlayerPokemon;

const index = (req,res) => {
    res.render('players/index.ejs')
}

const getSignUp = (req,res) => {
    res.render('players/signUp.ejs');
}

// BEFORE
// const signUp = (req, res) => {
//     players.push(req.body);
//     res.redirect(`/players/profile/${players.length-1}`);
// }

const signUp = (req, res) => {
    Player.create(req.body)
    .then(newPlayer => {
        res.redirect(`/players/profile/${newPlayer.id}`);
    })
}

const getLogIn = (req,res) => {
    res.render('players/logIn.ejs');
}

// BEFORE
// const logIn = (req, res) => {
//     let index = players.findIndex(
//         player => (player.username === req.body.username && 
//                     player.password === req.body.password)
//     )

//     res.redirect(`/players/profile/${index}`);
// }

const logIn = (req, res) => {
    Player.findOne({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    })
    .then(foundPlayer => {
        res.redirect(`/players/profile/${foundPlayer.id}`);
    })
}

// BEFORE
// const showPlayer = (req,res) => {
//     res.render('players/showPlayer.ejs', {
//         player: players[req.params.index],
//         index: req.params.index
//     })
// }

const showPlayer = (req, res) => {
    Player.findByPk(req.params.index, {
        include: [Team,
        {
            model: Pokemon,
            attributes: ['name']
        }]
    })
    .then(player => {
        Team.findAll()
        .then(teams => {
            Pokemon.findAll()
            .then(allPokemon => {
                res.render('players/showPlayer.ejs', {
                    player: player, 
                    teams: teams,
                    pokemon: allPokemon
                })
            })
        }) 
    })
}


// BEFORE
// const editProfile = (req, res) => {
//     players[req.params.index] = req.body;
//     res.redirect(`/players/profile/${req.params.index}`);
// }

const editProfile = (req, res) => {
    Player.update(req.body, {
          where: { id: req.params.index },
          returning: true,
        }
    )
    .then(updatedPlayer => {
        Player.findByPk(req.params.index)
        .then(foundPlayer => {
            Pokemon.findByPk(req.body.pokemonId)
            .then(foundPokemon => {
                foundPokemon.addPlayer(foundPlayer);
                res.redirect(`/players/profile/${req.params.index}`);
            }) 
        })
    })
    
}

// BEFORE
// const deletePlayer = (req, res) => {
//     players.splice(req.params.index, 1);
//     res.redirect('/players');
// }

const deletePlayer = (req, res) => {
    Player.destroy({ where: { id: req.params.index } })
    .then(() => {
        res.redirect('/players');
    })	
}


module.exports = {
    index,
    getSignUp,
    signUp,
    showPlayer,
    getLogIn,
    logIn,
    editProfile, 
    deletePlayer
}