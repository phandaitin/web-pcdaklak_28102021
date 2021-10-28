//dotenv
require('dotenv').config()
const express = require('express')
const app = express()

// define mongoose
const mongoose = require('mongoose')


//cors  and body parser
const cors = require('cors')
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// define errorHandler
const  {errorHandler}  = require('./middlewares/errorHandler') 

// define router
const authRoute         = require('./routes/auth')
const categorytRoute    = require('./routes/category')
const postRoute         = require('./routes/post')
 

// define  port
const port = process.env.APP_PORT 

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.lgrhg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// cach 1
//const {connect} = require('./config/db')
//connect()  ;
// DB connect
// cach 2 truc tiep
//mongoose.connect('mongodb://localhost:27017/db_webpcdaklak',{ useNewUrlParser: true   });
//mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true  , useUnifiedTopology: true  })
mongoose.connect(process.env.DB_URI,{ useNewUrlParser: true  , useUnifiedTopology: true  })
        .then( ()=>{
            console.log('DB Connected !!!');
            // -------------------------------
            app.listen(port, ()=>{
                console.log(`Server is running on port ${port}`);
            })
            // -------------------------------
        })
        .catch(error =>{
            console.log('Error Connect: ' + error.message);
            process.exit(1);  
        })
 

//Mount route
    app.use('/api/auths'        , authRoute)
    app.use('/api/categories'   , categorytRoute)
    app.use('/api/posts'        , postRoute)

// unhandled route

    app.all('*' , (req,res,next)=>{
        const err = new Error('Page or Route can not be found .......')
        err.statusCode = 404
        next(err)
    })

    // errorHandler 
    app.use(errorHandler)


