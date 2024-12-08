const express = require('express')
const { getConection } = require('./db/db-connect-mongo')
const cors = require('cors');
require('dotenv').config();

const app = express()
const port = process.env.PORT;


app.use(cors());
getConection();
app.use(express.json());

app.use('/auth', require('./router/auth'));
app.use('/genero', require('./router/genero'));
app.use('/director', require('./router/director'));
app.use('/productora', require('./router/productora')); 
app.use('/tipo', require('./router/tipo'));
app.use('/media', require('./router/media'));
app.use('/usuario', require('./router/usuario'));


app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);

})
