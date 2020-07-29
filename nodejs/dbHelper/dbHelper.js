const mongoose = require('mongoose');
const parametros = require('../config/parametros')

//TODO TRAERLOS DE .env
mongoose.connect(`mongodb+srv://${parametros.MONGODB.USER}:${parametros.MONGODB.PASS}@cluster.mongodb.net/${parametros.MONGODB.DB}`,
//mongoose.connect('mongodb://localhost:27017/apome',  
    { 
        useUnifiedTopology: true, 
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('DB Connected!'))
    .catch(err => {
        console.log("DB Connection Error: ",err.message);
});

module.exports = mongoose;