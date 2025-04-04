const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api/products', productRoutes);

// Endpoint de prueba
app.get('/', (req, res) => {
    res.send('Servidor corriendo correctamente');
});

// Endpoint de login
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        const jwt = require('jsonwebtoken');
        const token = jwt.sign({ isAdmin: true, username }, process.env.JWT_SECRET, { expiresIn: '2h' });
        return res.json({ token });
    }
    res.status(401).json({ message: 'Credenciales inválidas' });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});