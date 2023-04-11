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
      throw new Error(`Could not get genres from database ${this._apiBase}, received ${res.status}`)
    }
  }

  async getGuest() {
    let res = await fetch(`${this._apiBase}/authentication/guest_session/new?api_key=${this._apiKey}`)
    if (res.ok) {
      res = await res.json()
      const { guest_session_id } = res
      localStorage.setItem('guestId', `${JSON.stringify(guest_session_id)}`)
      return res
    } else {
      throw new Error(`Could not create a guest session in database ${this._apiBase}, received ${res.status}`)
    }
  }

  async getRatedMovies(guestId, page = 1) {
    let res = await fetch(
      `${this._apiBase}/guest_session/${guestId}/rated/movies?api_key=${this._apiKey}&language=en-US&sort_by=created_at.asc&page=${page}`,
    )
    if (res.ok) {
      res = await res.json()
      return res
    } else {
      throw new Error(`Could not get rated movies for this user from database ${this._apiBase}, received ${res.status}`)
    }
  }

  async postMovieRating(guestId, rating, id) {
    let res = await fetch(`${this._apiBase}/movie/${id}/rating?api_key=${this._apiKey}&guest_session_id=${guestId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        value: rating,
      }),
    })
    if (res.ok) {
      res = await res.json()
      return res
    } else {
      throw new Error(`Could not send the rating for this movies, received ${res.status}`)
    }
  }

  async deleteMovieRating(guestId, id) {
    let res = await fetch(`${this._apiBase}/movie/${id}/rating?api_key=${this._apiKey}&guest_session_id=${guestId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
    if (res.ok) {
      res = await res.json()
      return res
    } else {
      throw new Error(`Could not send the rating for this movies, received ${res.status}`)
    }
  }
}
