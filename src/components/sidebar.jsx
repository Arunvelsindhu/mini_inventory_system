import { NavLink, useNavigate } from "react-router-dom";

import {
    FaHome,
    FaBoxOpen,
    FaSignOutAlt,
    FaUserCircle
} from "react-icons/fa";

function Sidebar() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };

    return (

        <div className="sidebar">

            {/* Logo */}

            <div className="sidebar-logo">

                <h2>📦 InventoryPro</h2>

                <p>Inventory Management System</p>

            </div>

            {/* User */}

            <div className="sidebar-user">

                <FaUserCircle className="user-icon" />

                <h3>{user?.username}</h3>

                <span>{user?.role}</span>

            </div>

            {/* Menu */}

            <p className="menu-title">

                MAIN MENU

            </p>

            <ul>

                <li>

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            isActive ? "active-link" : ""
                        }
                    >

                        <FaHome className="menu-icon" />

                        <span>Dashboard</span>

                    </NavLink>

                </li>

                <li>

                    <NavLink
                        to="/products"
                        className={({ isActive }) =>
                            isActive ? "active-link" : ""
                        }
                    >

                        <FaBoxOpen className="menu-icon" />

                        <span>Products</span>

                    </NavLink>

                </li>

            </ul>

            {/* Footer */}

            <div className="logout-section">

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >

                    <FaSignOutAlt className="menu-icon" />

                    Logout

                </button>

                <p className="version">

                    Version 1.0

                </p>

            </div>

        </div>

    );

}

export default Sidebar;