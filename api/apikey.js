import fetch from 'node-fetch';

export const getProducts = () => {
    return fetch(
      `https://api.countdownapi.com/request?api_key=${process.env.API_KEY}&type=search&ebay_domain=ebay.com&search_term=memory+cards`
    )
      .then(res => res.json())
      .then(json => json.results);
  };

  export const getProduct = position => {
    return fetch(
      `https://api.themoviedb.org/3/movie/${position}?api_key=${process.env.TMDB_KEY}`
    ).then(res => res.json());
  };