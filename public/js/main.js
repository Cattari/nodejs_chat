$(document).ready(function() {
  var socket = io(location.hostname+':3000');
  var inputEl = $('#btn-input');
  var userName = null;
  var modelEl = $('#hello-modal');

  modelEl.modal('show');

  socket.on('new message', function(data){
    $('.chat').append('<li class="left clearfix"><span class="chat-img pull-left"><img class="img-circle" src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" /></span><div class="chat-body clearfix"><div class="header"><strong class="primary-font">'+data.userName+'</strong></div><p>'+data.message+'</p></div></li>');
  });

  $('#user-name-submit').click(function() {
    userName = $('#user-name-input').val();
    modelEl.modal('hide');
  });

  $('#btn-chat').click(function() {
    var inputValue = inputEl.val();

    if (inputValue) {
      socket.emit('chat message', {
        userName: userName,
        message: inputValue
      });
      inputEl.val('');
    }

  })

});
