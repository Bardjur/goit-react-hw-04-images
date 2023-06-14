const BASE_URL = 'https://pixabay.com/api/';
const KEY = '35699818-7bf3cd0bc40977ff0d0bc0ac5';

export default function fetchImages(query, page = 1, perPage = 12) {
  const url = new URL(BASE_URL);
  const queryParam = [
    ['key', KEY],
    ['page', page],
    ['q', query],
    ['image_type', 'photo'],
    ['orientation', 'horizontal'],
    ['per_page', perPage],
  ];

  for (let [name, value] of queryParam) {
    url.searchParams.set(name, value);
  }

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(response.json()));
  });
}
