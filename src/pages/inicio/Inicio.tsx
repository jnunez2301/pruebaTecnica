import InicioStyles from "./Inicio.module.css";
import { AppDispatch, RootState } from "../../redux/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productSlice";
import { useEffect, useState, ChangeEvent } from "react";
import Pagination from "../../helpers/Pagination";
import { Product } from "../../redux/models/Product"; 
import AddProductModal from "../../components/AddProductModal";
import { useNavigate } from "react-router-dom";

const Inicio = () => {
  const dispatch: AppDispatch = useDispatch();

  const products: Product[] = useSelector(
    (state: RootState) => state.products.data
  );

  const loading: string = useSelector(
    (state: RootState) => state.products.loading
  );

  const error:string | null = useSelector((state: RootState) => state.products.error);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const itemsPerPage: number = 6;
  const [isOpen, setIsOpen]  = useState(false);
  const navigate = useNavigate();

  const onClose = () => {
    setIsOpen(false);
  }
  const handleNavigation =(id:number) =>{
    navigate(`/product/${id}`)
  }
 

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(products);
  }, [products]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value.trim().toLowerCase();
    if (value === "") {
      setFilteredData(products);
    } else {
      setFilteredData(
        products.filter((product) =>
          product.title.toLowerCase().includes(value)
        )
      );
    }
    setCurrentPage(1);
  };

  if (loading === "pending") {
    return <div>Loading...</div>;
  }

  if (loading === "rejected") {
    return <div>Error: {error}</div>;
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentItems: Product[] = filteredData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );


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
            <button onClick={() => setIsOpen(true)} className={InicioStyles.addProduct}>Add Product</button>
            <AddProductModal isOpen={isOpen} onClose={onClose} products={products}/>
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
            {currentItems.map(
              (
                product: Product // Use Product type here
              ) => (
                <tr key={product.id} onClick={() => handleNavigation(product.id)}>
                  <td>
                    <input
                      type="checkbox"
                      name={product.title}
                      id={product.title}
                    />
                  </td>
                  <td className={InicioStyles.productName}>
                    <img
                      src={`${product.thumbnail}`}
                      alt={product.title}
                      width={"64px"}
                      onError={(e) => {
                        e.target.src = "https://media.istockphoto.com/id/1318420912/es/vector/maqueta-el-tel%C3%A9fono-de-la-pantalla.jpg?s=612x612&w=0&k=20&c=nRGAN8sCm-xwPgsxS77jjG_mG-70O7wCSdUvb189rNI=";
                      }}
                    />
                    <p>{product.title}</p>
                  </td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          onPageChange={handlePageChange}
        />
      </main>
    </section>
  );
};

export default Inicio;
