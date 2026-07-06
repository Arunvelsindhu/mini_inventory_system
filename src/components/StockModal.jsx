import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

function StockModal({

    product,
    type,
    fetchProducts,
    onClose

}) {

    const [quantity, setQuantity] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {

        if (!quantity || Number(quantity) <= 0) {

            toast.error("Enter a valid quantity");
            return;

        }

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const endpoint =
                type === "in"
                    ? "stock-in"
                    : "stock-out";

            await api.put(

                `/products/${product.id}/${endpoint}`,

                {
                    quantity: Number(quantity)
                },

                {
                    headers: {

                        Authorization: `Bearer ${token}`

                    }
                }

            );

            toast.success(

                type === "in"
                    ? "Stock Added Successfully"
                    : "Stock Removed Successfully"

            );

            fetchProducts();

            onClose();

        } catch (error) {

            console.log(error);

            toast.error(

                error.response?.data?.message ||
                "Operation Failed"

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="modal-overlay">

            <div className="stock-modal">

                <h2>

                    {type === "in"
                        ? "📦 Stock In"
                        : "📤 Stock Out"}

                </h2>

                <p>

                    <strong>Product :</strong>

                    {" "}

                    {product.name}

                </p>

                <p>

                    <strong>Current Stock :</strong>

                    {" "}

                    {product.stock}

                </p>

                <input

                    type="number"

                    placeholder="Enter Quantity"

                    value={quantity}

                    onChange={(e) =>
                        setQuantity(e.target.value)
                    }

                />

                <div className="modal-buttons">

                    <button

                        className="save-btn"

                        disabled={loading}

                        onClick={handleSubmit}

                    >

                        {loading
                            ? "Please Wait..."
                            : type === "in"
                                ? "Add Stock"
                                : "Remove Stock"}

                    </button>

                    <button

                        className="cancel-btn"

                        onClick={onClose}

                    >

                        Cancel

                    </button>

                </div>

            </div>

        </div>

    );

}

export default StockModal;