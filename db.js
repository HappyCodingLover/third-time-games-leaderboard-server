const mongoose = require('mongoose')

const DB = 'mongodb://localhost:27017/leaderBoard'
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connected..')
  })
