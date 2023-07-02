import axios from 'axios';

// const options = {
//   page: 1,
//   key: '24000598-4cbb5e18617bf8e66757f824b',
//   image_type: 'photo',
//   orientation: 'horizontal',
//   per_page: 12,
// };

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '24000598-4cbb5e18617bf8e66757f824b',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
    page: 1,
  },
});

export const getImages = async (q, page = 1) => {
  const { data } = await instance.get('', { params: { q, page } });
  return data.hits;
};
