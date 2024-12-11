import React, { useState } from 'react';

const RESET_VALUES = { productId: '', category: '', price: '', name: '', instock: true };

function ProductForm({ onSave }) {
  const [product, setProduct] = useState({ ...RESET_VALUES });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: name === 'instock' ? value === 'true' : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...product, productId: Date.now() }); // Generate a unique productId
    setProduct({ ...RESET_VALUES }); // Reset the form
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-3">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label>Category</label>
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label>In Stock</label>
        <select
          name="instock"
          value={product.instock}
          onChange={handleChange}
          className="form-control"
        >
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
}

export default ProductForm;
