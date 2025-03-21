import mongoose from "mongoose"  

const URI= "mongodb+srv://dsvidsvnfoo456:j4j1yIPs511YagQK@cluster1a.hfx0r.mongodb.net/MixArt?retryWrites=true&w=majority&appName=Cluster1A"

mongoose.connect(URI)

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("DB is connected")
})

connection.on("disconnected", () =>{
    console.log("DB is disconnected");
})

ConnectionCheckedInEvent.on("error", () =>{
    console.log("Error en la conexión")
})