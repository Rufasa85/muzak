const express =require("express");
const path = require("path")
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})

const apiSongsRoutes  = require("./controllers/apiSongsController");
app.use("/api/songs",apiSongsRoutes);

const apiAlbumsRoutes  = require("./controllers/apiAlbumsController");
app.use("/api/albums",apiAlbumsRoutes);


app.listen(PORT, ()=>{
    console.log("listenin!")
})