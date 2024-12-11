import React, { useState } from "react";

const RESET_VALUES = { productId: "", category: "", price: "", name: "", instock: true };

function ProductForm({ onSave }) {
  const [product, setProduct] = useState({ ...RESET_VALUES });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: name === "instock" ? value === "true" : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!product.name) newErrors.name = "Name is required";
    if (!product.category) newErrors.category = "Category is required";
    if (!product.price || product.price <= 0) newErrors.price = "Valid price is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave({ ...product, productId: Date.now() });
      setProduct({ ...RESET_VALUES });
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h4 className="text-center mb-4 fw-bold text-primary">Add a New Product</h4>
      <div className="row g-4">
        <div className="col-md-6">
          <label className="form-label fw-bold">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Category</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className={`form-control ${errors.category ? "is-invalid" : ""}`}
          />
          {errors.category && <div className="invalid-feedback">{errors.category}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Price ($)</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
          />
          {errors.price && <div className="invalid-feedback">{errors.price}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label fw-bold">Stock Availability</label>
          <select
            name="instock"
            value={product.instock}
            onChange={handleChange}
            className="form-select"
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <button type="submit" className="btn btn-primary btn-lg">
          Save Product
        </button>
      </div>
    </form>
  );
}

export default ProductForm;
