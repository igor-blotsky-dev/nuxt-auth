const app = require('./app')

app.get('/', (req, res) => {
  res.json({
    it: 'works!'
  })
})


module.exports = {
  path: '/api',
  handler: app
}
