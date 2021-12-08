import axios from "axios";

export const createProduct = async (product, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API_URL}/product`, product, {
    headers: {
      authtoken,
    },
  });

  export const getProductsByCount = async (count) =>
  await axios.get(`${process.env.REACT_APP_API_URL}/products/${count}`);


  export const removeProduct = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API_URL}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });

  export const getProduct = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API_URL}/product/${slug}`);

  export const updateProduct = async (slug, product, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API_URL}/product/${slug}`, product, {
    headers: {
      authtoken,
    },
  });

