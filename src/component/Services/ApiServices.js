import axios from "axios";

export const addProduct = async (uploadData) => {
  return await axios.post(import.meta.env.VITE_ADD_PRODUCT_URL, uploadData);
};

export const fetchData = async () => {
  try {
    let response = await fetch(import.meta.env.VITE_DATA_URL);
    if (!response.ok) {
      throw new Error("Response is not correct");
    }
    let result = await response.json();
    return result;
  } catch {
    throw new Error("We are facing some errors");
  }
};

export const updateData = async (id, formData) => {
  let responst = await axios.put(
    `${import.meta.env.VITE_UPDATE_PRODUCT_URL}${id}`,
    formData
  );
  return responst;
};
