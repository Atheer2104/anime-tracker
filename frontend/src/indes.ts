import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Well done!');
})


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log('The application is listening on port 3000!');
})