import axios from "axios";

const API_URL = 'http://localhost:5000/api/items';

const getItems = () => axios.get(API_URL)
const getItem = (id) => axios.get(`${API_URL}/${id}`)
const createItem = (item) => axios.post(API_URL, item)
const updateItem = (id, item) => axios.put(`${API_URL}/${id}`, item)
const deleteItem = (id) => axios.delete(`${API_URL}/${id}`)


export default {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
}