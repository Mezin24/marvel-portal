class MarvelServices {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';
  _apiKey = 'apikey=70b306b1048a409e977894c03637b4a3';

  getResourse = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could't fetch url ${url}, status ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async () => {
    const res = await this.getResourse(
      `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
    );
    return await res.data.results.map(this._transformCharacters);
  };

  getCharacter = async (id) => {
    const res = await this.getResourse(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    return await this._transformCharacters(res.data.results[0]);
  };

  _transformCharacters = (data) => {
    return {
      name: data.name,
      description: data.description,
      thumbnail: data.thumbnail.path + '.' + data.thumbnail.extension,
      homepage: data.urls[0].url,
      wiki: data.urls[1].url,
    };
  };
}

export default MarvelServices;
