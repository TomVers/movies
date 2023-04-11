import { format } from 'date-fns'
import { Image, Rate, Progress } from 'antd'

import './MovieItem.css'
import shortInfo from '../../services/shortInfo'
import moviesDb from '../../services/moviesDb'
import ratingColor from '../../services/ratingColor'
import { Consumer } from '../../context/genreContext'

function MovieItem({ title, released, overview, poster, userscore, genreId, id, guestRating }) {
  let moviesDB = new moviesDb()

  const onChangeRating = (value) => {
    let token = localStorage.getItem('guestId')
    let guestId = JSON.parse(token)
    let guestRatedMovies = JSON.parse(localStorage.getItem('rated')) || []
    let movieRating = { id, value }
    let movieIndex = guestRatedMovies.findIndex((movie) => movie.id === id)
    if (!value) {
      moviesDB.deleteMovieRating(guestId, id)
      guestRatedMovies.splice(movieIndex, 1)
    } else {
      moviesDB.postMovieRating(guestId, value, id)
      movieIndex !== -1
        ? guestRatedMovies.splice(movieIndex, 1, movieRating)
        : (guestRatedMovies = [...guestRatedMovies, movieRating])
    }
    localStorage.setItem('rated', JSON.stringify(guestRatedMovies))
  }

  return (
    <Consumer>
      {(genres) => (
        <div className='wrapper'>
          <section className='cover'>
            <Image
              src={moviesDB.getPoster(poster)}
              width={182}
              height={280}
              fallback='https://critics.io/img/movies/poster-placeholder.png'
            />
          </section>
          <section className='content'>
            <Progress
              className='userscore'
              type='circle'
              percent={userscore * 10}
              format={(percent) => (percent / 10).toFixed(1)}
              strokeColor={ratingColor(userscore)}
              size='default'
            />
            <div className='case'>
              <h1 className='case__title'>{title}</h1>
              <p className='case__date'>{released ? format(new Date(released), 'MMM dd, yyyy') : 'No release date'}</p>
              {genres.map((el) => {
                if (genreId.includes(el.id)) {
                  return (
                    <p className='case__genre' key={el.id}>
                      {el.name}
                    </p>
                  )
                }
                return null
              })}
              <div className='case__info'>{shortInfo(overview)}</div>
            </div>
            <Rate
              onChange={(value) => onChangeRating(value)}
              defaultValue={guestRating?.value || 0}
              count={10}
              allowHalf={true}
              className='stars'
            />
          </section>
        </div>
      )}
    </Consumer>
  )
}

export default MovieItem
