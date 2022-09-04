const express =require('express')

const app =express()

const PORT = process.env.PORT || 3000

const http =require ('http').createServer(app)

http.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})
// exprees ka jo midel vare hota hai vo use karenge
app.use(express.static(__dirname +'/public'))
// ye bataya hai ki static file jo css ki hai vo publicfolder ke anadar hai
app.get('/',(req , res)=>
{
    //res.send('hello world')
    res.sendFile(__dirname+'/index.html')
   // res.sendFile('./index.html', {root: __dirname});
    //res.sendFile('index1.html' , { root : __dirname});
})

// socket

const io = require('socket.io')(http)
// socket.io ko import kiya fir () call kiya or apana server
// http paas kiya ki kon sa server chahiye
io.on('connection', (socket)=>{
    // jese hi broser ya cient connect ho jayega ye function call ho jayega
    console.log('connecte...')
    // yaha socket on kiya or jo message ka msg object aa raha hai vo print kiya
    socket.on('message',(msg)=>{
       socket.broadcast.emit('message',msg)
       // broadcast lka amtalb hota hai jite bhi connectes hai sbko bhejga
    })
})
