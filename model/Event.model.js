const { Schema, model } = require('mongoose')
const Gamer = require('./Gamer.model')

const ScoreSchema = new Schema({
  gamer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Gamer,
    require,
    unique: true,
  },
  score: Number,
})

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  scores: [ScoreSchema],
})

const Event = model('Event', EventSchema)

module.exports = Event
