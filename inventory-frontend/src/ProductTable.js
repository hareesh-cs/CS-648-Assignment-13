import React from 'react';
import ProductRow from './ProductRow';

function ProductTable({ products, filterText, onDelete, onUpdate }) {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>In Stock</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredProducts.map((product) => (
          <ProductRow
            key={product.productId}
            product={product}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </tbody>
    </table>
  );
}

export default ProductTable;
