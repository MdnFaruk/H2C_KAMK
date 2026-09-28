var mongoose = require('mongoose');

var schema = mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    max: 50
  },
  lastname: {
    type: String,
    required: true,
    max: 50
  },
  nickname: {
    type: String,
    required: true,
    max: 15,
    validate: function (nickname) {
      return /[A-Za-z]/.test(nickname);
    }
  },
  born: { type: Number, required: true },
  died: { type: Number, required: true },
  career: { type: String, required: true },
  img: { type: String, required: true },
  biography: { type: String, required: true }
});

// create the model for presidents and expose it to the application
module.exports = mongoose.model('President', schema);