//dotenv
require('dotenv').config()
const express = require('express')
const path = require('path');
const app = express()
//----------------------------------
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const fs = require('fs');
//----------------------------------
const moment = require('moment')
const cors = require('cors')
const methodOverride = require('method-override')

// define connect-flash for show error message
const session = require('express-session')
const flash = require('connect-flash')
const cookieParser = require('cookie-parser')

// define mongoose
const mongoose = require('mongoose')
global.__path_upload    = __dirname + '/public/backend/upload' 




// define expressLayouts
const expressLayouts = require('express-ejs-layouts');

// define errorHandler
const  {errorHandler}  = require('./middlewares/errorHandler') 

// define router for Backend
const indexRoute        = require('./routes/backend/index')
const authRoute         = require('./routes/backend/auth')
const userRoute         = require('./routes/backend/user')
const categorytRoute    = require('./routes/backend/category')
const postRoute         = require('./routes/backend/post')
const videoRoute        = require('./routes/backend/video')

const khangtphamRoute   = require('./routes/backend/khangtpham')

const dieudongxeRoute        = require('./routes/backend/dieudongxe')
const baocaovanhanhRoute        = require('./routes/backend/baocaovanhanh')
const phuongthucvanhanhRoute    = require('./routes/backend/phuongthucvanhanh')
const moihopRoute    = require('./routes/backend/moihop')
const congtaclanhdaoRoute    = require('./routes/backend/congtaclanhdao')

const ungdungRoute    = require('./routes/backend/ungdung')

// define router for Frontend
const homeRouteFE           = require('./routes/frontend/home')
const categoryRouteFE       = require('./routes/frontend/category')
const postRouteFE           = require('./routes/frontend/post')
const postSearchRouteFE     = require('./routes/frontend/postSearch')

const gioithieuRouteFE      = require('./routes/frontend/gioithieu')
const dienlucRouteFE        = require('./routes/frontend/dienluc')

const dieudongxeRouteFE        = require('./routes/frontend/dieudongxe')
const baocaovanhanhRouteFE        = require('./routes/frontend/baocaovanhanh')
const phuongthucvanhanhRouteFE        = require('./routes/frontend/phuongthucvanhanh')
const moihopRouteFE        = require('./routes/frontend/moihop')
const congtaclanhdaoRouteFE        = require('./routes/frontend/congtaclanhdao')
const ungdungRouteFE        = require('./routes/frontend/ungdung')

 





//cors  and body parser

app.use(methodOverride('_method'))
app.use(cors());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

// 3 pkg này nhớ đặt sau const app = new express();
app.use(cookieParser('secret'));
app.use(flash()); 
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 100*60000 }
}));

//---------------------
global.loggedUserId = null;
global.loggedUserName = null;
app.use("*",(req,res,next) =>{
     loggedUserId = req.session.userId                
     loggedUserName = req.session.userName                
    next()
})

//---------------------
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'backend/pages/layoutMain');


 
/////////////////////////////////////////
 
// // 1 kiểu khác để upload file
app.post('/uploadThumb',multipartMiddleware,(req,res)=>{
    try {
         //cb(null, Date.now() +'_'+file.originalname );
        let fileName = Date.now() +'_'+req.files.upload.name;
        fs.readFile(req.files.upload.path, function (err, data) {
            var newPath = __dirname + '/public/backend/upload/images/' + fileName;            
            fs.writeFile(newPath, data, function (err) {
                if (err) console.log({err: err});
                else {                    
                    let url = '/backend/upload/images/'+fileName;           
                    let msg = 'Upload successfully';
                    let funcNum = req.query.CKEditorFuncNum;
                   
                    res.status(201).send("<script>window.parent.CKEDITOR.tools.callFunction('"+funcNum+"','"+url+"','"+msg+"');</script>");
                }
            });
        });
       } catch (error) {
           console.log(">>>" + error.message);
       }
})

