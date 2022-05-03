const axios = require("axios");

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return error.response.data.message;
  }
);

const fetchMovies = async (url) => {
  return await axios.get(`${url}/movies`);
};

const fetchSingleMovie = async (url, id) => {
  return await axios.get(`${url}/movies/${id}`);
};

const addNewMovie = async (url, body) => {
  return await axios.post(`${url}/movies`, body);
};

const deleteMovie = async (url, id) => {
  const response = await axios
    .delete(`${url}/movies/${id}`)
    .then((res) => res.data.message)
    .cath((err) => err.response.data.message);
  return response;
};

module.exports = {
  fetchMovies,
  fetchSingleMovie,
  addNewMovie,
  deleteMovie,
};
