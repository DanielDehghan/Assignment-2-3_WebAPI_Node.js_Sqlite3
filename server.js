const express = require('express');
const greetingsRoutes = require('./routes/greetings');


const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/greeting', greetingsRoutes);


app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})