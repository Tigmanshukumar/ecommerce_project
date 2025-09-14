const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController'); 

router.get('/', (req, res) => {
    res.send('Hey it users router');
});

router.post('/register', registerUser);

router.post('/login', loginUser);

// router.get("/logout", logout);

module.exports = router;