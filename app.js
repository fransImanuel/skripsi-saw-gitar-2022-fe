const path = require('path');
const express = require('express');
const port = process.env.PORT || 3001;
const app = express();

const publicPath = path.join(__dirname, 'build');

app.use(express.static(publicPath));

app.get('*', (req, res) => {
   res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, (err) => {
   if(err) return console.log(err);
   console.log(`Server is up on port ${port}!`);
});