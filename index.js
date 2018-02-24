const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
// db.defaults({messages: [
//     { userName: "Pupkin epta", message: "Privet" }
// ]}).write()

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('chat message', function(data){
    io.emit('new message', data);

    db.get('messages')
      .push(data)
      .write()
  });
});

app.use(express.static('public'))

app.set('view engine', 'pug');

app.get('/', function(req, res){
  res.render('index', {
    title: 'Hey',
    pageHeading: 'Hello, man!',
    messages: db.get('messages').value()
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