// dán đoạn này ở file script nếu muốn dùng kiểu này chứ không phỉ CKfinder
{/* <script src="/backend/ckeditor/ckeditor.js"></script>
<script>CKEDITOR.replace( 'editor1' ,{                
        extraPlugins:'filebrowser',
        filebrowserBrowseUrl:'/backend/upload/images/',
        filebrowserUploadMethod:'form',
        filebrowserUploadUrl:'/uploadThumb'//route       

        })
</script>
<!-- CK EDITOR --> */}
//--------------------------------



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
 


    //const systemConfig      = require(__path_config + 'system');
    //const databaseConfig    = require(__path_config + 'database');
    //const systemConfig = require(  './config/system'); app.locals.systemConfig
    
    const systemConfig      = require('./config/system');    
    app.locals.systemConfig = systemConfig;
    app.locals.moment       = moment;
    // moment().format(); 

   // URL_ADMIN = systemConfig
    
    //app.use(`/${systemConfig.prefixAdmin}`, require(__path_controllers +'admin'));  // mặc định gọi đến :..../app/routes/index.js
//app.use(`/${systemConfig.prefixBlog}`, require(__path_controllers +'blog'));  // mặc định gọi đến :..../app/routes/index.js
//Mount route

    // Mount backend
    app.get(`${systemConfig.prefixAdmin}`,(req,res) =>{
        res.render('backend/pages/dashboard')  
    })
    app.use(`${systemConfig.prefixAdmin}`     , indexRoute)        // mặc định vào routes index            
    app.use(`${systemConfig.prefixAdmin}`     , authRoute)        
    app.use(`${systemConfig.prefixAdmin}` + '/user'        , userRoute)
    app.use(`${systemConfig.prefixAdmin}` + '/category'    , categorytRoute)    
    app.use(`${systemConfig.prefixAdmin}` + '/post'        , postRoute)
    app.use(`${systemConfig.prefixAdmin}` + '/video'       , videoRoute)

    app.use(`${systemConfig.prefixAdmin}` + '/khangtpham' , khangtphamRoute)

    app.use(`${systemConfig.prefixAdmin}` + '/dieudongxe' , dieudongxeRoute)
    app.use(`${systemConfig.prefixAdmin}` + '/baocaovanhanh' , baocaovanhanhRoute)
    app.use(`${systemConfig.prefixAdmin}` + '/phuongthucvanhanh' , phuongthucvanhanhRoute)
    app.use(`${systemConfig.prefixAdmin}` + '/moihop' , moihopRoute)
    app.use(`${systemConfig.prefixAdmin}` + '/congtaclanhdao' , congtaclanhdaoRoute)
    app.use(`${systemConfig.prefixAdmin}` + '/ungdung' , ungdungRoute)
    
    // Mount  frontend
    app.use(`${systemConfig.prefixBlog}`     , homeRouteFE)        // mặc định vào routes index            
    app.use(`${systemConfig.prefixBlog}`     , categoryRouteFE)
    app.use(`${systemConfig.prefixBlog}`     , postRouteFE)
    app.use(`${systemConfig.prefixBlog}`     , postSearchRouteFE)

    app.use(`${systemConfig.prefixBlog}`     , gioithieuRouteFE)                 
    app.use(`${systemConfig.prefixBlog}`     , dienlucRouteFE)   

    app.use(`${systemConfig.prefixBlog}`     , dieudongxeRouteFE)
    app.use(`${systemConfig.prefixBlog}`     , baocaovanhanhRouteFE)
    app.use(`${systemConfig.prefixBlog}`     , phuongthucvanhanhRouteFE)    
    app.use(`${systemConfig.prefixBlog}`     , moihopRouteFE)    
    app.use(`${systemConfig.prefixBlog}`     , congtaclanhdaoRouteFE)    
    app.use(`${systemConfig.prefixBlog}`     , ungdungRouteFE)    
    
    
    
    
 
 
// unhandled route

    app.all('*' , (req,res,next)=>{
        const err = new Error('Page or Route can not be found .......')
        err.statusCode = 404
        next(err)
    })

    // errorHandler 
    app.use(errorHandler)


