const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();

// Use css and js
app.use(express.static('public'));

// Parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// Parse incoming Json
app.use(express.json());


// INDEX ROUTES START
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/index.html'));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
})
// INDEX ROUTES END

app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}!`);
})