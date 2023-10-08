import { useState } from "react";
const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" }
];

export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}

function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  function onInStockOnlyChange(value) {
    console.log("value", value);
    setInStockOnly(!value);
  }
  console.log(inStockOnly);
  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={onInStockOnlyChange}
      />
      <ProductCategoryTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange
}) {
  return (
    <div>
      <input
        type="text"
        value={filterText}
        placeholder="search.."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          value={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />{" "}
        Only show product in stocks
      </label>
    </div>
  );
}

function ProductCategoryTable({ products, filterText, inStockOnly }) {
  console.log(inStockOnly);
  let rows = [];
  let lastcategory = null;
  products.map((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }

    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category != lastcategory) {
      rows.push(
        <tr>
          <td style={{ textAlign: "center", fontWeight: "bold" }}>
            {product.category}
          </td>
        </tr>
      );
    }
    rows.push(
      <tr>
        <td style={{ color: !product.stocked && "red" }}>{product.name}</td>
        <td>{product.price}</td>
      </tr>
    );
    lastcategory = product.category;
  });
  return (
    <div>
      <table>
        <th>
          <td>Name</td>
          <td>Price</td>
        </th>
        {rows}
      </table>
    </div>
  );
}
