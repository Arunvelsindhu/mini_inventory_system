import "../styles/Loading.css";
import { FaBoxes } from "react-icons/fa";

function Loading() {

    return (

        <div className="loading-container">

            <div className="loading-card">

                <div className="loading-logo">

                    <FaBoxes />

                </div>

                <div className="spinner"></div>

                <h2>InventoryPro</h2>

                <p>Loading Dashboard...</p>

                <div className="loading-bar">

                    <div className="loading-progress"></div>

                </div>

            </div>

        </div>

    );

}

export default Loading;