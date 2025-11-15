import express from 'express';
import cors from 'cors';
import {router as chat_router} from './routes/chatbot_routes.js';
const app = express()

// Enable CORS for all routes
app.use(cors())

// Parse JSON bodies
app.use(express.json())


app.get('/',(req,res)=>{
    res.send({"message":"Hello, World"})
})

app.post('api/chatbot/ask', (req,res)=>{
    res.send({"Response":"Structured Data"})
})
const chatbotApiRouter = express.Router();
chatbotApiRouter.use("/chatbot",chat_router)
app.use('/api',chatbotApiRouter)
app.listen(3004)