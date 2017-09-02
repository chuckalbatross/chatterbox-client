//  chatterbox/classes/messages

/*//////////////////////////////////////////////////////////////
var message = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};

////////////////////////////////////////////////////////////////
$.ajax({
  // This is the url you should use to communicate with the parse API server.
  url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  type: 'POST',
  data: JSON.stringify(message),
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});
*///////////////////////////////////////////////////////////////


var app = {};

app.init = function() {
  this.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
};

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: message,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: message,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.clearMessages = function() {
  // var messageElements = document.getElementsByClassName('message');
  // for (let message of messageElements) {
  //   message.remove();
  // }
  // document.getElementByID('chats').removeChild();
  $('#chats').empty();

};

// var message = {
//   username: 'Mel Brooks',
//   text: 'Never underestimate the power of the Schwartz!',
//   roomname: 'lobby'
// };

app.renderMessage = (message) => {
  var element = `<div class=\"messageBox\"><p class=\"messageUser\">${message.username}</p><p class=\"messageText\">${message.text}</p></div>`;
  $('#chats').append(element);
};

app.renderRoom = (roomName) => {

};

