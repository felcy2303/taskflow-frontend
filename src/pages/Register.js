import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {
    try {
      await axios.post(
        "http://taskflow-backend-7xaw.onrender.com/api/auth/register",
        form
      );

      alert("Registered Successfully");
      navigate("/");

    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
  <div className="container">
    <h1>Create Account</h1>

    <input type="text" name="name" placeholder="Name" onChange={handleChange} />
    <input type="email" name="email" placeholder="Email" onChange={handleChange} />
    <input type="password" name="password" placeholder="Password" onChange={handleChange} />

    <button onClick={handleRegister}>Register</button>

    <p>
      Already user? <Link to="/">Login</Link>
    </p>
  </div>
);
}

export default Register;
