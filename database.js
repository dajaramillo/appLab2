const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://djroot:dj123@mongodb01.sphu5fk.mongodb.net/appUsers', {
    //useCreateIndex: true,
    //useNewUrlParser: true,
    //useFindAndModify: false
    
})
    .then(db => console.log('BD conectada'))
    .catch(err => console.error(err));