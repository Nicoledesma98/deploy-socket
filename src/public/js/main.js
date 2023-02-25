
const socket = io()
let user

Swal.fire({
  title: 'inicia sesion',
  input:'text',
  text: 'Por favor inicie sesion para continuar',
  inputValidator: (valor) => {
    return !valor && 'ingrese un valor valido'
  },
  allowOutsideClick: false
}).then(resultado => {
  user = resultado.value
  console.log(user)
})

chatBox.addEventListener('keyup',(e) =>{
  if(e.key === 'Enter'){
    if(chatBox.value.trim().length > 0){
      socket.emit('mensaje',{usuario:user,info: chatBox.value})
      chatBox.value = ""
    }
  }
})

socket.on('mensajeLogs',info =>{
  messageLogs.innerHTML = ''
  info.forEach(mensaje => {
    messageLogs.innerHTML += `<p>${mensaje.usuario} dice: ${mensaje.info}</p>`
    
  });
})
// socket.emit('mensaje','hola, estoy desde websocket')

// socket.on('evento-admin', datos =>{
//     console.log(datos)
// })

// socket.on('evento-general', datos =>{
//     console.log(datos)
// })