import express  from "express";

const app = express();

app.get('/', (req,res) => {
    res.json({
        message: "Hello, TS"
    })
})

app.listen(3000, ()=>{
    console.log("Listning at 3000");
});
