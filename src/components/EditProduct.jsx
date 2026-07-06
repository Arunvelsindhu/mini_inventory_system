import { useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function EditProduct({ product, fetchProducts, onClose }) {

    const [formData, setFormData] = useState(product);

    useEffect(() => {
        setFormData(product);
    }, [product]);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await api.put(`/products/${product.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success("Product Updated Successfully");

            fetchProducts();

            onClose();

        } catch (error) {

            toast.error("Update Failed");

        }

    };

    return (

        <div className="modal">

            <div className="modal-content">

                <h2>Edit Product</h2>

                <form onSubmit={handleSubmit}>

                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <input
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                    />

                    <input
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                    />

                    <input
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                    />

                    <input
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                    />

                    <input
                        name="low_stock_limit"
                        value={formData.low_stock_limit}
                        onChange={handleChange}
                    />

                    <button type="submit">
                        Update
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                </form>

            </div>

        </div>

    );

}

export default EditProduct;