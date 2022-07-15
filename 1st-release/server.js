import express from 'express'
import http from 'http'
import createGame from './public/game.js'

import {Socket} from 'socket.io'; 

const app = express()
const server = http.createServer(app)
const sockets = new Socket(server)

app.use(express.static('public'))

const game = createGame()

game.addPlayer({playerId: 'player1', playerX: 0, playerY:0})
game.addPlayer({playerId: 'player2', playerX: 8, playerY:0})
game.addPlayer({playerId: 'player3', playerX: 5, playerY:0})
game.addFruit({fruitId: 'fruit1', fruitX: 3, fruitY:3})
game.addFruit({fruitId: 'fruit2', fruitX: 6, fruitY:3})

game.movePlayer({playerId: 'player1', keyPressed: 'ArrowRight'})

console.log(game.state)

sockets.on('connecition', (socket) => {
    const playerId = socket.id
    console.log( `> Player connected on Server with id ${playerId}` )
})

server.listen(3000, () => {
    console.log(`> server listening on port: 3000`)
})