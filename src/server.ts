import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import corsMiddleware from './middleware/corsMiddleware';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3001;
try {
    mongoose.connect('mongodb+srv://mpmayur2251998:DM1Qv37pUTlWovTD@cluster0.mlfkoez.mongodb.net/database?retryWrites=true&w=majority', {
    
});
console.log("DBconnected");
}catch(e){
    console.log(e);
}




app.use(corsMiddleware);
app.use(bodyParser.json());
app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
