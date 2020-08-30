const ws = require('nodejs-websocket')

const PORT = 3000

let clientCount = 0

const server = ws.createServer(function (conn) {
  console.log('new connection')
  clientCount++
  conn.nickname = 'user' + clientCount
  let mes = {}
  mes.type = 'enter'
  mes.data = conn.nickname + ' comes in'
  broadcast(JSON.stringify(mes))
  conn.on('text', function (str) {
    console.log('received' + str)
    let mes = {}
    mes.type = 'message'
    mes.data = conn.nickname + ' says： ' + str
    broadcast(JSON.stringify(mes))
  })
  conn.on('close', function (code, reason) {
    console.log('connection closed')
    let mes = {}
    mes.type = 'leave'
    mes.data = conn.nickname + ' left'
    broadcast(JSON.stringify(mes))
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
