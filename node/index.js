// const express  = require('express') ;
// const app = express() ; 

// app.get('/',(req,res) =>
// {
//   res.send('asdkl asdjf asdl ') ;
// });
// app.listen(3000 , ()=>{
//     console.log(' Server start on 3000');
// })

const express = require('express');
const app = express();

app.use(express.json()) ;
app.use(express.urlencoded({extended:false})) ;

app.use('/api/users' , require('./routes/api/users')) ;


app.listen(3000, function () {

    console.log('run it ') ;
}
);
