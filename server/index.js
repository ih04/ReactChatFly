import express from 'express'
import {Server} from 'socket.io'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()
const puerto = process.env.PORT || 8000
const server = http.createServer(app)

//const soc = new Server(server)

const soc = new Server(server, {
  cors: {
    origin: '*', // puedes restringir esto si lo necesitas
  }
})

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

//  __dirname workaround para ESModules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//  Servir archivos estáticos del frontend React
app.use(express.static(path.join(__dirname, 'public')))

//  Cualquier otra ruta debe devolver el index.html del frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

server.listen(puerto)
console.log('El servidor está en el puerto',puerto)
