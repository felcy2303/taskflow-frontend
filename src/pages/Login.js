import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);

      alert("Login Success");

      navigate("/dashboard");

    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
  <div className="container">
    <h1>TaskFlow Login</h1>

    <input type="email" name="email" placeholder="Email" onChange={handleChange} />
    <input type="password" name="password" placeholder="Password" onChange={handleChange} />

    <button onClick={handleLogin}>Login</button>

    <p>
      New user? <Link to="/register">Register</Link>
    </p>
  </div>
);
}

export default Login;