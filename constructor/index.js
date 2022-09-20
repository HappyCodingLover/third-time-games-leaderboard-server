const Events = require('../constants/Events.json')
const Gamers = require('../constants/Gamers.json')
const { getUniqueRandomNumbers, getRandomScore } = require('../utils')
const events = []

const initEvents = () => {
  Events.forEach((event) => {
    const uniqueNumbers = getUniqueRandomNumbers(10, 0, 1000)

    const scores = uniqueNumbers.map((number) => {
      const gamer = Gamers[number]
      const score = getRandomScore()
      return {
        gamer,
        score,
      }
    })
    events.push({
      ...event,
      scores,
    })
  })
}

const updateEvents = () => {
  events.forEach((event) => {
    let { scores } = event

    const uniqueNumbers = getUniqueRandomNumbers(200, 0, 1000)

    uniqueNumbers.forEach((number) => {
      const gamer = Gamers[number]
      const score = getRandomScore()
      if (scores) {
        const existingScore = scores
          ? scores.find(({ gamer: _gamer }) => gamer && gamer.id === _gamer.id)
          : null
        if (existingScore) {
          existingScore.score += score
        } else {
          scores.push({
            gamer,
            score,
          })
        }
      } else {
        scores = [
          {
            gamer,
            score,
          },
        ]
      }
    })
  })
}

module.exports = {
  events,
  initEvents,
  updateEvents,
}
