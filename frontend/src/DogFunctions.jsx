import axios from "axios";

const serverUrl = "http://localhost:4000/dogs";

const getDogs = async () => {
  try {
    const response = await axios.get(serverUrl);
    if (response.status !== 200) {
      throw new Error("Server error GET request");
    }
    return response.data;
  } catch (err) {
    console.error("Error!", err);
    return [];
  }
};

const getDogById = async (id) => {
  try {
    const response = await axios.get(`${serverUrl}/${id}`);
    if (response.status !== 200) {
      throw new Error("Server error GET request");
    }
    return response.data;
  } catch (err) {
    console.error("Error!", err);
    return [];
  }
};

const createDog = async (dog) => {
  try {
    const response = await axios.post(serverUrl, dog);
    if (response.status !== 201) {
      throw new Error("Server error GET request");
    }
    return response.data;
  } catch (err) {
    console.error("Error!", err);
    return null;
  }
};

const updateDog = async (id, dogData) => {
  try {
    const response = await axios.put(`${serverUrl}/${id}`, dogData);
    if (response.status !== 200) {
      throw new Error("Server error GET request");
    }
    return response.data;
  } catch (err) {
    console.error("Error!", err);
    return null;
  }
};

const deleteDog = async (id) => {
  try {
    const response = await axios.delete(`${serverUrl}/${id}`);
    if (response.status !== 200) {
      throw new Error("Server error GET request");
    }
    return response.data;
  } catch (err) {
    console.error("Error!", err);
    return null;
  }
};

export { getDogs, getDogById, createDog, deleteDog, updateDog };
