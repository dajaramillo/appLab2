const router = require('express').Router();
const Auto = require('../models/Auto');

router.get('/addAuto', (req, res) => {
    res.render('autos/addAuto');
});

router.post('/addAuto', async (req, res) => {
    const { marca, modelo, kilometraje } = req.body;
    console.log(req.body);
    const errors = [];
    if(marca.length <= 0){
        errors.push({text: 'Ingrese la marca'})
    }
    if(marca.length <= 0){
        errors.push({text: 'Ingrese el modelo'})
    }
    if(marca.length <= 0){
        errors.push({text: 'Ingrese el kilometraje'})
    }    
    if(errors.length > 0){
        res.render('/addAuto', {errors});
    } else {
        //res.send('OK');
        const valores = await Auto.findOne({marca: marca, modelo: modelo, kilometraje: kilometraje});
        if(valores){
            req.flash('error_msg', 'El correo ya está registrado');
            res.redirect('/addAuto');
            
            
        } else {
        const newAuto = new Auto({marca, modelo, kilometraje});
        await newAuto.save();
        req.flash('success_msg', 'Auto agregado');
        res.redirect('/autos');
        }
    }
});

router.get('/autos', async (req, res) => {
    const autos = await Auto.find();
    console.log(autos);
    res.render('autos/auto', { autos });
});

module.exports = router;