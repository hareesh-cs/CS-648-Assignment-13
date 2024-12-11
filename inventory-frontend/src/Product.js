import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";

function Product() {
  const [products, setProducts] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch products from the backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5001/product/get");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (newProduct) => {
    setLoading(true);
    try {
      await fetch("http://localhost:5001/product/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setLoading(true);
      try {
        await fetch(`http://localhost:5001/product/delete/${productId}`, {
          method: "DELETE",
        });
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleUpdate = async (productId, updatedData) => {
    setLoading(true);
    try {
      await fetch(`http://localhost:5001/product/update/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-center mb-4">Inventory Management</h1>
      <Filter filterText={filterText} onFilter={setFilterText} />
      {loading ? (
        <div className="text-center my-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <ProductTable
          products={products}
          filterText={filterText}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      )}
      <ProductForm onSave={handleSave} />
    </div>
  );
}

export default Product;
