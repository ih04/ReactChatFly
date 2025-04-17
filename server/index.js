import express from 'express'
import {Server} from 'socket.io'
import http from 'http'

const app = express()
const puerto = 4000
const server = http.createServer(app)

const soc = new Server(server)

soc.on('connection', socket => {
    console.log(socket.id)

    socket.on('message', (cuerpo)=> {
        // console.log(cuerpo)
        socket.broadcast.emit('message',{
            cuerpo,
            from: socket.id.slice(6)
        })
    })
})

server.listen(puerto)
console.log('El servidor está en el puerto',puerto)