class MarvelServices {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=70b306b1048a409e977894c03637b4a3';

  getResourse = async () => {
    const res = await fetch(
      `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
    );
    return await res.json();
  };

  getCharacter = async (id) => {
    const res = await fetch(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return await res.json();
  };
}

export default MarvelServices;
