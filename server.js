const express=require('express')
const app=express()
const cors=require('cors')
const PORT=process.env.PORT || 5000
const connectDB=require('./config/db')

//mongo connection
// app.use(cors())

connectDB()

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'GET,PUT,DELETE,POST,OPTIONS')
    res.header("Access-Control-Allow-Headers","Origin,Content-Type, X-Requested-With, Accept,x-auth-token");
    next();
  });

// gettin body values through req  
app.use(express.json({extended:false}))

  
app.use('/api/user',require('./routes/api/users'))
app.use('/api/profile',require('./routes/api/profile'))
app.use('/api/posts',require('./routes/api/posts'))
app.use('/api/auth',require('./routes/api/auth'))

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))
