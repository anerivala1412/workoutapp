
const socket = io('http://localhost:3000');
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = {
         userId : '642ebd10bd7c289b4107ff87',
        order : 1,
        steps : 500,
        avgPace : 50,
        sleep : 3,
        calories : 540,
        coveredSteps :400,
        avgHeartRate : 62,
        coveredDistance : 30
    }
    
    appendMessage(`connected with id: ${socket.id} `)
    socket.emit('add-activity', message, socket.id);
    messageInput.value = ''
  })
socket.on('activity-added', data => {
appendMessage(data)
console.log(data)
})

socket.on('log-out', ()=>{
    appendMessage(`user disconnected `)
})
function appendMessage(message) {
const messageElement = document.createElement('div')
messageElement.innerText = message
messageContainer.append(messageElement)
}