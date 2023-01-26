const router = require('express').Router();

router.get('/', (req, res) => {
    //res.send('Este es el Index');
    res.render('index');
});

router.get('/about', (req, res) => {
    //res.send('Este es el Acerca');
    res.render('about');
});

module.exports = router;