const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Meeting = require('./meeting');

const dbConnection = 'mongodb+srv://maks:MD8253maksior4@cluster0-zzbwj.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(dbConnection, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection erroe:'));

const app = express();
app.use(cors());
app.use(express.json());


//testing route
app.get('/test', (req,res) => {
  res.send('TEST');
});

// add new meeting
app.post('/new', (req, res) => {
  let error = true;
  const data = req.body.dateToSend;
  const newMeeting = new Meeting(data);
  newMeeting.save(()=>{
    Meeting.find({_id: newMeeting._id},(err, data)=>{
      if(data.length === 1 ){
        error = false
      }
      res.send({error:error});
    })
  });
  
});

app.use((err,req,res,next) =>{
  res.status(500);
  res.send(error.stack);
  res.send('Error!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => `Server running on port ${PORT}`);

exports.app = app;