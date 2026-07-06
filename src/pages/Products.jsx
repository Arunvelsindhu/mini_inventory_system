import { useEffect, useState } from "react";
import {
    FaBell,
    FaSearch
} from "react-icons/fa";

import api from "../services/api";
import Sidebar from "../components/Sidebar";
import AddProduct from "../components/AddProduct";
import EditProduct from "../components/EditProduct";
import StockModal from "../components/StockModal";
import Loading from "../components/Loading";
import ConfirmModal from "../components/ConfirmModal";

import exportProductsToExcel from "../utils/exportExcel";
import exportProductsToPDF from "../utils/exportPDF";

import { toast } from "react-toastify";

import "../styles/Products.css";

function Products() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [stockProduct, setStockProduct] = useState(null);

    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    // Delete Modal
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [search]);

    const fetchProducts = async () => {

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await api.get("/products", {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            setProducts(response.data);

        } catch (error) {

            console.log(error);

            toast.error("Failed to fetch products");

        } finally {

            setLoading(false);

        }

    };

    const deleteProduct = async () => {

        try {

            const token = localStorage.getItem("token");

            await api.delete(`/products/${deleteId}`, {

                headers: {
                    Authorization: `Bearer ${token}`
                }

            });

            toast.success("Product Deleted Successfully");

            setShowModal(false);
            setDeleteId(null);

            fetchProducts();

        } catch (error) {

            console.log(error);

            toast.error("Delete Failed");

        }

    };

    const filteredProducts = products.filter((product) => {

        const value = search.toLowerCase();

        return (

            product.name.toLowerCase().includes(value) ||
            product.sku.toLowerCase().includes(value) ||
            product.category.toLowerCase().includes(value)

        );

    });

    const indexOfLastProduct = currentPage * productsPerPage;

    const indexOfFirstProduct =
        indexOfLastProduct - productsPerPage;

    const currentProducts =
        filteredProducts.slice(
            indexOfFirstProduct,
            indexOfLastProduct
        );

    const totalPages =
        Math.ceil(filteredProducts.length / productsPerPage);

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="content">

                {/* Navbar */}

                <div className="navbar">

                    <div className="navbar-left">

                        <h2>Products</h2>

                    </div>

                    <div className="navbar-center">

                        <div className="search-navbar">

                            <FaSearch className="search-icon" />

                            <input
                                type="text"
                                placeholder="Search products..."
                            />

                        </div>

                    </div>

                    <div className="navbar-right">

                        <button className="notification-btn">

                            <FaBell />

                        </button>

                        <div className="navbar-buttons">

                            <button
                                className="excel-btn"
                                onClick={() =>
                                    exportProductsToExcel(filteredProducts)
                                }
                            >
                                📊 Excel
                            </button>

                            <button
                                className="pdf-btn"
                                onClick={() =>
                                    exportProductsToPDF(filteredProducts)
                                }
                            >
                                📄 PDF
                            </button>

                        </div>

                        <div className="profile">

                            <div className="avatar">

                                {user.username.charAt(0).toUpperCase()}

                            </div>

                            <div className="profile-info">

                                <h4>{user.username}</h4>

                                <p>{user.role}</p>

                            </div>

                        </div>

                    </div>

                </div>

                <AddProduct fetchProducts={fetchProducts} />

                <div className="search-box">

                    <input
                        type="text"
                        placeholder="Search by Name, SKU or Category..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                </div>

                {loading ? (

                    <Loading />

                ) : (
                                        <>

                        <table>

                            <thead>

                                <tr>

                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>SKU</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Actions</th>

                                </tr>

                            </thead>

                            <tbody>

                                {currentProducts.map((product) => (

                                    <tr
                                        key={product.id}
                                        className={
                                            product.stock <= product.low_stock_limit
                                                ? "low-stock-row"
                                                : ""
                                        }
                                    >

                                        <td>{product.id}</td>

                                        <td>{product.name}</td>

                                        <td>{product.sku}</td>

                                        <td>{product.category}</td>

                                        <td>
                                            ₹ {Number(product.price).toLocaleString("en-IN")}
                                        </td>

                                        <td>

                                            {product.stock}

                                            {product.stock <= product.low_stock_limit && (

                                                <span className="low-stock-badge">

                                                    Low

                                                </span>

                                            )}

                                        </td>

                                        <td>

                                            <div className="action-buttons">

                                                <button
                                                    className="stock-btn"
                                                    onClick={() =>
                                                        setStockProduct(product)
                                                    }
                                                >
                                                    + Stock
                                                </button>

                                                <button
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        setSelectedProduct(product)
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() => {

                                                        setDeleteId(product.id);
                                                        setShowModal(true);

                                                    }}
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                        <div className="pagination">

                            <button
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage(currentPage - 1)
                                }
                            >
                                Previous
                            </button>

                            <span>

                                Page {currentPage} of {totalPages}

                            </span>

                            <button
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                    setCurrentPage(currentPage + 1)
                                }
                            >
                                Next
                            </button>

                        </div>

                    </>

                )}

                {/* Stock  Modal */}

                {stockProduct && (

                    <StockModal

                        product={stockProduct}
                        type="in"

                        fetchProducts={fetchProducts}

                        onClose={() => setStockProduct(null)}

                    />

                )}

                {/* Edit Product */}

                {selectedProduct && (

                    <EditProduct

                        product={selectedProduct}

                        fetchProducts={fetchProducts}

                        onClose={() => setSelectedProduct(null)}

                    />

                )}

                {/* Delete Confirmation */}

                <ConfirmModal

                    isOpen={showModal}

                    title="Delete Product"

                    message="Are you sure you want to delete this product?"

                    onConfirm={deleteProduct}

                    onCancel={() => {

                        setShowModal(false);
                        setDeleteId(null);

                    }}

                />

            </div>

        </div>

    );

}

export default Products;