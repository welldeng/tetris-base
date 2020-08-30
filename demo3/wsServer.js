const ws = require('nodejs-websocket')

const PORT = 3000

let clientCount = 0

const server = ws.createServer(function (conn) {
  console.log('new connection')
  clientCount++
  conn.nickname = 'user' + clientCount
  broadcast(conn.nickname + ' comes in')
  conn.on('text', function (str) {
    console.log('received' + str)
    broadcast(str)
  })
  conn.on('close', function (code, reason) {
    console.log('connection closed')
    broadcast(conn.nickname + ' left')
  })
  conn.on('error', function (err) {
    console.log(err)
  })

}).listen(PORT)

console.log('websocket server listening on port' + PORT)

function broadcast (str) {
  server.connections.forEach((connection) => {
    connection.sendText(str)
  })
}
