const { getEventByName } = require('../utils/event')

const getGamer = (req, res) => {
  try {
    const { event_name, view, page: _page, sortOrder, size } = req.query

    // validates event_name query
    if (!/^[A-Za-z]*$/.test(event_name)) {
      return res
        .status(400)
        .json({ status: 400, message: 'invalid event name' })
    }

    // validates page query
    if (!Number.isInteger(Number(_page)) && Number(_page) > 0) {
      return res.status(400).json({ status: 400, message: 'invalid page' })
    }

    // validates size query
    if (!Number.isInteger(Number(size)) && Number(size) > 0) {
      return res.status(400).json({ status: 400, message: 'invalid size' })
    }

    // validates view query
    if (view !== 'global' && view !== 'hundred') {
      return res.status(400).json({ status: 400, message: 'invalid view' })
    }

    // validates sortOrder query
    if (sortOrder !== '1' && sortOrder !== '-1') {
      return res
        .status(400)
        .json({ status: 400, message: 'invalid sortOrder value' })
    }

    // gets event
    const event = getEventByName(event_name)

    // calculates next page number
    const page = Number(_page)
    let nextPage = page + 1

    if (event) {
      let entities = []
      // checks if event includes gamers with scores
      if (event.scores) {
        // gets gamers data with name, score, avatar
        entities = event.scores.map(({ gamer, score }) => {
          const { id, name, avatar } = gamer
          return {
            id,
            name,
            pic: avatar,
            score,
          }
        })

        // sorts by score
        entities.sort((a, b) => b.score - a.score)

        // adds rank
        entities = entities.map((entity, index) => ({
          ...entity,
          rank: index + 1,
        }))

        if (sortOrder === '1') entities.reverse()
      }

      // paginated data
      if (view === 'global') {
        entities = entities.slice((page - 1) * size, page * size)
        if (entities.length < size) {
          nextPage = -1
        }
        return res.json({
          entities,
          sort: sortOrder === '1' ? 1 : -1,
          nextPage,
        })
      } else if (view === 'hundred') {
        // top 100 gamer data
        entities = entities.slice(0, 100)
        return res.json({
          entities,
          sort: sortOrder === '1' ? 1 : -1,
          nextPage: -1,
        })
      }
    } else {
      return res.status(400).json({ status: 400, message: 'no event' })
    }
  } catch (err) {
    // server error
    return res.status(500).json({ status: 500, message: err.message })
  }
}

module.exports = {
  getGamer,
}
