const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.get('/', ctrl.players.index);
router.get('/signup', ctrl.players.getSignUp);
router.post('/signup', ctrl.players.signUp);
router.get('/profile/:index', ctrl.players.showPlayer);
router.get('/login', ctrl.players.getLogIn);
router.post('/login', ctrl.players.logIn);
router.put('/profile/:index', ctrl.players.editProfile);
router.delete('/:index', ctrl.players.deletePlayer);




module.exports = router;