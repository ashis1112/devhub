const express=require('express')
const app=express()
const PORT=process.env.PORT || 5000
const connectDB=require('./config/db')

//mongo connection
connectDB()
// gettin body values through req  
app.use(express.json({extended:false}))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-auth-token");
    next();
  });

  
app.use('/api/user',require('./routes/api/users'))
app.use('/api/profile',require('./routes/api/profile'))
app.use('/api/posts',require('./routes/api/posts'))
app.use('/api/auth',require('./routes/api/auth'))


app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))
