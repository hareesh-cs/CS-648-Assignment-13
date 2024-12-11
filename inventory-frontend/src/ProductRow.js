import React from 'react';

function ProductRow({ product, onDelete, onUpdate }) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.price}</td>
      <td>{product.instock ? 'Yes' : 'No'}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(product.productId)}
        >
          Delete
        </button>
        <button
          className="btn btn-secondary btn-sm ms-2"
          onClick={() => onUpdate(product.productId, { ...product, instock: !product.instock })}
        >
          Toggle Stock
        </button>
      </td>
    </tr>
  );
}

export default ProductRow;
