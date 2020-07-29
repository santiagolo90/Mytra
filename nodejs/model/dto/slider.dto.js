const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;


const sliderSchema = new Schema({
    titulo: { 
        type: String 
    },
    detalle: { 
        type: String 
    },
    orden: { 
        type: Number 
    },
    extension: { 
        type: String 
    },
    server: { 
        type: String 
    },
},{ timestamps: true }, { versionKey: false });




sliderSchema.plugin(mongoosePaginate);
sliderSchema.index({titulo: "text",detalle: "text"}, {weights: {titulo: 1,detalle: 2}})

const Slider = mongoose.model('sliders', sliderSchema);

module.exports = Slider;