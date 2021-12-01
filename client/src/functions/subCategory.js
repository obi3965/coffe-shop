import axios from 'axios'

export const getSubs = async () =>
  await axios.get(`${process.env.REACT_APP_API_URL}/subs`);

export const getSub = async (slug) =>
  await axios.get(`${process.env.REACT_APP_API_URL}/sub/${slug}`);

export const removeSub = async (slug, authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API_URL}/sub/${slug}`, {
    headers: {
      authtoken,
    },
  });

export const updateSub= async (slug, sub, authtoken) =>
  await axios.put(`${process.env.REACT_APP_API_URL}/sub/${slug}`, sub, {
    headers: {
      authtoken,
    },
  });

export const createSub = async (sub, authtoken) =>
  await axios.post(`${process.env.REACT_APP_API_URL}/sub`, sub, {
    headers: {
      authtoken,
    },
  });