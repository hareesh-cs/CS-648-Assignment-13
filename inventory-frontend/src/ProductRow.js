import React from "react";

function ProductRow({ product, onDelete, onUpdate }) {
  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>${product.price}</td>
      <td>
        <span
          className={`badge ${product.instock ? "bg-success" : "bg-warning"}`}
        >
          {product.instock ? "Yes" : "No"}
        </span>
      </td>
      <td>
        <button
          className="btn btn-danger btn-sm me-2"
          onClick={() => onDelete(product.productId)}
          title="Delete Product"
        >
          Delete
        </button>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() =>
            onUpdate(product.productId, { ...product, instock: !product.instock })
          }
          title="Toggle Stock Status"
        >
          Toggle Stock
        </button>
      </td>
    </tr>
  );
}

export default ProductRow;
