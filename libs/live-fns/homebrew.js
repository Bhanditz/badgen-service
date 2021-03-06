const got = require('../got.js')
const semColor = require('../utils/sem-color.js')
const v = require('../utils/version-formatter.js')

module.exports = async (topic, ...args) => {
  const endpoint = `https://formulae.brew.sh/api/formula/${args[0]}.json`
  const { versions } = await got(endpoint).then(res => res.body)

  switch (topic) {
    case 'v':
      return {
        subject: 'homebrew',
        status: v(versions.stable),
        color: semColor(versions.stable)
      }
    default:
      return {
        subject: 'homebrew',
        status: 'unknown',
        color: 'grey'
      }
  }
}
