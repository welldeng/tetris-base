const app = require('express')()
const http = require('http').createServer()
const io = require('socket.io')(http)

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// })

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.emit('news', { hello: 'world' })
  socket.on('my ohter event', function (data) {
    console.log(data)
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})
