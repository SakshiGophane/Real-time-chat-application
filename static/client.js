const socket = io();    //io is comming form client library


// 1)
let name;
let textarea = document.querySelector("#textarea");   //send msg from textarea
let messageArea = document.querySelector(".msg-area"); // it is a container of msg which include h4 and texts


// 2) prompting
do{
    name = prompt("Please enter your name")
}while(!name)


// 3) checking that key should be enter (pressed) or not , if key is entered then then send msg
textarea.addEventListener('keyup',(e)=>{
    // if we enter key , then send msg
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})


// 4)fun for sending msg
function sendMessage(message){
    // create obj which consist name and msg that who send which msg
    let msg = {
        user : name,
        message : message.trim()
    }

    appendMessage(msg,'outgoing') //display msg on page
    textarea.value = ''
    scrollToBottom()

    // send to server via web socket connection
    socket.emit('message',msg)
}


//  5) fun for which msg should be send
function appendMessage(msg,type){

    let mainDiv = document.createElement('div');  //create div for outgoing/incoming msg 

    let className = type

    // in div add (outgoing/incoming , msg class)
    mainDiv.classList.add(className,'message')

    // markup for showing h4 and para texts
    // where msg = key , 
    // user snd message = in sendmsg we are creating obj which show user name and msg
    let markup = `
        <h4> ${msg.user} </h4>  
        <p> ${msg.message} </p>
    `

    // add markup in div
    mainDiv.innerHTML = markup

    // add div in container
    messageArea.appendChild(mainDiv)

}



// receive msg
// client code it show only in browser not in server

socket.on('message',(msg)=>{
    appendMessage(msg,'incoming')
    scrollToBottom()
})


function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight
}