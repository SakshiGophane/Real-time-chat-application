const express = require("express");
const app = express();
const http = require("http"); // want to attach socket so we add http module
const { Server } =require("socket.io");

const server = http.createServer(app);
const port =8000;
const io = new Server(server);


// handle 
io.on('connection',(socket)=>{
    console.log("new user connected...",socket.id);       

    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
});



// express stuff
app.use("/static" , express.static("static"));

// route end pt for get
app.get("/",(req,response)=>{
    response.sendFile(__dirname + ("/index.html"));
    // response.send("hello world");
})


server.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})



// bidirection communication
