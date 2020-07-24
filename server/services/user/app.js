if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const express = require('express');
const app = express();
const cors = require('cors');
const mongo = require('./configs/mongo');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use('/', require('./routes'));
// app.listen(PORT, () => {
//     console.log(`Server user running on port ${PORT}`);
// });
// mongo.connect((err) => {
//     if(!err){
//         app.use(cors());
//         app.use(express.json());
//         app.use(express.urlencoded({ extended:false }));
//         app.use('/', require('./routes'));

//         app.listen(PORT, function() {
//             console.log(`Server user running on port ${PORT}`);
//         });
//     }
// });
module.exports = app;
