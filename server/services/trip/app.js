if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const mongo = require('./configs/mongo');

mongo.connect(function(err) {
    if(!err){
        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended:false }));
        app.use('/', require('./routes'));

        app.listen(PORT, function() {
            console.log(`Server trip running on port ${PORT}`);
        });
    }
});
