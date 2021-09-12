require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const multer = require('multer');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

//Routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const postRoute = require('./routes/post');


//Connect to mongoDB
mongoose.connect(process.env.MONGO_URL,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
        .then(()=>console.log("Connected to DB"))
        .catch((err)=>console.log(err));



//Run an app middlewares
app.use(express.json());
app.use(helmet());
app.use(cors())
app.use(morgan('combined'))




//Run All The Routes
app.use('/api/auth',authRoute);
app.use('/api/user',userRoute);
app.use('/api/post',postRoute);


//PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log("server is running now on port 5000"));