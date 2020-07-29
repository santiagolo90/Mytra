const path = require('path');
module.exports = {
    IMAGES_PATH: {
        SLIDER: path.join(__dirname, '../public/assets/images/sliders/'),
        PLAYER: path.join(__dirname, '../public/assets/images/players/'),
        PARTNER: path.join(__dirname, '../public/assets/images/partners/'),
        NEWS: path.join(__dirname, '../public/assets/images/news/'),
        NO_IMG: path.join(__dirname, '../public/assets/images/no-img.png')
    },
    MONGODB:{
        DB:'',
        USER: '',
        PASS: '' 
    },
    JWT:{
        CLAVE: "@*"
    },
    LOGS_PATH: path.join(__dirname, '../logs/'),
    EMAIL_CONFIG: {
        SERVICE: "",
        USER:"",
        PASS: "",
        TO: '',
        FROM: ''
    }
};


