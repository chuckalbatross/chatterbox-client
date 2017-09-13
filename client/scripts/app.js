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


////////////////////////////////////////////////////////////////
//HELPER FUNCTION TO ESCAPE HTML

var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
    return entityMap[s];
  });
}
////////////////////////////////////////////////////////////////


var app = {};

// var app = new app();

app.init = function() {
  console.log('init called');
  this.server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
  // $("#send .submit").click(app.handleSubmit);

  //ANY TIME YOU PASS A FUNCTION AND HAVE SOMEBODY ELSE EXECUTE IT, THE BINDING IS THAT FUNCTION'S BINDING
  //QUESTION!!!!**** 'this' IS STILL BOUND TO WINDOW! WHY????
  $("#sendMessage .submitMessage").on('click', this.handleSubmit.bind(this));
  // $("#send .submit").click(this.bindingFunc);
  // console.log($('#sendMessage .submit'));
  $("#addRoom .submitRoom").on('click', app.renderRoom);


  // $("#addRoom .submitRoom").on('click', this.renderRoom.bind(this, $("")))
  this.messageArr = [];
  this.roomname = $("#roomSelect").val();


  this.fetch();
};

app.send = function(message) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'POST',
    // data: message,
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent', data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  var message = {};
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: this.server,
    type: 'GET',
    contentType: 'application/json',
    success: function (data) {
      // return data; THIS CAUSES ERROR
      // data.resultJSON.for
      // DOING A CALLBACK no idea when get response back. when you get response back, you can't open box
      // data.responseJSON.forEach(function(messageObj) {
      //   var message = {};
      //   message.username = messageObj.username;
      //   message.text = messageObj.text;
      //   message.roomname = messageObj.roomname;
      //   app.renderMessage(message);
      // });
      messageArr = data;
      messageArr.results.reverse();
      messageArr.results.forEach(function(messageObj) {
        message.username = messageObj.username;
        message.text = messageObj.text;
        message.roomname = messageObj.roomname;
        message.date = new Date(messageObj.createdAt);
        app.renderMessage(message);
      });
      console.log('Success', data);
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
  //if (friends.includes(message.username))
    // var element = `<div class=\"messageBox\"><p class=\"username ${roomName}\"><strong>${message.username}</strong></p><p class=\"messageText\">${message.text}</p></div>`;
  //else
    // var element = `<div class=\"messageBox\"><p class=\"username ${roomName}\">${message.username}</p><p class=\"messageText\">${message.text}</p></div>`;

  // LESSON: ESCAPE THE HTML BY MANUALLY SETTING THE VALUES OF HTML ATTRIBUTES (potential issue: won't this reset all the attributes in the DOM? For roomname)
  //ADD username via $('...').text. NOTE: YES ===> this does reset ALL messages to one username
  // $('#chats .username').text(message.username);

  /*
  <div class="messageBox">
    <p class="username ${roomName}">${message.username}</p>
    <p class="messageText">${message.text}</p>
    <p class="timeCreatedAt">${message.createdAt}</p>
  </div>


  */

  var element = `<div class=\"messageBox\"><p class=\"username ${escapeHtml(message.roomname)}\">${escapeHtml(message.username)}</p><p class=\"messageText\">${escapeHtml(message.text)}</p><p class\"createdAt\">${message.date.toUTCString()}</p></div>`;
  $('#chats').append(element);

  $('.username').click(app.handleUsernameClick);
};

app.renderRoom = (roomName) => {
  //SHOULD THIS FUNCTION JUST ADD ROOM TO DROPDOWN, OR (on select of dropdown option) CLEAR ALL MESSAGES BUT THOSE BELONGING TO ROOM?
  //solution to rendering only messages belonging to current room ===> filter during app.fetch() and only renderMessage on messages that have same room
  var roomToAdd = $("#room").val();
  var element = `<option value=\"${roomToAdd}\">${roomToAdd}</li>`;
  $('#roomSelect').append(element);
};

app.handleUsernameClick = () => {
  //add username to global array (friends)
};

//ON CHANGE OF SELECT DROPDOWN
app.handleRoomChange = () => {

}


app.handleSubmit = () => {
  // console.log('handleSubmit');
  // parse input data ==> store into message
  var message = {};
  message.username = window.location.search.slice(10);
  message.text = $("#message").val();
  // message.text = messageText;
  message.roomname = $("#roomSelect").val(); //how to select currently chosen dropdown
  app.send(message);

};


//CALLBACK: this binding. parameters
// $(document).ready(function() {
//   app.init();
// });