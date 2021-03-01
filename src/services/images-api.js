import axios from 'axios';

const API_KEY = '19672422-ecfdf660c6c197879e9ade35c';
axios.defaults.baseURL = 'https://pixabay.com/api/';

const fetchImages = (query, page) => {
  return axios
    .get(
      `?key=${API_KEY}&q=${query}&page=${page}&per_page=12&image_type=photo&orientation=horizontal`,
    )
    .then(res => res.data);
};

export default fetchImages;
