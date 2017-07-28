'use strict'

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server) 

const port = process.env.PORT || 3000 


//middelware ruta al contenido estatico
app.use(express.static(__dirname + '/public')); 


//ruta default
app.get('', (req, res) => {
	res.sendFile(__dirname + index.html)
})

//mostramos en consola el puerto por el cual está escuchando el server
server.listen(port, () =>{
	console.log('Listening on %d', port);
})

//recibimos notificacion cuando un usuario nuevo entra al chat y replicamos a todos los usuarios 
io.on('connection', (socket) =>{
	socket.broadcast.emit('new user' , {message: 'Ha entrado nuevo usuario alchat'}) // enviarmensajea todos menos al origen

	//recibimos mensaje nuevo de los usuarios
	socket.on('new message', (message) => {
		io.emit('user says', message)
	})

//recibimos notificacion cuando un usuario se sale
	socket.on('disconnect', () => {
		console.log('Ha salido un usuario del chat');
		socket.broadcast.emit('user left chat', {message: 'Ha salido un usuario del chat'});
	})

	
})