const passport = require('passport');
const router = require('express').Router();
const User = require('../models/User');


router.get('/signin', (req, res) => {
    res.render('users/signin');
});

router.post('/signin', passport.authenticate('local', {
    successRedirect: '/autos',
    failureRedirect: '/signin',
    failureFlash: true
}));

router.get('/signup', (req, res) => {
    //res.send('Este es el Acerca');
    res.render('users/signup');
});

router.post('/signup', async (req, res)=>{
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if(name.length <= 0){
        errors.push({text: 'Ingrese el nombre'})
    }
    if(password != confirm_password) {
        errors.push({text: 'Contraseñas no coinciden'});
    }
    if(password.length < 4){
        errors.push({text: 'Contraseña mínimo de 4 caracteres'})
    }
    if(errors.length > 0){
        res.render('users/signup', {errors, name, email, password, confirm_password});
    } else {
        //res.send('OK');
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            req.flash('error_msg', 'El correo ya está registrado');
            res.redirect('/signup');
            
            
        } else {
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'Usuario Registrado');
        res.redirect('/signin');
        }
    }
})


module.exports = router;