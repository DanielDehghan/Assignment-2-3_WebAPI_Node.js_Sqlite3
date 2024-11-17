import express from 'express';
import greetingsRoutes from './routes/greetings.js';


const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/greeting', greetingsRoutes);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})