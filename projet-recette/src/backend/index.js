const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const  PORT = 3002;
app.use(cors());
app.use(express.json())

// Route to get all ingredients
app.get("/api/get/ingredients", (req,res)=>{
    db.query("SELECT * FROM ingredient", (err,result)=>{
    if(err) {
        console.log(err)
    } 
        res.send(result)
    });
});

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})