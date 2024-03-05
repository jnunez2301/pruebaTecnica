/* eslint-disable react-hooks/exhaustive-deps */
import InicioStyles from "./Inicio.module.css";
import { AppDispatch, RootState } from "../../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productSlice";
import React, { useEffect, useState } from "react";
import { Product } from "../../redux/models/Product";
import Pagination from "../../helpers/Pagination";

const Inicio = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.data);
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const itemsPerPage = 6; // Adjust as needed

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(products);
  }, [products]);  

  const handleInputChange = (event) => {
    const value = event.target.value.trim();
    setFilteredData(
      products.filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  if (loading === "pending") {
    return <div>Loading...</div>;
  }

  if (loading === "rejected") {
    return <div>Error: {error}</div>;
  }

  const handlePageChange = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className={InicioStyles.container}>
      <nav>
        <h1>Inventory</h1>
      </nav>
      <main>
        <header>
          <h2>Productos</h2>
          <div className={InicioStyles.searchBar}>
            <div className={InicioStyles.inputContainer}>
              <input
                type="text"
                name="product_search"
                id="product_search"
                onChange={(event) => handleInputChange(event)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-search"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                <path d="M21 21l-6 -6" />
              </svg>
            </div>
            <button className={InicioStyles.addProduct}>Add Product</button>
          </div>
        </header>
        <table>
          <thead>
            <tr>
              <td>
                <input type="checkbox" name="" id="" />
              </td>
              <td>Product Name</td>
              <td>Category</td>
              <td>Brand</td>
              <td>Price</td>
              <td>Stock</td>
            </tr>
          </thead>
          <tbody>
            {/* <td>
                <input type="checkbox" name="" id="" />
              </td>
              <td>Black Shirt</td>
              <td>T-shirt</td>
              <td>iCon</td>
              <td>9.99€</td>
              <td>20</td> */}
            {currentItems.map((product) => (
              <tr key={product.id}>
                <td>
                  <input
                    type="checkbox"
                    name={product.title}
                    id={product.title}
                  />
                </td>
                <td className={InicioStyles.productName}>
                  <img
                    src={`${product.images[0]}`}
                    alt={product.title}
                    width={"64px"}
                  />
                  <p>{product.title}</p>
                </td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={Math.ceil(filteredData.length / itemsPerPage)} onPageChange={handlePageChange} />
      </main>
    </section>
  );
};

export default Inicio;
