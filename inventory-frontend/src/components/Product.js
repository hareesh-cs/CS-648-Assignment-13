import React from "react";
import Filter from "./Filter";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";

const PRODUCTS = {
  1: { id: 1, category: "Music", price: "$459.99", name: "Clarinet" },
  2: { id: 2, category: "Music", price: "$5,000", name: "Cello" },
  3: { id: 3, category: "Music", price: "$4,500", name: "Tuba" },
  4: { id: 4, category: "Furniture", price: "$799", name: "Chaise Lounge" },
  5: { id: 5, category: "Furniture", price: "$1,300", name: "Dining Table" },
  6: { id: 6, category: "Furniture", price: "$100", name: "Bean Bag" },
};

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      products: PRODUCTS,
    };
    this.handleFilter = this.handleFilter.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDestroy = this.handleDestroy.bind(this);
  }

  handleFilter(filterText) {
    this.setState({ filterText });
  }

  handleSave(product) {
    const products = { ...this.state.products };
    if (!product.id) {
      product.id = new Date().getTime();
    }
    products[product.id] = product;
    this.setState({ products });
  }

  handleDestroy(productId) {
    const products = { ...this.state.products };
    delete products[productId];
    this.setState({ products });
  }

  render() {
    return (
      <div className="container">
        <div className="card shadow p-4 mb-4">
          <h2 className="text-center">My Inventory</h2>
          <Filter
            filterText={this.state.filterText}
            onFilter={this.handleFilter}
          />
        </div>
        <div className="card shadow p-4 mb-4">
          <ProductTable
            products={this.state.products}
            filterText={this.state.filterText}
            onDestroy={this.handleDestroy}
          />
        </div>
        <div className="card shadow p-4">
          <h4>Add a New Product</h4>
          <ProductForm onSave={this.handleSave} />
        </div>
      </div>
    );
  }
}

export default Products;
