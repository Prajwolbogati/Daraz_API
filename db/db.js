const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/Daraz',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Database connected successfully");
}).catch((e)=>{
    console.log("Database cannot connect");
    console.log(e.toString());
});

mongoose.set('useCreateIndex','true');
mongoose.set('useFindAndModify','false');

module.exports={mongoose};

