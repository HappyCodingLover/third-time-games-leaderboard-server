const { events } = require('../constructor')

// finds event by name
const getEventByName = (event_name) => {
  return events.find(({ name }) => name === event_name)
}

module.exports = {
  getEventByName,
}
