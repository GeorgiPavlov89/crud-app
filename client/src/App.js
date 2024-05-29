import React, { useState, useEffect } from 'react';
import itemService from './itemService';

function App() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '' });
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const response = await itemService.getItems();
        setItems(response.data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({ ...newItem, [name]: value });
    };

    const handleCreateItem = async () => {
        await itemService.createItem(newItem);
        setNewItem({ name: '', description: '' });
        fetchItems();
    };

    const handleEditItem = (item) => {
        setEditingItem(item);
    };

    const handleUpdateItem = async () => {
        await itemService.updateItem(editingItem._id, editingItem);
        setEditingItem(null);
        fetchItems();
    };

    const handleDeleteItem = async (id) => {
        await itemService.deleteItem(id);
        fetchItems();
    };

    return (
        <div>
            <h1>CRUD App</h1>
            <div>
                <h2>Create Item</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newItem.name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newItem.description}
                    onChange={handleInputChange}
                />
                <button onClick={handleCreateItem}>Create</button>
            </div>
            <div>
                <h2>Items</h2>
                <ul>
                    {items.map((item) => (
                        <li key={item._id}>
                            {item.name}: {item.description}
                            <button onClick={() => handleEditItem(item)}>Edit</button>
                            <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
            {editingItem && (
                <div>
                    <h2>Edit Item</h2>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={editingItem.name}
                        onChange={(e) =>
                            setEditingItem({ ...editingItem, name: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={editingItem.description}
                        onChange={(e) =>
                            setEditingItem({ ...editingItem, description: e.target.value })
                        }
                    />
                    <button onClick={handleUpdateItem}>Update</button>
                </div>
            )}
        </div>
    );
}

export default App;
