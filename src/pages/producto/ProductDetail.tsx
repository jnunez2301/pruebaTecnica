import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductById,
  deleteProduct,
  updateProduct,
} from "../../redux/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ProductDetail.module.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector((state) =>
    state.products.data.find((item) => item.id === productId)
  );
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(productId));
      navigate("/");
    }
  };
  const handleEdit = () => {
    console.log("Edit button clicked");
  };

  if (loading === "pending") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className={styles.section}>
      <header onClick={() => navigate('/')}>
        <h2>Iventory</h2>
      </header>

      {product ? (
        <main className={styles.container}>
          <div className={styles.btnContainer}>
            {/* <button className={styles.editBtn} onClick={() => handleEdit()}>Edit</button> */}
            <button className={styles.deleteBtn} onClick={handleDelete}>
              Delete
            </button>
          </div>
          <div>
            <img
              src={product.images ? product.images[0] : ''}
              alt={product.title}
              onError={(e) => {
                e.target.src = "https://media.istockphoto.com/id/1318420912/es/vector/maqueta-el-tel%C3%A9fono-de-la-pantalla.jpg?s=612x612&w=0&k=20&c=nRGAN8sCm-xwPgsxS77jjG_mG-70O7wCSdUvb189rNI=";
              }}
            />
          </div>
          <div>
            <div className={styles.brandBar}>
              <p>{product.brand}</p>
              <p>{product.stock}</p>
            </div>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>Price</p>
            <p
              style={{
                color: "orange",
                fontWeight: "bold",
                fontSize: "24px",
                margin: "1rem 0",
              }}
            >
              {product.price} €
            </p>
          </div>
        </main>
      ) : (
        <div>Product not found</div>
      )}
    </section>
  );
};

export default ProductDetail;
