import { useState } from "react";
import "./AddProductModal.css";
import { Product } from "../redux/models/Product";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/productSlice";
import { Image } from "../redux/models/Image";

const AddProductModal = ({ isOpen, onClose, products }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState<Image>({ url: "" });
  const [productInfo, setProductInfo] = useState<Product>({
    id: products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 1,
    title: "",
    price: 0,
    brand: "",
    category: "",
    thumbnail: "",
    stock: 0,
  });  

  const handleAddProduct = () => {
    // Add your logic to add a product
    dispatch(addProduct(productInfo));

    onClose(); // Close the modal after adding the product
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductInfo((prevProductInfo) => ({
      ...prevProductInfo,
      [name]: value,
    }));
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Add Product</h2>
        <label htmlFor="title">Product Name</label>
        <input
          type="text"
          name="title"
          onChange={handleInputChange}
          placeholder="Product Name"
          required
        />

        <label htmlFor="category">Category</label>
        <input
          type="text"
          name="category"
          id="category"
          placeholder="Category e.g: smarthphones"
          onChange={handleInputChange}
          required
        />

        <label htmlFor="thumbnail">Img for Thumbnail</label>
        <input
          type="text"
          placeholder="Thumbnail url"
          name="thumbnail"
          id="thumbnail"
          onChange={handleInputChange}
          required
        />

        <label htmlFor="price"></label>
        <input
          type="number"
          min={0}
          name="price"
          id="price"
          placeholder="Price"
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          id="brand"
          name="brand"
          placeholder="Brand name"
          onChange={handleInputChange}
          required
        />

        <label htmlFor="stock">Stock</label>
        <input
          type="number"
          min={0}
          name="stock"
          id="stock"
          placeholder="Items on stock"
          onChange={handleInputChange}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  );
};

export default AddProductModal;
