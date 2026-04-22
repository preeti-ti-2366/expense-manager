import { useEffect, useState } from "react";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [filter, setFilter] = useState("All");

  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "Other"
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
      return;
    }

    const fetchExpenses = async () => {
      try {
        const res = await fetch("https://expense-manager-91hf.onrender.com/api/expenses", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        setExpenses(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExpenses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("https://expense-manager-91hf.onrender.com/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          amount: Number(formData.amount)
        })
      });

      const data = await res.json();

      setExpenses([data, ...expenses]);

      setFormData({
        title: "",
        amount: "",
        category: "Other"
      });

    } catch (error) {
      console.error(error);
    }
  };

  const filteredExpenses =
    filter === "All"
      ? expenses
      : expenses.filter((exp) => exp.category === filter);

  const total = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Dashboard</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <h3>Total: ₹{total}</h3>

      <form onSubmit={handleAddExpense}>
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <input name="amount" type="number" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
        <select name="category" value={formData.category} onChange={handleChange}>
          <option>Food</option>
          <option>Travel</option>
          <option>Bills</option>
          <option>Other</option>
        </select>
        <button>Add</button>
      </form>

      <h3>Filter</h3>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option>All</option>
        <option>Food</option>
        <option>Travel</option>
        <option>Bills</option>
        <option>Other</option>
      </select>

      <ul>
        {filteredExpenses.map((exp) => (
          <li key={exp._id}>
            {exp.title} - ₹{exp.amount} ({exp.category})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;