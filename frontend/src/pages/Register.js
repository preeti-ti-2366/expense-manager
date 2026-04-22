import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://expense-manager-91hf.onrender.com/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      alert(data.message);

    } catch (error) {
      console.error(error);
      alert("Error registering user");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <br />

        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <br />

        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;