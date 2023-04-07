export default class moviesDb {
  _apiKey = '6a8d741794e1e72b05ad931b20181a3b'
  _apiBase = 'https://api.themoviedb.org/3'
  _apiImgUrl = 'https://image.tmdb.org/t/p/w500'

  async getMovies(query, page = 1) {
    const res = await fetch(
      `${this._apiBase}/search/movie?api_key=${this._apiKey}&language=en-US&page=${page}&include_adult=false&query=${query}`,
    )
    if (res.ok) {
      return await res.json()
    } else {
      throw new Error(`Could not get movies from database ${this._apiBase}` + `, received ${res.status}`)
    }
  }

  getPoster(url) {
    return url !== null ? this._apiImgUrl + url : ''
  }

  async getGenres() {
    const res = await fetch(`${this._apiBase}/genre/movie/list?api_key=${this._apiKey}&language=en-US`)
    if (res.ok) {
      return await res.json()
    } else {
      throw new Error(`Could not get genres from database ${this._apiBase}` + `, received ${res.status}`)
    }
  }
}
