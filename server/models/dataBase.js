const mongoose = require('mongoose');
mongoose.connect(process.env.Mongo_URL)
.then((conn)=>{
    console.log("connected to MONGODB");
})
.catch((err)=>{
    console.log(err);
});

require('./Category');
require('./Recipe');