const express = require('express');
const { config } = require('dotenv');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const placesRoutes = require('./routes/place-routes');
const usersRoutes = require('./routes/user-routes');
const HttpError = require('./model/error-http');

const app = express();

config();

app.use(bodyParser.json());

app.use('/uploads/images',express.static(path.join('uploads','images')));

app.use((req,res,next)=>{
 

  res.setHeader("Access-Control-Allow-origin",'*');
  res.setHeader("Access-Control-Allow-Headers",
  "Origin,X-Requested-with,Content-type,Accept,Authorization")
  res.setHeader('Access-Control-Allow-Methods',"GET,POST,DELETE,PATCH");
  next();
})

app.use('/api/places', placesRoutes); 
app.use('/api/users', usersRoutes);


app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if(req.file){
    fs.unlink(req.file.path,err=>{
      console.log(err);
    })
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500)
  res.json({message: error.message || 'An unknown error occurred!'});
});

console.log(process.env.DB_USER);
console.log(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pfayrmy.mongodb.net/${process.env.DB_NAME}`);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb+srv://Mukesh:${process.env.DB_PASSWORD}@cluster0.pfayrmy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, { useNewUrlParser: true,useFindAndModify:false,useCreateIndex:true,useUnifiedTopology: true }).then(()=>{
  app.listen(5000);
  console.log("connected");
}).catch((error)=>{
  console.log(error)
})
