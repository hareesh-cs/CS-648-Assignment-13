import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import ProductTable from './ProductTable';
import ProductForm from './ProductForm';

function Product() {
  const [products, setProducts] = useState([]);
  const [filterText, setFilterText] = useState('');

  // Fetch products on component load
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5001/product/get'); // Updated endpoint
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSave = async (newProduct) => {
    try {
      const response = await fetch('http://localhost:5001/product/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        fetchProducts(); // Refresh the product list
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5001/product/delete/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchProducts(); // Refresh the product list
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdate = async (productId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:5001/product/update/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        fetchProducts(); // Refresh the product list
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <Filter filterText={filterText} onFilter={(text) => setFilterText(text)} />
      <ProductTable
        products={products}
        filterText={filterText}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
      <ProductForm onSave={handleSave} />
    </div>
  );
}

export default Product;
