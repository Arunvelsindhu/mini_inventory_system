import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Login.css";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        alert("handleLogin called");
        console.log("Login button clicked");

        try {

            console.log("Sending request...");
            console.log({
                username,
                password
            });

            const response = await api.post("/login", {
                username,
                password
            });

            console.log("Response:", response);

            alert("Login Successful");

            localStorage.setItem("token", response.data.token);
            console.log("Stored Token:", response.data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/dashboard");

        } catch (error) {

            console.log("ERROR:", error);

            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Data:", error.response.data);

                alert(
                    error.response.data.message ||
                    "Server Error"
                );
            } else {
                console.log("Message:", error.message);

                alert(error.message);
            }

        }

    };

    return (
        <div className="login-container">

            <div className="login-card">

                <h1>Inventory Management System</h1>

                <h2>Login</h2>

                <form onSubmit={handleLogin}>

                    <div className="form-group">

                        <label>Username</label>

                        <input
                            type="text"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />

                    </div>

                    <button type="submit">
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;