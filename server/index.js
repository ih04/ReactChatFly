import express from 'express'
import {Server} from 'socket.io'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
console.log("server/index.js*******************"+"__filename"+"*******************");
console.log("server/index.js*******************"+"__dirname"+"*******************");
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
console.log("server/index.js*******************"+__filename+"*******************");
console.log("server/index.js*******************"+__dirname+"*******************");

//  Servir archivos estáticos del frontend React
app.use(express.static(path.join(__dirname, 'public')))


//  Cualquier otra ruta debe devolver el index.html del frontend
// app.get('*', (req, res) => {
app.get('/{*any}', (req, res) => {
  // __dirname = '/workspace/client'
  console.log("**********Sending file:", path.join(__dirname, 'public', 'index.html'));
    
  // res.sendFile(path.join(__dirname, 'public', 'index.html'))
  res.sendFile(path.join('/workspace/client', 'index.html'))
})

// Por esto para mayor seguridad:
// app.get('*', (req, res) => {
//   const indexPath = path.join(__dirname, 'public', 'index.html');
//   if (fs.existsSync(indexPath)) {
//     res.sendFile(indexPath);
//   } else {
//     res.status(404).send('Archivo no encontrado');
//   }
// })

server.listen(puerto)
console.log('El servidor está en el puerto',puerto)
