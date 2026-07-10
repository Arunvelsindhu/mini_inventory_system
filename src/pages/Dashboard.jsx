import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import DashboardCharts from "../components/DashboardCharts";
import api from "../services/api";
import "../styles/Dashboard.css";

import {
    FaBell,
    FaSearch,
    FaBoxOpen,
    FaExclamationTriangle,
    FaTags,
    FaRupeeSign,
    FaSyncAlt
} from "react-icons/fa";

function Dashboard() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [stats, setStats] = useState({
        totalProducts: 0,
        lowStock: 0,
        totalCategories: 0,
        inventoryValue: 0
    });

    const [products, setProducts] = useState([]);

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 17) greeting = "Good Afternoon";

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const token = localStorage.getItem("token");

            const headers = {
                Authorization: `Bearer ${token}`
            };

            const [
                totalProducts,
                lowStock,
                categories,
                inventory,
                productList
            ] = await Promise.all([

                api.get("/dashboard/total-products", { headers }),
                api.get("/dashboard/low-stock", { headers }),
                api.get("/dashboard/categories", { headers }),
                api.get("/dashboard/inventory-value", { headers }),
                api.get("/products", { headers })

            ]);

            setStats({
                totalProducts: totalProducts.data.total,
                lowStock: lowStock.data.total,
                totalCategories: categories.data.total,
                inventoryValue: inventory.data.total || 0
            });

            setProducts(productList.data);

        } catch (err) {
            console.log(err);
        }

    };

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="content">

                {/* Navbar */}

                <div className="navbar">

                    <div>

                        <h2>Inventory Dashboard</h2>

                        <p className="dashboard-date">
                            {today}
                        </p>

                    </div>

                    <div className="navbar-right">

                        <div className="search-navbar">

                            <FaSearch className="search-icon" />

                            <input
                                type="text"
                                placeholder="Search Products..."
                            />

                        </div>

                        <button
                            className="refresh-btn"
                            onClick={loadDashboard}
                        >
                            <FaSyncAlt />
                            &nbsp; Refresh
                        </button>

                        <button className="notification-btn">

                            <FaBell />

                        </button>

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

                {/* Welcome */}

                <div className="welcome">

                    <h1>
                        {greeting}, {user.username} 👋
                    </h1>

                    <p>
                        Welcome back! Here's today's inventory overview.
                    </p>

                    <div className="status-container">

                        <span className="status-badge role-badge">
                            {user.role}
                        </span>

                        <span className="status-badge">
                            {today}
                        </span>

                    </div>

                </div>

                {/* Cards */}

                <div className="cards">

                    <div className="card blue-card">

                        <div className="card-header">

                            <FaBoxOpen className="card-icon" />

                            <span>Total Products</span>

                        </div>

                        <h1>{stats.totalProducts}</h1>

                        <p>Available Products</p>

                    </div>

                    <div className="card orange-card">

                        <div className="card-header">

                            <FaExclamationTriangle className="card-icon" />

                            <span>Low Stock</span>

                        </div>

                        <h1>{stats.lowStock}</h1>

                        <p>Need Restocking</p>

                    </div>

                    <div className="card purple-card">

                        <div className="card-header">

                            <FaTags className="card-icon" />

                            <span>Categories</span>

                        </div>

                        <h1>{stats.totalCategories}</h1>

                        <p>Product Categories</p>

                    </div>

                    <div className="card green-card">

                        <div className="card-header">

                            <FaRupeeSign className="card-icon" />

                            <span>Inventory Value</span>

                        </div>

                        <h1>
                            ₹ {Number(stats.inventoryValue).toLocaleString("en-IN")}
                        </h1>

                        <p>Total Inventory Worth</p>

                    </div>

                </div>

                {/* Charts */}

                <DashboardCharts
                    products={products}
                />

            </div>

        </div>

    );

}

export default Dashboard;