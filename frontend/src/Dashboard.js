import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');

  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    pending: 0,
    completed: 0
  });

  // ================= GET ITEMS =================
  const getItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/items');
      setItems(res.data);
    } catch (err) {
      alert('Error loading items ❌');
    }
  };

  // ================= GET STATS =================
  const getStats = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/stats');
      setStats(res.data);
    } catch (err) {
      alert('Error loading stats ❌');
    }
  };

  // ================= ADD ITEM =================
  const addItem = async () => {
    if (!title || !description) {
      alert('Please fill all fields ❌');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/items', {
        user_id: 1,
        title,
        description,
        status
      });

      alert('Item added ✅');

      setTitle('');
      setDescription('');
      setStatus('active');

      getItems();
      getStats();
    } catch (err) {
      alert('Error adding item ❌');
    }
  };

  // ================= DELETE =================
  const deleteItem = async (id) => {
    if (!window.confirm('Delete this item?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      alert('Deleted ✅');
      getItems();
      getStats();
    } catch (err) {
      alert('Error deleting ❌');
    }
  };

  // ================= UPDATE =================
  const updateItem = async (id) => {
    const newTitle = prompt('Enter new title');
    const newDesc = prompt('Enter new description');
    const newStatus = prompt('Enter status (active/pending/completed)');

    if (!newTitle || !newDesc || !newStatus) {
      alert('All fields required ❌');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/items/${id}`, {
        title: newTitle,
        description: newDesc,
        status: newStatus
      });

      alert('Updated ✅');
      getItems();
      getStats();
    } catch (err) {
      alert('Error updating ❌');
    }
  };

  // ================= LOAD =================
  useEffect(() => {
    getItems();
    getStats();
  }, []);

  // ================= UI =================
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>

      <h1 style={{ color: 'blue' }}>Dashboard</h1>

      {/* ===== STATS ===== */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div>📊 Total: {stats.total}</div>
        <div>🟢 Active: {stats.active}</div>
        <div>🟡 Pending: {stats.pending}</div>
        <div>✅ Completed: {stats.completed}</div>
      </div>

      <hr />

      {/* ===== ADD ITEM ===== */}
      <h3>Add Item</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br /><br />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /><br /><br />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="active">Active</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select><br /><br />

      <button onClick={addItem}>Add Item</button>

      <hr />

      {/* ===== ITEMS ===== */}
      <h3>Items</h3>

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            border: '1px solid gray',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px'
          }}
        >
          <b>{item.title}</b> - {item.description} ({item.status}) <br /><br />

          <button onClick={() => deleteItem(item.id)}>Delete</button>
          <button onClick={() => updateItem(item.id)}>Update</button>
        </div>
      ))}

    </div>
  );
}

export default Dashboard;