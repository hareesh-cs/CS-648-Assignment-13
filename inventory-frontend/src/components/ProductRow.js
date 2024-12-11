import React from 'react';

class ProductRow extends React.Component {
  constructor(props) {
    super(props);
    this.destroy = this.destroy.bind(this);
  }

  destroy() {
    this.props.onDestroy(this.props.product.id);
  }

  render() {
    const { product } = this.props;
    return (
      <tr>
        <td>{product.name}</td>
        <td>{product.category}</td>
        <td>{product.price}</td>
        <td>
          <button onClick={this.destroy} className="btn btn-outline-danger btn-sm">
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default ProductRow;
