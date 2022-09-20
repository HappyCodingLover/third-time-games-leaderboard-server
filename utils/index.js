const getUniqueRandomNumbers = (count = 10, start = 1, end = 100) => {
  const arr = []
  while (arr.length < count) {
    const r = Math.floor(Math.random() * end) + start
    if (arr.indexOf(r) === -1) arr.push(r)
  }
  return arr
}

const getRandomScore = () => {
  const r = Math.floor(Math.random() * 50) * 100 + 100
  return r
}

module.exports = {
  getUniqueRandomNumbers,
  getRandomScore,
}
