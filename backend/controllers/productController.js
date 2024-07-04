const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  const { title, description, images } = req.body;
  try {
    const product = new Product({
      user: req.user.id,
      title,
      description,
      images,
      approved: true // Aprobar automáticamente para pruebas
    });
    await product.save();
    res.status(201).json({ message: 'Producto creado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProducts = async (req, res) => {
  const searchTerm = req.query.search || '';
  try {
    const query = searchTerm
      ? { approved: true, title: { $regex: searchTerm, $options: 'i' } }
      : { approved: true };
    const products = await Product.find(query).populate('user', 'email');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
exports.getProductId = async (req, res) => {
    try {
      const products = await Product.find({ user: req.user.id });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  exports.editProduct = async (req, res) => {
    const { title, description, images } = req.body;
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        product.title = title;
        product.description = description;
        product.images = images;
        await product.save();
        res.status(200).json({ message: 'Producto actualizado correctamente' });
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        await product.remove();
        res.status(200).json({ message: 'Producto eliminado correctamente' });
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};
