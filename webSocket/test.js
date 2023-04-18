
const socket = io('http://localhost:3000' , {auth: {token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MzhjZjFhM2I2ZTU3ZjhjYjZjMmY2NiIsImlhdCI6MTY4MTgyMTY2MywiZXhwIjoxNjgxOTA4MDYzfQ.enwrHQncnWSLemFnTT2rfANBOVYGpoOgDLx-Dw5y7Y0'}});
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const messageContainer = document.getElementById('message-container')

function logIn(){
    socket.on('connect', () => {
        appendMessage(`You are connected with id: ${socket.id}`)
        
        })    
}
socket.on('activity-added', data => {
    appendMessage(data)
    console.log(data)
    })
    
socket.on('connect_error', (error)=>{
    appendMessage(error)
})
socket.on('log-out', (data)=>{
    appendMessage(data )

})
function logout() {
    console.log('logout')
    socket.emit('logout');

    localStorage.removeItem('token');
    }
messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = {
         userId : '64301d785bf9490eb2f6e8a6',
        order : 1,
        steps : 500,
        avgPace : 50,
        sleep : 3,
        calories : 540,
        coveredSteps :400,
        avgHeartRate : 62,
        coveredDistance : 30
    }
    

    socket.emit('add-activity', message, socket.id);
    messageInput.value = ''
  })

function appendMessage(message) {
const messageElement = document.createElement('div')
messageElement.innerText = message
messageContainer.append(messageElement)
}