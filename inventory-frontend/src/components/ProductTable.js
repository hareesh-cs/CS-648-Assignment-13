import React from 'react';
import ProductRow from './ProductRow';

function ProductTable({ products, filterText, onDestroy }) {
  const rows = Object.keys(products).map((key) => {
    const product = products[key];
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return null;
    }
    return <ProductRow key={product.id} product={product} onDestroy={onDestroy} />;
  });

  return (
    <table className="table table-bordered table-hover shadow-sm">
      <thead className="table-dark">
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default ProductTable;
