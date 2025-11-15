import express from 'express';

const app = express()


app.get('/',(req,res)=>{
    res.send({"message":"Hello, World"})
})

app.post('/chatbot/ask', (req,res)=>{
    res.send({"Response":"Structured Data"})
})

app.listen(3004)