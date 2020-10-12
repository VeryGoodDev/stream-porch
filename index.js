const express = require(`express`)
// TODO: Add service worker for easier phone access
const app = express()
app.use(express.static(`${__dirname}/assets`))
app.get(`/`, (req, res) => {
  res.sendFile(`${__dirname}/views/stream-porch.html`)
})
app.get(`/porch-handler`, (req, res) => {
  res.sendFile(`${__dirname}/views/stream-porch-handler.html`)
})
app.get(`/service-worker.js`, (req, res) => {
  res.set(`Content-Type`, `application/javascript`).sendFile(`${__dirname}/service-worker.js`)
})
app.get(`/manifest.json`, (req, res) => {
  res.set(`Content-Type`, `application/json`).sendFile(`${__dirname}/manifest.json`)
})
const server = require(`http`).createServer(app)

const options = {
  /* ... */
}
const io = require(`socket.io`)(server, options)

io.on(`connection`, socket => {
  // socket.room = `stream-porch`
  socket.join(`stream-porch`, () => console.log(`Joined stream-porch room`))
  socket.on(`requestAction`, action => {
    console.log(`action requested`, action)
    socket.to(`stream-porch`).emit(`handleAction`, action)
  })
})

server.listen(9000, () => {
  console.info(`Server now running on http://localhost:9000`)
})
