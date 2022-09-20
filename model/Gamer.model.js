const { Schema, model } = require('mongoose')

const GamerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: Number,
    required: true,
  },
})

const Gamer = model('Gamer', GamerSchema)

module.exports = Gamer
