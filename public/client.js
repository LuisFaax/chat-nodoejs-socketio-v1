(function(d, io, $){
	'use strict'

	var  io= io();
 	
 	//cuando enviamos un mensaje, se  realiza un emit al server para que a su vez 
 	//haga un broadcast con el emit a todos los usuarios conectados
	$('#chat-form').on('submit', function(event) {
		event.preventDefault();
		io.emit('new message', $('.msg').val());
		$('.msg').val('');
		return false; 
	})

	//cuando ingresa un nuevo usuario al chat, mostramos notificacion
	io.on('new user', function(newUser) {
		Push.create("info", {
			body: newUser.message,
			icon:"/img/info.png",
			timeout: 3500,
			onClick: function() {
				window.focus();
				this.close();
			}
		});
	});


	// cuando recibimos el emit del server, mostramos el mensaje recibido
	io.on('user says', function(userSays) {		
		var posclass, posTime, Time = moment().calendar();
		var elemcls = $('.chat').children().last().attr('class');
		
   		
   		if(elemcls === undefined || elemcls ===null){
   			posclass='left'; 
   			posTime='right';   				
   		}
   		else {			
		posclass=(elemcls=='direct-chat-msg left' ? 'right': 'left');
		posTime=(posclass=='left' ? 'right': 'left');
		
		}


		$('.chat').append(
			`<div id='chat-box' class='direct-chat-msg ${posclass}'>
              <div class="direct-chat-info clearfix">
                <span class='direct-chat-name pull-${posclass}'>User</span>
                <span class='direct-chat-timestamp pull-${posTime}'>${Time}</span>
              </div>              
              <img class='direct-chat-img' src='img/boy.png'>              
              <div class='direct-chat-text'>
                ${userSays}
              </div>              
            </div>`
			)
		

	})


//cuando un usuario sale del chat,  mostramos notificacion
	io.on('user left chat', function(leftUser) {		
		Push.create("info", {
			body: leftUser.message,
			icon:"/img/info.png",
			timeout: 3500,
			onClick: function() {
				window.focus();
				this.close();
			}
		});
	});



})(document, io, jQuery)