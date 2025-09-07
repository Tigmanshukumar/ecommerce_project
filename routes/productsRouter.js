const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hey it products router');
});

module.exports = router;