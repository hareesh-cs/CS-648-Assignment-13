const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// MongoDB connection
const dbUrl = 'mongodb+srv://hareeshcs:Test123@inventory.69gpd.mongodb.net/?retryWrites=true&w=majority&appName=Inventory';
mongoose.connect(dbUrl)
  .then(() => console.log('MongoDB database connection successful'))
  .catch((err) => console.error('MongoDB database connection error:', err));

// Mongoose schema and model
const Product = mongoose.model('Product', {
  productId: Number,
  category: String,
  price: Number,
  name: String,
  instock: Boolean,
});

// Endpoints

// Get all products
app.get('/product/get', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Error fetching products');
  }
});

// Create a new product
app.post('/product/create', async (req, res) => {
  const { productId, category, price, name, instock } = req.body;
  const product = new Product({ productId, category, price, name, instock });

  try {
    await product.save(); // Use async/await instead of callbacks
    res.status(200).send('Product created successfully');
  } catch (err) {
    console.error('Error saving product:', err);
    res.status(500).send('Error saving product');
  }
});

// Delete a product by ID
app.delete('/product/delete/:productId', async (req, res) => {
  try {
    await Product.deleteOne({ productId: req.params.productId });
    res.status(200).send('Product deleted successfully');
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).send('Error deleting product');
  }
});

// Update a product by ID
app.put('/product/update/:productId', async (req, res) => {
  const { category, price, name, instock } = req.body;
  try {
    await Product.findOneAndUpdate(
      { productId: req.params.productId },
      { category, price, name, instock },
      { upsert: false }
    );
    res.status(200).send('Product updated successfully');
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).send('Error updating product');
  }
});

// Start the server
const PORT = 5001; // Adjust as needed
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
