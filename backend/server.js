import express from 'express';
import dotenv from 'dotenv'
import authRoutes from './routes/auth.routes.js'

dotenv.config();
const PORT = process.env.PORT || 5000
const app = express();

app.listen(PORT,()=>console.log(`Server is running on ${PORT}`));

app.get('/',(req,res)=>{
    res.send("Hello World!")
});

app.use('/api/auth',authRoutes)