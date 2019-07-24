const router = require('express').Router();
const controler = require('./controller');

router.post('/login',controler.login);
router.post('/register',controler.register);

module.exports=router;