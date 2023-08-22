import React, { useState } from "react";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "file" ? e.target.files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await LoginUser(formData.email, formData.password);
  };

  const LoginUser = async (email, password) => {
    const body = new FormData();
    body.append("email", email);
    body.append("password", password);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/guest/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: body,
      });

      const data = await response.json();
      console.log(data)
      if (!data.errors) {
        localStorage.setItem("token", data.data.token);
        navigate("/LandingPage");
        return data;
      } else {
        throw new Error("Wrong Email or Password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Online Recipes</h1>

        <p className="header-paragraph">
          Sign in to see recipes from your friends.
        </p>

        <form
          encType="multipart/form-data"
          className="register-form-container"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit">Sign In</button>
          <div className="text-with-lines login">
            <hr className="line" />
            <p className="text">OR</p>
            <hr className="line" />
          </div>
          <p>
            Don't have an account?<Link to={"/"}>Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
