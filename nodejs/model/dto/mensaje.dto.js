const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Schema = mongoose.Schema;



const mensajeSchema = new Schema({
    nombre: {
        type: String
    },
    apellido: { 
        type: String 
    },
    email: { 
        type: String 
    },
    telefono: { 
        type: String 
    },
    mensaje: { 
        type: String 
    },
},
    {
        timestamps: true
    },
    {
        versionKey: false
    }
);


mensajeSchema.plugin(mongoosePaginate);
mensajeSchema.index({'$**': 'text'});

const Mensaje = mongoose.model('mensajes', mensajeSchema);

module.exports = Mensaje;