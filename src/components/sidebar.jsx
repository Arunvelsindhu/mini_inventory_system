import { NavLink } from "react-router-dom";

import {
    FaHome,
    FaBoxOpen,
    FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {

    return (

        <div className="sidebar">

            <div className="sidebar-logo">

                <h2>📦 InventoryPro</h2>

            </div>

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

            <div className="logout-section">

                <NavLink
                    to="/"
                    className="logout-link"
                >

                    <FaSignOutAlt className="menu-icon" />

                    <span>Logout</span>

                </NavLink>

            </div>

        </div>

    );

}

export default Sidebar;