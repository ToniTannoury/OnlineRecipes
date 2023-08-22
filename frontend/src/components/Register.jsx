import React, { useState } from "react";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePicture: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "file" ? e.target.files[0] : value,
    });
  };
  const handleProfilePic = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await registerUser(
      formData.name,
      formData.email,
      formData.password,
      formData.profilePicture,
    );
  };

  const registerUser = async (name, email, password, pic_url) => {
    const body = new FormData();
    body.append("name", name);
    body.append("email", email);
    body.append("password", password);
    body.append("image_url", pic_url);

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/guest/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: body,
      });

      const data = await response.json();
      console.log(data)
      if (!data.errors) {
        navigate("/Login");
        return data;
      } else {
        throw new Error("Error Registeering");
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Online Recipes</h1>

        <p className="header-paragraph">
          Sign up to see recepies from your friends.
        </p>

        <form
          encType="multipart/form-data"
          className="register-form-container"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
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
          <input
            type="file"
            name="profilePicture"
            onChange={handleProfilePic}
          />

          <div className="bottom-register">
            <p className="bottom-register-text">
              By signing up, you agree to our Terms, Privacy Policy and Cookies
              Policy.
            </p>

            <button type="submit">Sign Up</button>

            <div className="text-with-lines">
              <hr className="line" />
              <p className="text">OR</p>
              <hr className="line" />
            </div>
            <p>
              Already have an account?<Link to={"/Login"}>Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
