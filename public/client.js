const socket =io()
// ye jo io aa raha hai client library se use call karna hai
let Name ;
 let textarea=document.querySelector('#textarea')
 let messageArea= document.querySelector('.message_area') // message area class hai esliye 
 // . se call huyi hai
do {
Name =prompt('Please enter your Name : ')
}while(!Name)
// ye jb tak chalega jb tk user name na likh de


textarea.addEventListener('keyup',(e)=>{
    // ye () ek function le raha hai keyup or usme ek event e paas ho raha hai
    // keyup trigger when be press any key from keyboard
    // but hamko jb karna hai jb enter press ho so if condition laga denge
    if(e.key==='Enter'){
        sendMessage(e.target.value)
        //sendmesage function mai jo bhi  text area ke andar hai paas ho jayega
    }
})

function sendMessage(message)
{
    let msg={
        //object bana rahe hai taki message k saath user ka naam bhi send kr sake
        user :Name,
         //prompt se jo naam liya tha vohai ye
        message :message.trim()
     }
     // message ko append karna hai
     appendMessage(msg,'outgoing')   // msg ke saah pata honi chaiye ki kon sa type hai
     // ham enter k bad bhej rahe hai eska matal boutgoing hai
     textarea.value=''
     // jb message append h jaye to text area ko empty string akr do
     scrollToBottom()
     //send to server by web  server
     //emit send karti hai
     socket.emit('message',msg)
}
function appendMessage(msg, type)
{
   let mainDiv =document.createElement('div')
   // ek or div create kiya
   let classNmae=type
   mainDiv.classList.add(classNmae,'message')
   let markup= `
   <h4> ${msg.user}  </h4>
   <p>  ${msg.message} </p>
   `
   // ye msg ek object hai naa else .user user ka naam or . message meesage aa jayeha
   mainDiv.innerHTML=markup
   // main div ke anda ye html ka markup inser kr diya
   messageArea.appendChild(mainDiv)
   // message area mai mainDiv append karna hai
}



// recived message
socket.on('message',(msg)=>{
    //console.log(msg)
    appendMessage(msg,'incoming') 
    scrollToBottom()
})
//event ka naam jo broad cast kiya tha sane bane message

function scrollToBottom()
{
    messageArea.scrollTop=messageArea.scrollHeight
}