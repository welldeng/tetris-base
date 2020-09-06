const http = require('http').createServer()
const io = require('socket.io')(http)

const PORT = 3000

let clientCount = 0

http.listen(PORT)

io.on('connection', function (socket) {
  clientCount++
  socket.nickname = 'user' + clientCount
  io.emit('enter', socket.nickname + ' comes in')

  socket.on('message', function (str) {
    io.emit('message', socket.nickname + ' says： ' + str)
  })

  socket.on('disconnect', function () {
    io.emit('leave', socket.nickname + ' left')
  })
})

console.log('websocket server listening on port' + PORT)
