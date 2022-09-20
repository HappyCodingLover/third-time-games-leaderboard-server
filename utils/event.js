const { events } = require('../constructor')

// find event by name
const getEventByName = (event_name) => {
  return events.find(({ name }) => name === event_name)
}

module.exports = {
  getEventByName,
}
