import axios from "axios";  // Importing the axios library to make HTTP requests

// Creating an axios instance with a base URL for the contacts API

const contactExp = axios.create({
    baseURL: "http://localhost:3001"
});  // Base URL for the contacts API

export default contactExp; 