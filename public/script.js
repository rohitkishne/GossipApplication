let socket = io();

let username = '';

const messageInput = document.getElementById('sender-msg')
const chatContainer = document.getElementById('chat-room');



function getSelectedValue() {
    let radioButtons = document.getElementsByName("gender");
    let selectedValue = null;
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            selectedValue = radioButtons[i].value;
            break;
        }
    }
    return selectedValue;
}

document.getElementById("join-room-btn").addEventListener('click', (event) =>{
    event.preventDefault();
    username = document.getElementById("username").value;
    age = document.getElementById("age").value;
    gender = getSelectedValue();
    console.log(username, age, gender)
    if(username.trim() === '')
    {
        alert('Please Enter Your Name');
    }
    else if(age === '')
    {
        alert('Please Enter Your Age');
    }
    else if(gender === null)
    {
        alert('Please Select Gender');
    }
    else if(username.trim() !== '')
    {
        document.getElementById("registration").style.display = 'none';
        document.getElementById("gossip-container").style.display = 'flex';
    }
})

document.getElementById('send-btn').addEventListener('click',(event)=>{
    event.preventDefault();
    const data = {
        username : username,
        message : messageInput.value
    }

    socket.emit('message', data);

    addMessageSender(data);
})



socket.on('message',(data) =>{
    if(data.username !== username)
    {
        addMessageReciever(data);
    }
})

function addMessageSender(data) {
    console.log(data)
       chatContainer.innerHTML += `
                                    <div class="message sender">${data.username}: ${data.message}</div>
                                `  

        messageInput.value = '';
}


function addMessageReciever(data) {
    chatContainer.innerHTML += `
                                 <div class="message receiver">${data.username}: ${data.message}</div>
                             `  

     messageInput.value = '';
}