import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginAuth.css";

function LoginAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple login logic (replace with real authentication if needed)
    if (email === "admin@moung.com" && password === "123") {
      // Set a token or authentication state in localStorage
      localStorage.setItem("authToken", "yourToken");

      // Log token to check if it was set correctly
      console.log("Token set in localStorage:", localStorage.getItem("authToken"));

      // Navigate to the admin page after a short delay
      setTimeout(() => {
        navigate("/admin");
      }, 100);

      alert("Login Successfully");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="py-4 col-lg-3 col-8 col-md-4 border rounded mx-auto">
          <form onSubmit={handleSubmit}>
            <h1 className="text-center">Login</h1>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary float-right">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginAuth;
