import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function AddProduct({ fetchProducts }) {

    const [product, setProduct] = useState({
        name: "",
        sku: "",
        category: "",
        price: "",
        stock: "",
        low_stock_limit: ""
    });

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await api.post("/products", product, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success("Product Added Successfully");

            setProduct({
                name: "",
                sku: "",
                category: "",
                price: "",
                stock: "",
                low_stock_limit: ""
            });

            fetchProducts();

        } catch (error) {

           toast.error("Failed to add product");

        }

    };

    return (

        <form className="add-form" onSubmit={handleSubmit}>

            <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={product.name}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="sku"
                placeholder="SKU"
                value={product.sku}
                onChange={handleChange}
                required
            />

            <input
                type="text"
                name="category"
                placeholder="Category"
                value={product.category}
                onChange={handleChange}
                required
            />

            <input
                type="number"
                name="price"
                placeholder="Price"
                value={product.price}
                onChange={handleChange}
                required
            />

            <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={product.stock}
                onChange={handleChange}
                required
            />

            <input
                type="number"
                name="low_stock_limit"
                placeholder="Low Stock Limit"
                value={product.low_stock_limit}
                onChange={handleChange}
                required
            />

            <button type="submit">
                Add Product
            </button>

        </form>

    );

}

export default AddProduct;