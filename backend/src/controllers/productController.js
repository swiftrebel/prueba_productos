const db = require('../models/db');

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM products');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
};

// Obtener un producto específico por ID
exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

// Crear un nuevo producto (más adelante se integrará el manejo de imagen y autenticación)
exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, quantity } = req.body;
    // Por ahora, no se maneja la imagen; se integrará AWS S3 y multer posteriormente.
    const query = `
      INSERT INTO products (title, description, price, quantity)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [title, description, price, quantity];
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el producto' });
  }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, quantity } = req.body;
    const query = `
      UPDATE products
      SET title = $1, description = $2, price = $3, quantity = $4
      WHERE id = $5
      RETURNING *
    `;
    const values = [title, description, price, quantity, id];
    const { rows } = await db.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el producto' });
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
    const { rows } = await db.query(query, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el producto' });
  }
};
