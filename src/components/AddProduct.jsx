import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import {
    FaBox,
    FaBarcode,
    FaTags,
    FaRupeeSign,
    FaWarehouse,
    FaExclamationTriangle,
    FaPlus,
    FaUndo
} from "react-icons/fa";

function AddProduct({ fetchProducts }) {

    const [loading, setLoading] = useState(false);

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

    const resetForm = () => {
        setProduct({
            name: "",
            sku: "",
            category: "",
            price: "",
            stock: "",
            low_stock_limit: ""
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const token = localStorage.getItem("token");

            await api.post(
                "/products",
                product,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            toast.success("✅ Product Added Successfully");

            resetForm();

            fetchProducts();

        } catch (err) {

            toast.error("❌ Failed to Add Product");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="add-product-card">

            <div className="form-title">

                <h2>Add New Product</h2>

                <p>Enter product information below.</p>

            </div>

            <form className="add-form" onSubmit={handleSubmit}>

                <div className="input-group">

                    <FaBox />

                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="input-group">

                    <FaBarcode />

                    <input
                        type="text"
                        name="sku"
                        placeholder="SKU Code"
                        value={product.sku}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="input-group">

                    <FaTags />

                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={product.category}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="input-group">

                    <FaRupeeSign />

                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={product.price}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="input-group">

                    <FaWarehouse />

                    <input
                        type="number"
                        name="stock"
                        placeholder="Stock Quantity"
                        value={product.stock}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="input-group">

                    <FaExclamationTriangle />

                    <input
                        type="number"
                        name="low_stock_limit"
                        placeholder="Low Stock Limit"
                        value={product.low_stock_limit}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="button-group">

                    <button
                        type="submit"
                        className="add-btn"
                        disabled={loading}
                    >
                        <FaPlus />
                        {loading ? " Adding..." : " Add Product"}
                    </button>

                    <button
                        type="button"
                        className="reset-btn"
                        onClick={resetForm}
                    >
                        <FaUndo />
                        Reset
                    </button>

                </div>

            </form>

        </div>

    );

}

export default AddProduct;