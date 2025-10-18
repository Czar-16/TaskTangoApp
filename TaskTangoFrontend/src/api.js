import axios from "axios";
// http://localhost:5000/api/tasks
const API_URL = import.meta.env.VITE_API_URL;

const getAllTasks = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

const addTask = async (title) => {
  const res = await axios.post(API_URL, { title });
  return res.data;
};

const deleteTask = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};

const updateTask = async (id, updatedData) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedData);
  return res.data;
};

export { getAllTasks, addTask, deleteTask, updateTask };
